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
            return await _productRepository.GetAll(p => p.ProductId != null);
        }

        public async Task<Product> GetProductById(string productId)
        {
            return await _productRepository.GetById(p => p.ProductId == productId);
        }

        public async Task<List<Product>> GetProductsByStatus(string status)
        {
            return await _productRepository.GetAll(p => p.Status == status);
        }

        public async Task<string> AddProduct(Product product, Dictionary<string, int> compoItems)
        {
            var pros = await _productRepository.FindFirst(p => p.ProductId == product.ProductId);
            if(pros == null)
            {
                foreach (var item in compoItems)
                {
                    product.ProductComponents.Add(new()
                    {
                        ComponentId = item.Key,
                        Amount = item.Value
                    }); ;
                }
                return await _productRepository.Add(product);
            }
            foreach (var item in compoItems)
            {
                pros.ProductComponents.Add(new()
                {
                    ComponentId = item.Key,
                    Amount = item.Value
                }); ;
            }
            return await _productRepository.Update(pros);

        }
        public async Task<string> UpdateProdct(Product product, Dictionary<string, int> compoItems)
        {
            foreach (var item in compoItems)
            {
                product.ProductComponents.Add(new()
                {
                    ComponentId = item.Key,
                    Amount = item.Value
                }); ;
            }
            return await _productRepository.Add(product);
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

        public async Task<IDictionary<int, Product>> AddRangeProduct(List<Product> products)
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
