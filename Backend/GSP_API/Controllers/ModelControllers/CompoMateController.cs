﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GSP_API.Business.Services;
using GSP_API.Models.Request;

namespace GSP_API.Controllers.ModelControllers
{
    public class CompoMateController : Controller
    {
        private readonly ComponentMaterialService _compoMateService;
        private readonly IMapper _mapper;
        public CompoMateController(ComponentMaterialService compoMateService, IMapper mapper)
        {
            _compoMateService = compoMateService;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getMateByCompoId/{compoId}")]
        public async Task<ActionResult<MaterialRequest>> GetMaterialByCompoId(string compoId)
        {
            var data = await _compoMateService.GetCompoMateByCompoId(compoId);
            if (data == null)
            {
                return BadRequest("Not Found");
            }
            var mates = _mapper.Map<MaterialRequest>(data);
            return Ok(mates);
        }

    }
}
