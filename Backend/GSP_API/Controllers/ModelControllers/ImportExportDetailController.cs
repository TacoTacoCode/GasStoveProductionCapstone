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
    public class ImportExportDetailController : ControllerBase
    {
        private readonly ImportExportDetailService _importExportDetailService;
        private readonly IMapper _mapper;

        public ImportExportDetailController(
            ImportExportDetailService importExportDetailService,
            IMapper mapper)
        {
            _importExportDetailService = importExportDetailService;
            _mapper = mapper;
        }

        // GET: getDetailsOf/ImEx/1
        [HttpGet]
        [Route("getDetailsOf/ImEx/{imExId}")]
        public async Task<ActionResult<List<ImportExportDetailResponse>>> GetImExDetailByImEx(int imExId)
        {
            var data = await _importExportDetailService.GetImExDetailByImEx(imExId);
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var list = _mapper.Map<List<ImportExportDetailResponse>>(data);
            return Ok(list); ;
        }

        // GET: getImportExportDetail/1
        [HttpGet]
        [Route("getImportExportDetail/{imExDetailId}")]
        public async Task<ActionResult<ImportExportDetailResponse>> GetImportExportDetailById(int imExDetailId)
        {
            var data = await _importExportDetailService.GetImExDetailById(imExDetailId);
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var imExDetail = _mapper.Map<ImportExportDetailResponse>(data);
            return Ok(imExDetail);
        }

        // POST: provideItem/[imExDetail]
        [HttpPost]
        [Route("provideItem")]
        public async Task<ActionResult> ProvideItem([FromBody] ImportExportDetailRequest importExportDetailRequest)
        {
            var imExDetail = _mapper.Map<ImportExportDetail>(importExportDetailRequest);
            var data = await _importExportDetailService.ProvideItem(imExDetail, importExportDetailRequest.ItemType);
            if (data.Contains("error"))
            {
                return BadRequest(data);
            }
            if (data.Contains("Not enough"))
            {
                return Ok(data);
            }
            if (data.Contains("exceed"))
            {
                return Ok(data);
            }
            return Ok(data);
        }

        [HttpPost]
        [Route("addImExDetail")]
        public async Task<ActionResult> AddImExDetail([FromBody] ImportExportDetailRequest importExportDetailRequest)
        {
            var data = await _importExportDetailService.AddImExDetail(_mapper.Map<ImportExportDetail>(importExportDetailRequest));
            if (data == null)
            {
                return BadRequest("Not Found");
            }
            return Ok("Add successfully");
        }


        // PUT: UpdateImportExportDetail/[imExDetail]
        [HttpPut]
        [Route("updateImportExportDetail")]
        public async Task<ActionResult> UpdateImportExportDetail([FromBody] ImportExportDetailRequest importExportDetailRequest)
        {
            var data = await _importExportDetailService.UpdateImExDetail(_mapper.Map<ImportExportDetail>(importExportDetailRequest));
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

        // PUT: DelImportExportDetail/1
        [HttpPut]
        [Route("delImportExportDetail/{imExDetailId}")]
        public async Task<ActionResult> DelImportExportDetail(int imExDetailId)
        {
            var data = await _importExportDetailService.DelImExDetail(imExDetailId);
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
