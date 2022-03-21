using AutoMapper;
using GSP_API.Models.Request;
using GSP_API.Models.Response;
using GSP_API.Business.Services;
using GSP_API.Domain.Repositories.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace GSP_API.Controllers.ModelControllers
{
    [ApiController]
    public class SectionController : ControllerBase
    {
        private readonly SectionService _sectionService;
        private readonly IMapper _mapper;

        public SectionController(
             SectionService sectionService,
             IMapper mapper)
        {
            _sectionService = sectionService;
            _mapper = mapper;
        }

        // GET: getAllSections
        [HttpGet]
        [Route("getAllSections")]
        public async Task<ActionResult<List<SectionResponse>>> GetAllSections()
        {
            var data = await _sectionService.GetAllSections();
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var list = _mapper.Map<List<SectionResponse>>(data);
            return Ok(list);
        }

        // GET: getWorkerAmounts/sec/1
        [HttpGet]
        [Route("getWorkerAmounts/sec/{sectionId}")]
        public async Task<ActionResult<int>> GetWorkerAmountBySectionId(int sectionId)
        {
            var data = await _sectionService.GetWorkerAmountBySectionId(sectionId);            
            return Ok(data);
        }

        // GET: getSectionById/1
        [HttpGet]
        [Route("getSectionById/{sectionId}")]
        public async Task<ActionResult<SectionResponse>> GetSectionById(int sectionId)
        {
            var data = await _sectionService.GetSectionById(sectionId);
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var section = _mapper.Map<SectionResponse>(data);
            return Ok(section);
        }
        [HttpGet]
        [Route("getSectionBySectionLeadId/{sectionLeadId}")]
        public async Task<ActionResult<SectionResponse>> GetSectionBySectionLeadId(int sectionLeadId)
        {
            var data = await _sectionService.GetSectionBySectionLeadId(sectionLeadId);
            if (data == null)
            {
                return BadRequest("Not found");
            }
            return Ok(data);
        }

        // POST: AddSection/[section]
        [HttpPost]
        [Route("addSection")]
        public async Task<ActionResult> AddSection([FromBody] SectionRequest sectionRequest)
        {
            var data = await _sectionService.AddSection(_mapper.Map<Section>(sectionRequest));
            if (data == null)
            {
                return BadRequest("Not Found");
            }
            return Ok("Add successfully");
        }

        // PUT: UpdateSection
        [HttpPut]
        [Route("updateSection")]
        public async Task<ActionResult> UpdateSection([FromBody] SectionRequest newSection)
        {
            var data = await _sectionService.UpdateSection(_mapper.Map<Section>(newSection));
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

        // PUT: DelSection
        [HttpPut]
        [Route("delSection/{sectionId}")]
        public async Task<ActionResult> DelSection(int sectionId)
        {
            var data = await _sectionService.DelSection(sectionId);
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
