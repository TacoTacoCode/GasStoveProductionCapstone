using GSP_API.Domain.Repositories.Models;
using GSP_API.Business.Services;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using GSP_API.Models.Response;
using System.Collections.Generic;
using GSP_API.Models.Request;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace GSP_API.Controllers.ModelControllers
{
    [ApiController]
    public class AccountController : ControllerBase
    {

        private readonly AccountService _accountService;
        private readonly IMapper _mapper;

        public AccountController(
            AccountService accountService,
            IMapper mapper)
        {
            _accountService = accountService;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getActiveAccounts")]
        public async Task<ActionResult<List<AccountResponse>>> GetActiveAccounts()
        {
            var data = await _accountService.GetActiveAccount();
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var list = _mapper.Map<List<AccountResponse>>(data);
            return Ok(list);
        }

        // GET: getAllAccounts
        [HttpGet]
        [Route("getAllAccounts")]
        public async Task<ActionResult<List<AccountResponse>>> GetAllAccounts()
        {
            var data = await _accountService.GetAllAccounts();
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var list = _mapper.Map<List<AccountResponse>>(data);
            return Ok(list);
        }

        // GET: GetAccount/1
        [HttpGet]
        [Route("getAccountById/{accountId}")]
        public async Task<ActionResult<AccountResponse>> GetAccountById(int accountId)
        {
            var data = await _accountService.GetAccountById(accountId);
            if (data == null)
            {
                return BadRequest("Not Found");
            }
            var account = _mapper.Map<AccountResponse>(data);
            return Ok(account);
        }

        // GET: GetAccount/xxx@gmail.com
        [HttpGet]
        [Route("getAccountByEmail/{email}")]
        public async Task<ActionResult<AccountResponse>> GetAccountByEmail(string email)
        {
            var data = await _accountService.GetAccountByEmail(email);
            if (data == null)
            {
                return BadRequest("Not Found");
            }
            var account = _mapper.Map<AccountResponse>(data);
            return Ok(account);
        }

        // POST: AddAccount/[account]
        [HttpPost]
        [Route("addAccount")]
        public async Task<ActionResult> AddAccount([FromForm] AccountRequest newAccount, IFormFile file)
        {
            Stream fileStream = null;
            var fileName = "no-face.png?alt=media&token=83eda3a8-5787-4f09-af2b-473462ada9e6";
            if (file != null)
            {   
                fileStream = file.OpenReadStream();
                fileName = file.FileName;
            }

            var data = await _accountService.AddAccount(_mapper.Map<Account>(newAccount), fileStream, fileName);
            fileStream.Dispose();
            if (data.Contains("error"))
            {
                return StatusCode(500, data);
            }
            return Ok("Add successfully");
        }

        // PUT: UpdateAccount/[account]
        [HttpPut]
        [Route("updateAccount")]
        public async Task<ActionResult> UpdateAccount([FromBody] AccountRequest accountRequest)
        {
            var data = await _accountService.UpdateAccount(_mapper.Map<Account>(accountRequest));
            if (data == null)
            {
                return BadRequest("Not found");
            }
            else if (data.Equals("true"))
            {
                return Ok("Update Successfully");
            }
            return BadRequest(data);
        }

        // PUT: DelAccount/1
        [HttpPut]
        [Route("delAccount/{accountId}")]
        public async Task<ActionResult> DelAccount(int accountId)
        {
            var data = await _accountService.DelAccount(accountId);
            if (data == null)
            {
                return BadRequest("Not found");
            }
            else if (data.Equals("true"))
            {
                return Ok("Delete Successfully");
            }
            return BadRequest(data);
        }
    }
}
