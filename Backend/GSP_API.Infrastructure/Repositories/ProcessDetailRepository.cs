using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
namespace GSP_API.Infrastructure.Repositories
{
    public class ProcessDetailRepository : Repository<ProcessDetail>, IProcessDetailRepository
    {
        public ProcessDetailRepository(DbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
