
using AutoMapper;
using GSP_API.Business.Services;
using GSP_API.Domain.Repositories.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace GSP_API.Controllers.ModelControllers
{
    public class FileController : Controller
    {
        private readonly ProductService _productService;
        private readonly ComponentService _componentService;
        private readonly MaterialService _materialService;
        private readonly AccountService _accountService;

        public FileController(ProductService productService, ComponentService componentService, MaterialService materialService, AccountService accountService)
        {
            _productService = productService;
            _componentService = componentService;
            _materialService = materialService;
            _accountService = accountService;
        }

        [HttpGet]
        [Route("downloadFile")]
        public async Task<IActionResult> Download(string name)
        {
            var filePath = "ErrorRecord/" + name;
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

        // POST: uploadFile/product/[file]
        [HttpPost]
        [Route("uploadFile/product")]
        public async Task<IActionResult> UploadProducts(IFormFile file)
        {
            using (var memoryStream = new MemoryStream())
            {
                file.CopyTo(memoryStream);
                var excelList = GSP_API.Business.Extensions.Excel.ImportExcel<Product>(memoryStream);
                var errorDic = await _productService.AddRangeProduct(excelList);
                var fileName = "";
                if (errorDic.Count > 0)
                {
                    fileName = GSP_API.Business.Extensions.Excel.ExportExcel<Product>(errorDic);
                }
                return Ok(fileName);
            }
        }

        // POST: uploadFile/component/[file]
        [HttpPost]
        [Route("uploadFile/component")]
        public async Task<IActionResult> UploadComponents(IFormFile file)
        {
            using (var memoryStream = new MemoryStream())
            {
                file.CopyTo(memoryStream);
                var excelList = GSP_API.Business.Extensions.Excel.ImportExcel<Component>(memoryStream);
                var errorDic = await _componentService.AddRangeComponent(excelList);
                var fileName = "";
                if (errorDic.Count > 0)
                {
                    fileName = GSP_API.Business.Extensions.Excel.ExportExcel<Component>(errorDic);
                }
                return Ok(fileName);
            }
        }

        // POST: uploadFile/material/[file]
        [HttpPost]
        [Route("uploadFile/material")]
        public async Task<IActionResult> UploadMaterials(IFormFile file)
        {
            using (var memoryStream = new MemoryStream())
            {
                file.CopyTo(memoryStream);
                var excelList = GSP_API.Business.Extensions.Excel.ImportExcel<Material>(memoryStream);
                var errorDic = await _materialService.AddRangeMaterial(excelList);
                var fileName = "";
                if (errorDic.Count > 0)
                {
                    fileName = GSP_API.Business.Extensions.Excel.ExportExcel<Material>(errorDic);
                }
                return Ok(fileName);
            }
        }

        // POST: uploadFile/Account/[file]
        [HttpPost]
        [Route("uploadFile/account")]
        public async Task<IActionResult> UploadAccount(IFormFile file)
        {
            using (var memoryStream = new MemoryStream())
            {
                file.CopyTo(memoryStream);
                var excelList = GSP_API.Business.Extensions.Excel.ImportExcel<Account>(memoryStream);
                var errorDic = await _accountService.AddRangeAccount(excelList);
                var fileName = "";
                if (errorDic.Count > 0)
                {
                    fileName = GSP_API.Business.Extensions.Excel.ExportExcel<Account>(errorDic);
                }
                return Ok(fileName);
            }
        }

    }
}
