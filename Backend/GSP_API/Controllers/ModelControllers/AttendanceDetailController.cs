using AutoMapper;
using GSP_API.Models.Request;
using GSP_API.Models.Response;
using GSP_API.Business.Services;
using GSP_API.Domain.Repositories.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace GSP_API.Controllers.ModelControllers
{
    [ApiController]
    public class AttendanceDetailController : ControllerBase
    {
        private readonly AttendanceDetailService _attendanceDetailService;
        private readonly IMapper _mapper;

        public AttendanceDetailController(
            AttendanceDetailService attendanceDetailService,
            IMapper mapper)
        {
            _attendanceDetailService = attendanceDetailService;
            _mapper = mapper;
        }

        // GET: getAttendancesOf/atd/1
        [HttpGet]
        [Route("getAttendancesOf/atd/{attendanceId}")]
        public async Task<ActionResult<List<AttendanceDetailResponse>>> GetAttendanceDetailByAttendance(int attendanceId)
        {
            var data = await _attendanceDetailService.GetAttendanceDetailByAttendance(attendanceId);
            if (data == null)
            {
                return NotFound("Not found");
            }
            var list = _mapper.Map<List<AttendanceDetailResponse>>(data);
            return Ok(list); ;
        }

        // GET: getAttendanceDetail/1
        [HttpGet]
        [Route("getAttendanceDetail/{attendanceDetailId}")]
        public async Task<ActionResult<AttendanceDetailResponse>> GetAttendanceDetailById(int attendanceDetailId)
        {
            var data = await _attendanceDetailService.GetAttendanceDetailById(attendanceDetailId);
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var attendanceDetail = _mapper.Map<AttendanceDetailResponse>(data);
            return Ok(attendanceDetail);
        }

        [HttpGet]
        [Route("getAttendanceDetails/{accountId}/{date}")]
        public async Task<ActionResult<AttendanceDetailResponse>> GetAttendanceDetails(int accountId, DateTime date)
        {
            var data = await _attendanceDetailService.GetAttendanceDetail(accountId, date);
            if (data == null)
            {
                return BadRequest("ERROR!!!");
            }
            var attendanceDetail = _mapper.Map<List<AttendanceDetailResponse>>(data);
            return Ok(attendanceDetail);
        }

        // POST: AddAttendanceDetail/[attendanceDetail]
        [HttpPost]
        [Route("addAttendanceDetail")]
        public async Task<ActionResult> AddAttendanceDetail([FromBody] AttendanceDetailRequest attendanceDetailRequest)
        {
            var data = await _attendanceDetailService.AddAttendanceDetail(_mapper.Map<AttendanceDetail>(attendanceDetailRequest));
            if (data == null)
            {
                return BadRequest("Not Found");
            }
            return Ok("Add successfully");
        }

        // PUT: UpdateAttendanceDetail/[attendanceDetail]
        [HttpPut]
        [Route("updateAttendanceDetail")]
        public async Task<ActionResult<AttendanceDetailResponse>> UpdateAttendanceDetail([FromBody] AttendanceDetailRequest attendanceDetailRequest)
        {
            var data = await _attendanceDetailService.UpdateAttendanceDetail(_mapper.Map<AttendanceDetail>(attendanceDetailRequest));
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

        // PUT: DelAttendanceDetail/1
        [HttpPut]
        [Route("delAttendanceDetail/{attendanceDetailId}")]
        public async Task<ActionResult> DelAttendanceDetail(int attendanceDetailId)
        {
            var data = await _attendanceDetailService.DelAttendanceDetail(attendanceDetailId);
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
