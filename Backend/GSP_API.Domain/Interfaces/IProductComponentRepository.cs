using GSP_API.Domain.Repositories.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GSP_API.Domain.Interfaces
{
    public interface IProductComponentRepository : IRepository<ProductComponent>
    {
        List<ProductComponent> GetProCompoByProId2(string productId);
        Task<List<ProductComponent>> GetProCompo(string productId);
    }
}
