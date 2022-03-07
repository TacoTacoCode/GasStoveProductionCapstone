﻿using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSP_API.Business.Services
{
    public class ProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<List<Product>> GetAllProducts()
        {
            return await _productRepository.GetAll(p => p.Status == "Active");
        }

        public async Task<Product> GetProductById(string productId)
        {
            return await _productRepository.GetById(p => p.ProductId == productId);
        }

        public async Task<string> AddProduct(Product product)
        {
            return await _productRepository.Add(product);
        }

        public async Task<string> UpdateProduct(Product newProduct)
        {
            var data = await _productRepository.FindById(p => p.ProductId == newProduct.ProductId);
            if (data != null)
            {
                return await _productRepository.Update(newProduct);
            }
            return null;
        }

        public async Task<string> DelProduct(string productId)
        {
            var data = await _productRepository.GetById(p => p.ProductId == productId);
            if (data != null)
            {
                data.Status = "Inactive";
                return await _productRepository.Update(data);
            }
            return null;
        }


    }
}
