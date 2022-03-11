﻿using AutoMapper;
using GSP_API.Models.Request;
using GSP_API.Models.Response;
using GSP_API.Business.Services;
using GSP_API.Domain.Repositories.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Net.Http;
using System.Text;

namespace GSP_API.Controllers.ModelControllers
{
    [ApiController]
    public class ImportExportController : ControllerBase
    {
        private readonly ImportExportService _importExportService;        
        private readonly IMapper _mapper;

        public ImportExportController(
            ImportExportService importExportService,            
            IMapper mapper)
        {
            _importExportService = importExportService;            
            _mapper = mapper;
        }

        // GET: getImExsOf/sec/1
        [HttpGet]
        [Route("getImExsOf/sec/{sectionId}")]
        public async Task<ActionResult<List<ImportExportResponse>>> GetImExBySection(int sectionId)
        {
            var data = await _importExportService.GetImExBySection(sectionId);
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var list = _mapper.Map<List<ImportExportResponse>>(data);
            return Ok(list);
        }

        // GET: getImEx/1
        [HttpGet]
        [Route("getImEx/{imExId}")]
        public async Task<ActionResult<ImportExportResponse>> GetImExById(int imExId)
        {
            var data = await _importExportService.GetImExtById(imExId);
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var imEx = _mapper.Map<ImportExportResponse>(data);
            return Ok(imEx);
        }

        // POST: AddImEx/[imEx]
        [HttpPost]
        [Route("addImEx")]
        public async Task<ActionResult> AddImEx([FromBody] ImportExportRequest importExportRequest)
        {
            var data = _mapper.Map<ImportExport>(importExportRequest);
            var resultAdd = await _importExportService.AddImEx(data);
            switch (resultAdd)
            {
                case "true":
                    return Ok("Add successfully");                    
                default:
                    return BadRequest(resultAdd);
            }
        }

        // PUT: UpdateImEx
        [HttpPut]
        [Route("updateImEx")]
        public async Task<ActionResult> UpdateImEx([FromBody] ImportExportRequest importExportRequest)
        {
            var data = _mapper.Map<ImportExport>(importExportRequest);
            var result = await _importExportService.UpdateImEx(data);
            switch (result)
            {
                case null:
                    return BadRequest("Not Found ImEx");
                case "Update successfully":
                    return Ok(result);
                default:
                    return BadRequest(result);
            }
        }

        // PUT: DelImEx/1
        [HttpPut]
        [Route("delImEx/{imExId}")]
        public async Task<ActionResult> DelImEx(int imExId)
        {
            var data = await _importExportService.DelImEx(imExId);
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

        //private bool AttendanceExists(string id)
        //{
        //    return _context.Attendance.Any(e => e.AttendanceId == id);
        //}
    }
}
