using AutoMapper;
using GSP_API.Business.Services;
using GSP_API.Models.Response;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSP_API.Controllers.ModelControllers
{
    [ApiController]
    public class ProductCompoController : Controller
    {
        private readonly ProductComponentService _productCompoService;
        private readonly IMapper _mapper;
        public ProductCompoController(ProductComponentService productCompoService, IMapper mapper)
        {
            _productCompoService = productCompoService;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getCompoByProductId/{productId}")]
        public async Task<ActionResult<List<ProductCompoResponse>>> GetCompoByProductId(string productId)
        {
            var data = await _productCompoService.GetProCompoByProId(productId);
            if (data == null)
            {
                return BadRequest("Not Found");
            }
            var mates = _mapper.Map<List<ProductCompoResponse>>(data);
            return Ok(mates);
        }

        [HttpGet]
        [Route("getProCompo/{productId}")]
        public async Task<ActionResult<List<ProductCompoResponse>>> GetProCompo(string productId)
        {
            var data = await _productCompoService.GetProCompo(productId);
            if (data == null)
            {
                return BadRequest("Not Found");
            }
            var mates = _mapper.Map<List<ProductCompoResponse>>(data);
            return Ok(mates);
        }
    }
}
