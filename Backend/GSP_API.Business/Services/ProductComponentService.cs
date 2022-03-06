using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
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

        public async Task<string> AddCompoMate(ProductComponent proCompo)
        {
            return await _productComponentRepository.Add(proCompo); ;
        }

        public async Task<string> UpdateCompoMate(ProductComponent newProCompo)
        {
            var data = await _productComponentRepository.FindById(p => p.Id == newProCompo.Id);
            if (data != null)
            {
                return await _productComponentRepository.Update(newProCompo);
            }
            return null;
        }
    }
}
