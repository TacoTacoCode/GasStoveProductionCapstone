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

        // GET: getProduct/[status] active/inactive
        [HttpGet]
        [Route("getProducts/{status}")]
        public async Task<ActionResult<List<ProductResponse>>> GetProductByStatus(string status)
        {
            var data = await _productService.GetProductsByStatus(status);
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

        // POST: AddProduct/[product]
        [HttpPost]
        [Route("addProduct")]
        public async Task<ActionResult> AddProduct([FromForm]ProductRequest productRequest, IFormFile file)
        {
            var json = Request.Form["productComponents"];
            if (json.Count != 0)
            {
                var compoMate = JsonConvert.DeserializeObject<List<ProductComponentRequest>>(Request.Form["productComponents"]);
                productRequest.ProductComponents = compoMate;
            }
            Stream fileStream = null;
            var fileName = productRequest.ImageUrl ?? "no-image.jpg?alt=media&token=c45f5852-28eb-4b4d-87a8-2caefb10df12";
            if (file != null)
            {
                fileStream = file.OpenReadStream();
                fileName = file.FileName;
            }
            var product = new Product()
            {
                ProductId = productRequest.ProductId,
                ProductName = productRequest.ProductName,
                Amount = productRequest.Amount,
                Description = productRequest.Description,
                ImageUrl = productRequest.ImageUrl,
                Price = productRequest.Price,
                Status = productRequest.Status,
                ProductComponents = _mapper.Map<ICollection<ProductComponent>>(productRequest.ProductComponents),
            };
            //var product2 = _mapper.Map<Product>(productRequest);
            var data = await _productService.AddProduct(product, fileStream, fileName);
            if (file != null)
            {
                fileStream.Dispose();
            }
            if (data.Contains("error"))
            {
                return BadRequest(data);
            }
            return Ok("Add successfully");
        }

        // PUT: UpdateProduct/[product]
        [HttpPut]
        [Route("updateProduct")]
        public async Task<ActionResult> UpdateProduct([FromForm] ProductRequest productRequest, IFormFile file)
        {
            var json = Request.Form["productComponents"];
            if (json.Count != 0)
            {
                var compoMate = JsonConvert.DeserializeObject<List<ProductComponentRequest>>(Request.Form["productComponents"]);
                productRequest.ProductComponents = compoMate;
            }
            Stream fileStream = null;
            var fileName = productRequest.ImageUrl ?? "no-image.jpg?alt=media&token=c45f5852-28eb-4b4d-87a8-2caefb10df12";
            if (file != null)
            {
                fileStream = file.OpenReadStream();
                fileName = file.FileName;
            }
            var data = await _productService.UpdateProduct(_mapper.Map<Product>(productRequest), fileStream, fileName);
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


    }
}
