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

        // GET: getProcess/[status] executing/done
        [HttpGet]
        [Route("getProcesses/{status}")]
        public async Task<ActionResult<ProcessResponse>> GetProcessByStatus(string status)
        {
            var data = await _processService.GetProcessesByStatus(status);
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var process = _mapper.Map<ProcessResponse>(data);
            return Ok(process);
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

        // PUT: UpdateProcess/[process]
        [HttpPut]
        [Route("updateProcess")]
        public async Task<ActionResult> UpdateProcess([FromBody] ProcessRequest newProcess)
        {
            var data = await _processService.UpdateProcess(_mapper.Map<Process>(newProcess));
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

        // PUT: DelProcess/1
        [HttpPut]
        [Route("delProcess/{processId}")]
        public async Task<ActionResult> DelProcess(int processId)
        {
            var data = await _processService.DelProcess(processId);
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

        [HttpPost]
        [Route("createProcess")]
        public async Task<ActionResult> CreateProcess([FromBody] OrderDetailRequest orderDetailRequest)
        {
            var process = await _processService.CreateProcess(_mapper.Map<OrderDetail>(orderDetailRequest));
            if (process == null)
            {
                return BadRequest("System error");
            }
            return Ok(process);
        }

        [HttpPost]
        [Route("distribute")]
        public async Task<ActionResult> DistributeProcess([FromBody] DistributeProcessRequest distributeProcessRequest)
        {
            var procesList = await _processService.DistributeProcess(distributeProcessRequest.Process, distributeProcessRequest.ProcessAmmounts);
            if (procesList.Count() == 0)
            {
                return BadRequest("System error");
            }
            return Ok(procesList);
        }

        [HttpPost]
        [Route("addProcessList")]
        public async Task<ActionResult> AddListProcess([FromBody] List<ProcessRequest> processRequests)
        {
            var data = await _processService.AddProcessList(_mapper.Map<List<Process>>(processRequests));
            if (data.Contains("error"))
            {
                return BadRequest("System errors");
            }
            if(data != "true")
            {
                return BadRequest(data);
            }
            return Ok("Add successfully");
        }

    }
}
