using GSP_API.Business.Services;
using GSP_API.Domain.Repositories;
using GSP_API.Domain.Repositories.Models;
using GSP_API.Models.Request;
using GSP_API.Models.Response;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace GSP_API.Extensions.Tokens
{
    public class TokenService
    {
        private readonly IConfiguration _configuration;
        private readonly RoleService _roleService;       
        private readonly RefreshTokenService _refreshTokenService;
        private readonly AccountService _accountService;

        public TokenService(
            IConfiguration configuration,
            RoleService roleService,            
            RefreshTokenService refreshTokenService,
            AccountService accountService)
        {
            _configuration = configuration;
            _roleService = roleService;            
            _refreshTokenService = refreshTokenService;
            _accountService = accountService;
        }

        public async Task<JwtSecurityToken> GenerateAccessToken(Account account)
        {
            var tokenOptions = new JwtSecurityToken(
                issuer: _configuration.GetSection("validIssuer").Value,
                audience: _configuration.GetSection("validAudience").Value,
                claims: await GetClaim(account),
                expires: DateTime.Now.AddMinutes(3),
                signingCredentials: GetSigningCredential());
            return tokenOptions;
        }

        public SigningCredentials GetSigningCredential()
        {
            var key = Encoding.UTF8.GetBytes(_configuration.GetSection("JWTSettings:securityKey").Value);
            var secret = new SymmetricSecurityKey(key);
            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        public async Task<List<Claim>> GetClaim(Account account)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, account.Email)
            };

            var role = await _roleService.GetRoleByAccount(account);
            claims.Add(new Claim("role", role.Name));
            claims.Add(new Claim("id", account.AccountId.ToString()));
            return claims;
        }

        public RefreshToken GenerateRefreshToken(Account account)
        {
            var refreshToken = new RefreshToken()
            {
                IsUsed = false,
                IsRevorked = false,
                AccountId = account.AccountId,
                CreatedDate = DateTime.UtcNow,
                ExpiryDate = DateTime.UtcNow.AddMonths(6),
                Token = RandomString(35) + Guid.NewGuid()
            };
            return refreshToken;
        }

        public async Task<AuthResult> GenerateJWTToken(Account account)
        {
            try
            {
                return new AuthResult()
                {
                    Token = new JwtSecurityTokenHandler().WriteToken(await GenerateAccessToken(account)),
                    Success = true,
                    RefreshToken = GenerateRefreshToken(account).Token
                };
            }
            catch (Exception ex)
            {
                return new AuthResult()
                {
                    Success = false,
                    Errors = new List<string>()
                    {
                        ex.Message.ToString()
                    }
                };
            }
        }

        public async Task<AuthResult> VerifyAndGenerateToken(TokenRequest tokenRequest)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            try
            {
                // Validation 1 - Validation JWT token format
                var tokenInVerification = jwtTokenHandler.ValidateToken(tokenRequest.AccessToken, new TokenValidationParameters(), out var validatedToken);

                // Validation 2 - Validate encryption alg
                if (validatedToken is JwtSecurityToken jwtSecurityToken)
                {
                    var result = jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase);

                    if (result == false)
                    {
                        return null;
                    }
                }

                // Validation 3 - validate expiry date
                var utcExpiryDate = long.Parse(tokenInVerification.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Exp).Value);

                var expiryDate = UnixTimeStampToDateTime(utcExpiryDate);

                if (expiryDate > DateTime.UtcNow)
                {
                    return new AuthResult()
                    {
                        Success = false,
                        Errors = new List<string>() {
                            "Token has not yet expired"
                        }
                    };
                }

                // validation 4 - validate existence of the refresh token
                var storedToken = await _refreshTokenService.GetRefreshTokenByToken(tokenRequest.RefreshToken);

                if (storedToken == null)
                {
                    return new AuthResult()
                    {
                        Success = false,
                        Errors = new List<string>() {
                            "Token does not exist"
                        }
                    };
                }

                // Validation 5 - validate if used
                if ((bool)storedToken.IsUsed)
                {
                    return new AuthResult()
                    {
                        Success = false,
                        Errors = new List<string>() {
                            "Token has been used"
                        }
                    };
                }

                // Validation 6 - validate if revoked
                if ((bool)storedToken.IsRevorked)
                {
                    return new AuthResult()
                    {
                        Success = false,
                        Errors = new List<string>() {
                            "Token has been revoked"
                        }
                    };
                }

                // Validation 7 - validate the id
                var jti = tokenInVerification.Claims.FirstOrDefault(x => x.Type == "id").Value;

                if (storedToken.AccountId != int.Parse(jti))
                {
                    return new AuthResult()
                    {
                        Success = false,
                        Errors = new List<string>() {
                            "Token doesn't match"
                        }
                    };
                }

                // Validation 8 - validate refresh token expiry date
                if (storedToken.ExpiryDate < DateTime.UtcNow)
                {
                    return new AuthResult()
                    {
                        Success = false,
                        Errors = new List<string>() {
                            "Refresh token has expired"
                        }
                    };
                }

                // update current token 

                storedToken.IsUsed = true;
                await _refreshTokenService.UpdateRefreshToken(storedToken);

                // Generate a new token
                var account = await _accountService.GetAccountById((int)storedToken.AccountId);
                return new AuthResult()
                {
                    Token = new JwtSecurityTokenHandler().WriteToken(await GenerateAccessToken(account)),
                    Success = true,
                    RefreshToken = GenerateRefreshToken(account).Token
                };
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Lifetime validation failed. The token is expired."))
                {

                    return new AuthResult()
                    {
                        Success = false,
                        Errors = new List<string>() {
                            "Token has expired please re-login"
                        }
                    };

                }
                else
                {
                    return new AuthResult()
                    {
                        Success = false,
                        Errors = new List<string>() {
                            "Something went wrong."
                        }
                    };
                }
            }
        }

        private DateTime UnixTimeStampToDateTime(long unixTimeStamp)
        {
            var dateTimeVal = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            dateTimeVal = dateTimeVal.AddSeconds(unixTimeStamp).ToUniversalTime();

            return dateTimeVal;
        }

        private string RandomString(int length)
        {
            var random = new Random();
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(x => x[random.Next(x.Length)]).ToArray());
        }
    }
}
