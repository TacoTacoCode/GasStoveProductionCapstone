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
        private readonly TokenConfigure _tokenConfigure;
        private readonly IMapper _mapper;

        public LoginController(
            AccountService accountService,
            TokenConfigure tokenConfigure,
            IMapper mapper)
        {
            _accountService = accountService;
            _tokenConfigure = tokenConfigure;
            _mapper = mapper;
        }

        // POST: login/[loginRequest]
        [HttpPost]
        [Route("login")]
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
                        "Bad Request"
                    }
                });
            }

            //Generate access token            
            return Ok(await _tokenConfigure.GenerateJWTToken(account));
        }

        // POST: refreshToken/[tokenRequest]
        //[HttpPost]
        //[Route("refreshToken")]
        //public async Task<ActionResult> RefreshToken([FromBody] TokenRequest tokenRequest)
        //{

        //    var result = await new TokenConfigure().VerifyAndGenerateToken(tokenRequest);

        //    if (result == null)
        //    {
        //        return BadRequest(new AuthResult()
        //        {
        //            Errors = new List<string>() {
        //                    "Invalid tokens"
        //                },
        //            Success = false
        //        });
        //    }

        //    return Ok(result);
        //}
    }
}
