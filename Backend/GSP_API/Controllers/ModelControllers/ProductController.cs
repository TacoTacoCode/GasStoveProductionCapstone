﻿using AutoMapper;
using GSP_API.Models.Request;
using GSP_API.Models.Response;
using GSP_API.Business.Services;
using GSP_API.Domain.Repositories.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Text.Json;
using Newtonsoft.Json;
using System.Reflection;

namespace GSP_API.Controllers.ModelControllers
{
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _productService;
        private readonly IMapper _mapper;

        public ProductController(
             ProductService productService,
             IMapper mapper)
        {
            _productService = productService;
            _mapper = mapper;
        }

        // GET: getProducts
        [HttpGet]
        [Route("getProducts")]
        public async Task<ActionResult<List<ProductResponse>>> GetAllProducts()
        {
            var data = await _productService.GetAllProducts();
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var list = _mapper.Map<List<ProductResponse>>(data);
            return Ok(list);
        }

        // GET: getProduct/1
        [HttpGet]
        [Route("getProduct/{productId}")]
        public async Task<ActionResult<ProductResponse>> GetProductById(string productId)
        {
            var data = await _productService.GetProductById(productId);
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var product = _mapper.Map<ProductResponse>(data);
            return Ok(product);
        }
/*
        // POST: AddProduct/[product]
        [HttpPost]
        [Route("addProduct")]
        public async Task<ActionResult> AddAccount([FromBody] ProductRequest productRequest, List<Component> components)
        {
            var data = await _productService.AddProduct(_mapper.Map<Product>(productRequest), components);
            if (data == null)
            {
                return BadRequest("Not Found");
            }
            return Ok("Add successfully");
        }
*/
        // PUT: UpdateProduct/[product]
        [HttpPut]
        [Route("updateProduct")]
        public async Task<ActionResult> UpdateProduct([FromBody] ProductRequest productRequest)
        {
            var data = await _productService.UpdateProduct(_mapper.Map<Product>(productRequest));
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

        // PUT: DelProduct/1
        [HttpPut]
        [Route("delProduct/{productId}")]
        public async Task<ActionResult> DelProduct(string productId)
        {
            var data = await _productService.DelProduct(productId);
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

        // POST: uploadFile/product/[file]
        [HttpPost]
        [Route("uploadFile/product")]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            using (var memoryStream = new MemoryStream())
            {
                file.CopyTo(memoryStream);
                var productList = GSP_API.Business.Extensions.Excel.ImportExcel<Product>(memoryStream);
                var errorDic = await _productService.AddRangeProduct(productList);
                if(errorDic.Count > 0)
                {
                    GSP_API.Business.Extensions.Excel.ExportExcel<Product>(errorDic);
                    return Ok("Error record exit!!");

                }
                else
                {
                    return Ok();
                }
                //return Ok(errorDic);
            }
        }
        [HttpGet]
        [Route("downloadFile/product")]
        public async Task<IActionResult> Download()
        {
            var filePath = "error.xlsx";
            string contentType = "application/octet-stream";
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound();
            }
            else
            {
                byte[] fileBype = await System.IO.File.ReadAllBytesAsync(filePath);
                return File(fileBype, contentType, "error.xlsx");
            }
        }

    }
}
