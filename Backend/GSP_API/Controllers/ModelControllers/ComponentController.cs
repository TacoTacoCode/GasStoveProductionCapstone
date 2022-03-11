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
using System.IO;
using Microsoft.AspNetCore.Http;

namespace GSP_API.Controllers.ModelControllers
{
    [ApiController]
    public class ComponentController : ControllerBase
    {

        private readonly ComponentService _componentService;
        private readonly IMapper _mapper;

        public ComponentController(
             ComponentService componentService,
             IMapper mapper)
        {
            _componentService = componentService;
            _mapper = mapper;
        }

        // GET: getAllComponents
        [HttpGet]
        [Route("getAllComponents")]
        public async Task<ActionResult<List<ComponentResponse>>> GetAllAccounts()
        {
            var data = await _componentService.GetAllComponents();
            if (data == null)
            {
                return NotFound();
            }
            var list = _mapper.Map<List<ComponentResponse>>(data);
            return Ok(list);
        }

        // GET: getComponent/1
        [HttpGet]
        [Route("getComponent/{componentId}")]
        public async Task<ActionResult<ComponentResponse>> GetComponentById(string componentId)
        {
            var data = await _componentService.GetComponentById(componentId);
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var component = _mapper.Map<ComponentResponse>(data);
            return Ok(component);
        }

        // POST: AddComponent/[component]
        [HttpPost]
        [Route("addComponent")]
        public async Task<ActionResult> AddComponent([FromBody] ComponentRequest componentRequest)
        {
            var data = await _componentService.AddComponent(_mapper.Map<Component>(componentRequest));
            if (data == null)
            {
                return BadRequest("Not Found");
            }
            return Ok("Add successfully");
        }

        // PUT: UpdateComponent
        [HttpPut]
        [Route("updateComponent")]
        public async Task<ActionResult<ComponentResponse>> UpdateComponent([FromBody] ComponentRequest componentRequest)
        {
            var data = await _componentService.UpdateComponent(_mapper.Map<Component>(componentRequest));
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

        // PUT: DelComponent/1
        [HttpPut]
        [Route("delComponent/{componentId}")]
        public async Task<ActionResult> DelAttendance(string componentId)
        {
            var data = await _componentService.DelComponent(componentId);
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

        //private bool AccountExists(string id)
        //{
        //    return _context.Account.Any(e => e.AccountId == id);
        //}

        [HttpPost]
        [Route("uploadFile/component")]
        public async Task<IActionResult> Upload([FromForm] IFormFile file)
        {
            using (var memoryStream = new MemoryStream())
            {
                file.CopyTo(memoryStream);
                var materialList = GSP_API.Business.Extensions.Excel.ImportExcel<Component>(memoryStream);
                var errorDic = await _componentService.AddRange(materialList);
                return Ok(errorDic);
            }
        }
    }
}

