using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace GSP_API.Infrastructure.Repositories
{
    public class ComponentMaterialRepository : Repository<ComponentMaterial>, IComponentMaterialRepository
    {
        public ComponentMaterialRepository(DbFactory dbFactory) : base(dbFactory)
        {
        }

        public async Task<List<ComponentMaterial>> GetMaterialByComponentId(string componentID)
        {
            var query = DbSet.Where(p => p.ComponentId == componentID).Include(p => p.Material);
            //var sql = query.ToQueryString();
            var data = await query.ToListAsync();
            return data;
        }
    }
}
