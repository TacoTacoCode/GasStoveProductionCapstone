using AutoMapper;
using GSP_API.Business.Services;
using GSP_API.Domain.Repositories.Models;
using GSP_API.Extensions.Tokens;
using GSP_API.Models.Request;
using GSP_API.Models.Response;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GSP_API.Controllers.AuthControllers
{
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly AccountService _accountService;
        private readonly TokenService _tokenService;        

        public LoginController(
            AccountService accountService,
            TokenService tokenService)
        {
            _accountService = accountService;
            _tokenService = tokenService;           
        }

        // POST: login/[loginRequest]
        [HttpPost]
        [Route("account/login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            //Check if all the validations specified inside Model class using Data annotations have been passed.

            var account = await _accountService.GetAccountByPhone(loginRequest.Phone);
            if (account == null)
            {
                return BadRequest(new AuthResult()
                {
                    Errors = new List<string>()
                    {
                        "Wrong phone"
                    }
                });
            }

            var isCorrect = account.Password == GSP_API.Business.Extensions.Hash.ComputeSha256Hash(loginRequest.Password);
            if (!isCorrect)
            {
                return BadRequest(new AuthResult()
                {
                    Errors = new List<string>()
                    {
                        "Wrong Pass"
                    }
                });
            }

            //Generate access token & refresh token            
            return Ok(await _tokenService.GenerateJWTToken(account));
        }

        //POST: refreshToken/[tokenRequest]
        [HttpPost]
        [Route("account/refreshToken")]
        public async Task<ActionResult> RefreshToken([FromBody] TokenRequest tokenRequest)
        {

            var result = await _tokenService.VerifyAndGenerateToken(tokenRequest);

            if (result == null)
            {
                return BadRequest(new AuthResult()
                {
                    Errors = new List<string>() {
                            "Invalid tokens"
                        },
                    Success = false
                });
            }

            return Ok(result);
        }


    }
}
