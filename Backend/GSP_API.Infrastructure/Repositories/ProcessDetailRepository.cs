using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;

namespace GSP_API.Infrastructure.Repositories
{
    public class ProcessDetailRepository : Repository<ProcessDetail>, IProcessDetailRepository
    {
        public ProcessDetailRepository(DbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
