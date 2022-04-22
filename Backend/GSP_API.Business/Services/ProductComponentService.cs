using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSP_API.Business.Services
{
    public class ProductComponentService
    {
        private readonly IProductComponentRepository _productComponentRepository;

        public ProductComponentService(
            IProductComponentRepository productComponentRepository)
        {
            _productComponentRepository = productComponentRepository;
        }

        public async Task<ProductComponent> GetProCompoById(int proCompoId)
        {
            return await _productComponentRepository.GetById(p => p.Id == proCompoId);
        }

        public async Task<List<ProductComponent>> GetProCompoByProId(string productId)
        {
            return await _productComponentRepository.GetAll(p => p.ProductId == productId);
        }

        public async Task<List<ProductComponent>> GetProCompo(string productId)
        {
            var data = await _productComponentRepository.GetProCompo(productId);
            return data;
        }

        public async Task<string> AddProCompo(ProductComponent proCompo)
        {
            return await _productComponentRepository.Add(proCompo); ;
        }

        public async Task<string> UpdateProCompo(ProductComponent newProCompo)
        {
            var data = await _productComponentRepository.FindFirst(p => p.Id == newProCompo.Id);
            if (data != null)
            {
                return await _productComponentRepository.Update(newProCompo);
            }
            return null;
        }

        public async Task<string> AddRangeProCompo(List<ProductComponent> proCompoList)
        {
            return await _productComponentRepository.AddRange(proCompoList);
        }
    }
}
