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
    public class AttendanceController : ControllerBase
    {
        private readonly AttendanceService _attendanceService;
        private readonly IMapper _mapper;

        public AttendanceController(
            AttendanceService attendanceService,
            IMapper mapper)
        {
            _attendanceService = attendanceService;
            _mapper = mapper;
        }        

        // GET: GetAttendance/1
        [HttpGet]
        [Route("getAttendance/{attendanceId}")]
        public async Task<ActionResult<AttendanceResponse>> GetAttendanceById(int attendanceId)
        {
            var data = await _attendanceService.GetAttendanceById(attendanceId);
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var attendance = _mapper.Map<AttendanceResponse>(data);
            return Ok(attendance);
        }

        // POST: AddAttendance/[attendance]
        [HttpPost]
        [Route("addAttendance")]
        public async Task<ActionResult> AddAttendance([FromBody] AttendanceRequest attendanceRequest)
        {
            var data = await _attendanceService.AddAttendance(_mapper.Map<Attendance>(attendanceRequest));
            if (data == null)
            {
                return BadRequest("Not Found");
            }
            return Ok("Add successfully");
        }

        // PUT: UpdateAttendance/1
        [HttpPut]
        [Route("updateAttendance/{attendanceId}")]
        public async Task<ActionResult> UpdateAttendance(int attendanceId, [FromBody] AttendanceRequest attendanceRequest)
        {
            var data = await _attendanceService.UpdateAttendance(attendanceId, _mapper.Map<Attendance>(attendanceRequest));
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


        // PUT: DelAttendance/1
        [HttpPut]
        [Route("delAttendance/{attendanceId}")]
        public async Task<ActionResult> DelAttendance(int attendanceId)
        {
            var data = await _attendanceService.DelAttendance(attendanceId);
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

        //private bool AttendanceExists(string id)
        //{
        //    return _context.Attendance.Any(e => e.AttendanceId == id);
        //}
    }
}
