using AutoMapper;
using DatabaseApproach.Models.Request;
using DatabaseApproach.Models.Response;
using DBApproach.Business.Services;
using DBApproach.Domain.Repositories.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace DatabaseApproach.Controllers.ModelControllers
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

        // GET: getWorkerAmounts/sec/1
        [HttpGet]
        [Route("getWorkerAmounts/sec/{accountId}")]
        public ActionResult<int> GetWorkerAmountBySectionId(string accountId)
        {
            var data = _sectionService.GetWorkerAmountBySectionId(accountId);            
            return Ok(data);
        }

        // GET: getSectionById/1
        [HttpGet]
        [Route("getSectionById/{accountId}")]
        public ActionResult<SectionResponse> GetSectionById(string accountId)
        {
            var data = _sectionService.GetSectionById(accountId);
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var section = _mapper.Map<SectionResponse>(data);
            return Ok(section);
        }

        // PUT: UpdateSection/1
        [HttpPut]
        [Route("updateSection/{accountId}")]
        public ActionResult<SectionResponse> UpdateSection(string accountId, [FromBody] SectionRequest newSection)
        {
            var data = _sectionService.UpdateSection(accountId, _mapper.Map<Section>(newSection));
            if (data == null)
            {
                return BadRequest("Update failed");
            }
            var section = _mapper.Map<SectionResponse>(data);
            return Ok(section);
        }


        //private bool AccountExists(string id)
        //{
        //    return _context.Account.Any(e => e.AccountId == id);
        //}
    }
}
