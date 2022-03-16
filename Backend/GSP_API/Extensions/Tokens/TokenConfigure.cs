using GSP_API.Business.Services;
using GSP_API.Domain.Repositories.Models;
using GSP_API.Models.Token;
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
    public class TokenConfigure
    {
        private readonly IConfiguration _configuration;
        private readonly RoleService _roleService;
        private readonly TokenValidationParameters _tokenValidationParams;

        public TokenConfigure(
            IConfiguration configuration,
            RoleService roleService,
            TokenValidationParameters tokenValidationParams)
        {
            _configuration = configuration;
            _roleService = roleService;
            _tokenValidationParams = tokenValidationParams;
        }

        public async Task<JwtSecurityToken> GenerateAccessToken(Account account)
        {
            var tokenOptions = new JwtSecurityToken(
                issuer: _configuration.GetSection("validIssuer").Value,
                audience: _configuration.GetSection("validAudience").Value,
                claims: await GetClaim(account),
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(_configuration.GetSection("expiryInMinutes2").Value)),
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
            claims.Add(new Claim(ClaimTypes.Role, role.Name));
            claims.Add(new Claim("id", account.AccountId.ToString()));
            return claims;
        }        

        private async Task<AuthResult> VerifyAndGenerateToken(TokenRequest tokenRequest)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            try
            {
                // Validation 1 - Validation JWT token format
                var tokenInVerification = jwtTokenHandler.ValidateToken(tokenRequest.AccessToken, _tokenValidationParams, out var validatedToken);

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
                //var storedToken = await _apiDbContext.RefreshTokens.FirstOrDefaultAsync(x => x.Token == tokenRequest.RefreshToken);

                //if (storedToken == null)
                //{
                //    return new AuthResult()
                //    {
                //        Success = false,
                //        Errors = new List<string>() {
                //            "Token does not exist"
                //        }
                //    };
                //}

                //// Validation 5 - validate if used
                //if (storedToken.IsUsed)
                //{
                //    return new AuthResult()
                //    {
                //        Success = false,
                //        Errors = new List<string>() {
                //            "Token has been used"
                //        }
                //    };
                //}

                //// Validation 6 - validate if revoked
                //if (storedToken.IsRevorked)
                //{
                //    return new AuthResult()
                //    {
                //        Success = false,
                //        Errors = new List<string>() {
                //            "Token has been revoked"
                //        }
                //    };
                //}

                //// Validation 7 - validate the id
                //var jti = tokenInVerification.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value;

                //if (storedToken.JwtId != jti)
                //{
                //    return new AuthResult()
                //    {
                //        Success = false,
                //        Errors = new List<string>() {
                //            "Token doesn't match"
                //        }
                //    };
                //}

                //// Validation 8 - validate refresh token expiry date
                //if (storedToken.ExpiryDate < DateTime.UtcNow)
                //{
                //    return new AuthResult()
                //    {
                //        Success = false,
                //        Errors = new List<string>() {
                //            "Refresh token has expired"
                //        }
                //    };
                //}

                //// update current token 

                //storedToken.IsUsed = true;
                //_apiDbContext.RefreshTokens.Update(storedToken);
                //await _apiDbContext.SaveChangesAsync();

                //// Generate a new token
                //var dbUser = await _userManager.FindByIdAsync(storedToken.UserId);
                //return await GenerateJwtToken(dbUser);
            }
            catch (Exception ex)
            {

            }
            

            return null;
        }

        private DateTime UnixTimeStampToDateTime(long unixTimeStamp)
        {
            var dateTimeVal = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            dateTimeVal = dateTimeVal.AddSeconds(unixTimeStamp).ToUniversalTime();

            return dateTimeVal;
        }
    }
}
