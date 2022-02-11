using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;

namespace GSP_API.Infrastructure.Repositories
{
    public class ProcessRepository : Repository<Process>, IProcessRepository
    {
        public ProcessRepository(DbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
