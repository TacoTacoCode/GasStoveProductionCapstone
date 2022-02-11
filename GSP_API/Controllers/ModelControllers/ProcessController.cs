using AutoMapper;
using GSP_API.Models.Request;
using GSP_API.Models.Response;
using GSP_API.Business.Services;
using GSP_API.Domain.Repositories.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSP_API.Controllers.ModelControllers
{
    [ApiController]
    public class ProcessController : ControllerBase
    {
        private readonly ProcessService _processService;
        private readonly IMapper _mapper;

        public ProcessController(
             ProcessService processService,
             IMapper mapper)
        {
            _processService = processService;
            _mapper = mapper;
        }

        // GET: getAllProcesss
        [HttpGet]
        [Route("getAllProcesss")]
        public async Task<ActionResult<List<ProcessResponse>>> GetAllProcesss()
        {
            var data = await _processService.GetAllProcesses();
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var list = _mapper.Map<List<ProcessResponse>>(data);
            return Ok(list);
        }

        // GET: getProcess/1
        [HttpGet]
        [Route("getProcess/{processId}")]
        public async Task<ActionResult<ProcessResponse>> GetProcessById(int processId)
        {
            var data = await _processService.GetProcessById(processId);
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var process = _mapper.Map<ProcessResponse>(data);
            return Ok(process);
        }

        // POST: AddProcess/[process]
        [HttpPost]
        [Route("addProcess")]
        public async Task<ActionResult> AddProcess([FromBody] ProcessRequest processRequest)
        {
            var data = await _processService.AddProcess(_mapper.Map<Process>(processRequest));
            if (data == null)
            {
                return BadRequest("Not Found");
            }
            return Ok("Add successfully");
        }

        // PUT: UpdateProcess/1
        [HttpPut]
        [Route("updateProcess/{processId}")]
        public async Task<ActionResult> UpdateProcess(int processId, [FromBody] ProcessRequest newProcess)
        {
            var data = await _processService.UpdateProcess(processId, _mapper.Map<Process>(newProcess));
            if (data.Equals(null))
            {
                return BadRequest("Not found");
            }
            else if (data.Equals("true"))
            {
                return Ok("Update Successfully");
            }
            return BadRequest(data);
        }

        // PUT: DelProcess/1
        [HttpPut]
        [Route("delProcess/{processId}")]
        public async Task<ActionResult> DelProcess(int processId)
        {
            var data = await _processService.DelProcess(processId);
            if (data.Equals(null))
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
