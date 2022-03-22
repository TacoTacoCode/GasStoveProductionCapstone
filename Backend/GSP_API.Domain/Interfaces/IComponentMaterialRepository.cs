using GSP_API.Domain.Repositories.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GSP_API.Domain.Interfaces
{
    public interface IComponentMaterialRepository : IRepository<ComponentMaterial>
    {
        Task<List<ComponentMaterial>> GetMaterialByComponentId(string componentID);
    }
}
