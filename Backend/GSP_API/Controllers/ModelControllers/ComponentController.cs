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
using Newtonsoft.Json;

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


        [HttpGet]
        [Route("getCompoNoSection")]
        public async Task<ActionResult<List<ComponentResponse>>> GetCompoNoSection()
        {
            var data = await _componentService.GetCompoNoSection();
            if (data == null)
            {
                return NotFound("Not found");
            }
            var list = _mapper.Map<List<ComponentResponse>>(data);
            return Ok(list);
        }

        // GET: getAllComponents
        [HttpGet]
        [Route("getAllComponents")]
        public async Task<ActionResult<List<ComponentResponse>>> GetAllComponents()
        {
            var data = await _componentService.GetAllComponents();
            if (data == null)
            {
                return NotFound("Not found");
            }
            var list = _mapper.Map<List<ComponentResponse>>(data);
            return Ok(list);
        }

        // GET: getComponent/[status] active/inactive
        [HttpGet]
        [Route("getComponents/{status}")]
        public async Task<ActionResult<List<ComponentResponse>>> GetComponentByStatus(string status)
        {
            var data = await _componentService.GetComponentsByStatus(status);
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var list = _mapper.Map<List<ComponentResponse>>(data);
            return Ok(list);
        }

        [HttpPost]
        [Route("addComponent")]
        public async Task<ActionResult> AddComponent([FromForm] ComponentRequest component, IFormFile file)
        {
            var json = Request.Form["componentMaterial"];
            if (json.Count != 0)
            {
                var compoMate = JsonConvert.DeserializeObject<List<CompoMateRequest>>(Request.Form["componentMaterial"]);
                component.ComponentMaterial = compoMate;
            }
            Stream fileStream = null;
            var fileName = component.ImageUrl?? "no-image.jpg?alt=media&token=c45f5852-28eb-4b4d-87a8-2caefb10df12";
            if (file != null)
            {
                fileStream = file.OpenReadStream();
                fileName = file.FileName;
            }
            var imexItem = _mapper.Map<ImExItem>(component);
            var data = await _componentService.AddComponent(_mapper.Map<Component>(component), fileStream, fileName, imexItem);
            if (file != null)
            {
                fileStream.Dispose();
            }
            if (data.Contains("error"))
            {
                return StatusCode(500, data);
            }
            return Ok("Add successfully");
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

        // PUT: UpdateComponent/[component]
        [HttpPut]
        [Route("updateComponent")]
        public async Task<ActionResult<ComponentResponse>> UpdateComponent([FromForm] ComponentRequest componentRequest, IFormFile file)
        {
            var json = Request.Form["componentMaterial"];
            if (json.Count != 0)
            {
                var compoMate = JsonConvert.DeserializeObject<List<CompoMateRequest>>(Request.Form["componentMaterial"]);
                componentRequest.ComponentMaterial = compoMate;
            }
            Stream fileStream = null;
            var fileName =componentRequest.ImageUrl ?? "no-image.jpg?alt=media&token=c45f5852-28eb-4b4d-87a8-2caefb10df12";
            if (file != null)
            {
                fileStream = file.OpenReadStream();
                fileName = file.FileName;
            }
            var data = await _componentService.UpdateComponent(_mapper.Map<Component>(componentRequest), fileStream, fileName);
            if (file != null)
            {
                fileStream.Dispose();
            }
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
        public async Task<ActionResult> DelComponent(string componentId)
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



    }
}

