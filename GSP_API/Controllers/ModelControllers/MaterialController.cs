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
    public class MaterialController : ControllerBase
    {
        private readonly MaterialService _materialService;
        private readonly IMapper _mapper;

        public MaterialController(
             MaterialService materialService,
             IMapper mapper)
        {
            _materialService = materialService;
            _mapper = mapper;
        }

        // GET: getAllMaterials
        [HttpGet]
        [Route("getAllMaterials")]
        public async Task<ActionResult<List<MaterialResponse>>> GetAllMaterials()
        {
            var data = await _materialService.GetAllMaterials();
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var list = _mapper.Map<List<MaterialResponse>>(data);
            return Ok(list);
        }

        // GET: getMaterial/1
        [HttpGet]
        [Route("getMaterial/{materialId}")]
        public async Task<ActionResult<MaterialResponse>> GetMaterialById(string materialId)
        {
            var data = await _materialService.GetMaterialById(materialId);
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var material = _mapper.Map<MaterialResponse>(data);
            return Ok(material);
        }

        // POST: AddMaterial/[material]
        [HttpPost]
        [Route("addMaterial")]
        public async Task<ActionResult> AddAccount([FromBody] MaterialRequest materialRequest)
        {
            var data = await _materialService.AddMaterial(_mapper.Map<Material>(materialRequest));
            if (data == null)
            {
                return BadRequest("Not Found");
            }
            return Ok("Add successfully");
        }

        // PUT: UpdateMaterial/1
        [HttpPut]
        [Route("updateMaterial/{materialId}")]
        public async Task<ActionResult> UpdateMaterial(string materialId, [FromBody] MaterialRequest materialRequest)
        {
            var data = await _materialService.UpdateMaterial(materialId, _mapper.Map<Material>(materialRequest));
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

        // PUT: DelMaterial/1
        [HttpPut]
        [Route("delMaterial/{materialId}")]
        public async Task<ActionResult> DelMaterial(string materialId)
        {
            var data = await _materialService.DelMaterial(materialId);
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
