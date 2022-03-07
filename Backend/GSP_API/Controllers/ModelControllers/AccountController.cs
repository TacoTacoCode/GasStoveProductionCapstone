using GSP_API.Domain.Repositories.Models;
using GSP_API.Business.Services;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using AutoMapper;
using GSP_API.Models.Response;
using System.Collections.Generic;
using GSP_API.Models.Request;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Http;

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
        public async Task<ActionResult> AddAccount([FromBody] AccountRequest newAccount)
        {
            var data = await _accountService.AddAccount(_mapper.Map<Account>(newAccount));
            if (data == null)
            {
                return BadRequest("Not Found");
            }            
            return Ok("Add successfully");
        }

        // PUT: UpdateAccount
        [HttpPut]
        [Route("updateAccount")]
        public async Task<ActionResult> UpdateAccount([FromBody]AccountRequest accountRequest)
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

        // PUT: DelAccount
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

        //private bool AccountExists(string id)
        //{
        //    return _context.Account.Any(e => e.AccountId == id);
        //}


    }
}
