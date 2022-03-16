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
        [Route("login2")]
        public async Task<ActionResult> Login2([FromBody] LoginRequest loginRequest)
        {
            var account = await _accountService.GetAccountByEmail(loginRequest.Email);
            if (account == null)
            {
                return BadRequest("Invalid account");
            }

            var isCorrect = account.Password == GSP_API.Business.Extensions.Hash.ComputeSha256Hash(loginRequest.Password);
            if (!isCorrect)
            {
                return BadRequest("Wrong Pass");
            }

            //Generate access token
            //var generateTokens = new TokenConfigure(_configuration, _roleService);            
            //var tokenOptions = generateTokens.GenerateAccessToken(account);
            //var accessToken = new JwtSecurityTokenHandler().WriteToken(tokenOptions.Result);

            return Ok(/*accessToken*/);
        }
        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Login([FromBody] AccountRequest accountRequest)
        {
            //Check if all the validations specified inside Model class using Data annotations have been passed.
            //if (!ModelState.IsValid)
            //{

            //}
            var account = await _accountService.GetAccountById(_mapper.Map<Account>(accountRequest).AccountId);
            if (account == null)
            {
                return BadRequest("Invalid account");
            }

            var isCorrect = account.Password == GSP_API.Business.Extensions.Hash.ComputeSha256Hash(accountRequest.Password);
            if (!isCorrect)
            {
                return BadRequest("Wrong Pass");
            }

            //Generate access token
            //var generateTokens = new TokenConfigure(_configuration, _roleService);            
            //var tokenOptions = generateTokens.GenerateAccessToken(account);
            //var accessToken = new JwtSecurityTokenHandler().WriteToken(tokenOptions.Result);

            return Ok(/*accessToken*/);
        }
    }
}
