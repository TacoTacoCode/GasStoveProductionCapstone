using GSP_API.Business.Services;
using GSP_API.Domain.Repositories.Models;
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

        public TokenConfigure(
            IConfiguration configuration,
            RoleService roleService)
        {
            _configuration = configuration;
            _roleService = roleService;
        }

        public JwtSecurityToken GenerateAccessToken(SigningCredentials signingCredentials, List<Claim> claims)
        {
            var tokenOptions = new JwtSecurityToken(
                issuer: _configuration.GetSection("validIssuer").Value,
                audience: _configuration.GetSection("validAudience").Value,
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(_configuration.GetSection("expiryInMinutes").Value)),
                signingCredentials: signingCredentials);
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

        public string GenerateRefreshToken()
        {
            var random = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(random);
                return Convert.ToBase64String(random);
            }
        }
    }
}
