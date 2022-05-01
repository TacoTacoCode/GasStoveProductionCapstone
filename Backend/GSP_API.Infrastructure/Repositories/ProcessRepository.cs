using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace GSP_API.Infrastructure.Repositories
{
    public class ProcessRepository : Repository<Process>, IProcessRepository
    {
        public ProcessRepository(DbFactory dbFactory) : base(dbFactory)
        {
        }

        public async Task<List<Process>> FindProcessWithDetails(Expression<Func<Process, bool>> expression)
        {
            var data = await DbSet.Where(expression).Include(p => p.ProcessDetails).ToListAsync();
            return data;
        }

        public async Task<int> GetNotDoneProcessByOrderDetailId(int orderDetailId)
        {
            var proList = await DbSet.Where(p => p.OrderDetailId == orderDetailId && !p.Status.Equals("Done")).ToListAsync();
            return proList.Count;
        }
    }
}
