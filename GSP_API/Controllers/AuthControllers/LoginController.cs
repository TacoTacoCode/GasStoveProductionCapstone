using AutoMapper;
using GSP_API.Extensions.Tokens;
using GSP_API.Models.Request;
using GSP_API.Models.Token;
using GSP_API.Business.Services;
using GSP_API.Domain.Repositories.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace GSP_API.Controllers.AuthControllers
{
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly AccountService _accountService;
        private readonly RoleService _roleService;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public LoginController(
            AccountService accountService,
            RoleService roleService,
            IConfiguration configuration,
            IMapper mapper)
        {
            _accountService = accountService;
            _roleService = roleService;
            _configuration = configuration;
            _mapper = mapper;
        }

        // POST: login
        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Login([FromBody] AccountRequest accountRequest)
        {
            var account = await _accountService.GetAccountById(_mapper.Map<Account>(accountRequest).AccountId);

            //Generate Token
            var generateTokens = new TokenConfigure(_configuration, _roleService);
            var signingCredentials = generateTokens.GetSigningCredential();
            var claims = generateTokens.GetClaim(account);
            var tokenOptions = generateTokens.GenerateAccessToken(signingCredentials, await claims);            
            var accessToken = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            var refreshToken = generateTokens.GenerateRefreshToken();
            TokenModel tokenModel = new TokenModel(accessToken, refreshToken);
            return Ok(tokenModel);
        }


    }
}
