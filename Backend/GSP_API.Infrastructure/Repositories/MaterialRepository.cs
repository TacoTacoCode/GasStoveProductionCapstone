using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;

namespace GSP_API.Infrastructure.Repositories
{
    public class MaterialRepository : Repository<Material>, IMaterialRepository
    {
        public MaterialRepository(DbFactory dbFactory) : base(dbFactory)
        {
        }        
    }
}
