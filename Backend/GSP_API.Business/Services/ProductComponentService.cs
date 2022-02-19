using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System.Linq;

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

        public IQueryable<Role> CreateProCompo()
        {
            //IQueryable<Role> list = _productComponentRepository
            return null;
        }
    }
}
