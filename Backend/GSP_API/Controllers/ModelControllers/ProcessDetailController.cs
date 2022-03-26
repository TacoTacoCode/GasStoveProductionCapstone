using AutoMapper;
using GSP_API.Business.Services;
using GSP_API.Domain.Repositories.Models;
using GSP_API.Models.Request;
using GSP_API.Models.Response;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSP_API.Controllers.ModelControllers
{
    [ApiController]
    public class ProcessDetailController : ControllerBase
    {
        private readonly ProcessDetailService _processDetailService;
        private readonly IMapper _mapper;

        public ProcessDetailController(
             ProcessDetailService processDetailService,
             IMapper mapper)
        {
            _processDetailService = processDetailService;
            _mapper = mapper;
        }

        // GET: getAllProcessDetails
        [HttpGet]
        [Route("getAllProcessDetails")]
        public async Task<ActionResult<List<ProcessDetailResponse>>> GetAllProcessDetails()
        {
            var data = await _processDetailService.GetAllProcessDetailes();
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var list = _mapper.Map<List<ProcessDetailResponse>>(data);
            return Ok(list);
        }

        // GET: getProcessDetail/1
        [HttpGet]
        [Route("getProcessDetail/{processDetailId}")]
        public async Task<ActionResult<ProcessDetailResponse>> GetProcessDetailById(int processDetailId)
        {
            var data = await _processDetailService.GetProcessDetailById(processDetailId);
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var processDetail = _mapper.Map<ProcessDetailResponse>(data);
            return Ok(processDetail);
        }

        // GET: getListProcessDetail/1
        [HttpGet]
        [Route("getListProcessDetail/{sectionId}")]
        public async Task<ActionResult<List<ProcessDetailResponse>>> GetProcessDetailBySectionId(int sectionId)
        {
            var data = await _processDetailService.GetProcessDetailBySectionId(sectionId);
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var processDetails = _mapper.Map<List<ProcessDetailResponse>>(data);
            return Ok(processDetails);
        }

        // POST: AddProcessDetail/[processDetail]
        [HttpPost]
        [Route("addProcessDetail")]
        public async Task<ActionResult> AddProcessDetail([FromBody] ProcessDetailRequest processDetailRequest)
        {
            var data = await _processDetailService.AddProcessDetail(_mapper.Map<ProcessDetail>(processDetailRequest));
            if (data == null)
            {
                return BadRequest("Not Found");
            }
            return Ok("Add successfully");
        }

        // PUT: UpdateProcessDetail/[processDetail]
        [HttpPut]
        [Route("updateProcessDetail")]
        public async Task<ActionResult> UpdateProcessDetail([FromBody] ProcessDetailRequest newProcessDetail)
        {
            var data = await _processDetailService.UpdateProcessDetail(_mapper.Map<ProcessDetail>(newProcessDetail));
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

        // PUT: DelProcessDetail/1
        [HttpPut]
        [Route("delProcessDetail/{processDetailId}")]
        public async Task<ActionResult> DelProcessDetail(int processDetailId)
        {
            var data = await _processDetailService.DelProcessDetail(processDetailId);
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
