using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System;
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
            try
            {
                return await _productRepository.Add(product);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<string> UpdateProduct(Product newProduct)
        {
            var data = await _productRepository.FindFirst(p => p.ProductId == newProduct.ProductId);
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

        public async Task<Product> FindProductById(string productId)
        {
            return await _productRepository.FindFirst(p => p.ProductId == productId);
        }

        public async Task<IDictionary<int, Product>> AddRange(List<Product> products)
        {
            var returnDic = new Dictionary<int, Product>();
            var addList = new List<Product>();
            foreach (var pro in products)
            {
                var tmp = await FindProductById(pro.ProductId);
                if (tmp != null)
                {
                    returnDic.Add(products.IndexOf(pro) + 1, pro);
                }
                else
                {
                    addList.Add(pro);
                }
            }
            await _productRepository.AddRange(addList);
            return returnDic;
        }
    }
}
