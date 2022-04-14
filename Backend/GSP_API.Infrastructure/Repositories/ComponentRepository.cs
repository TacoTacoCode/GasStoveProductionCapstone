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
    public class ComponentRepository: Repository<Component>, IComponentRepository 
    {
        public ComponentRepository(DbFactory dbFactory) : base(dbFactory)
        {
        }

        public async Task<List<Component>> GetComponentsNoSection()
        {
            var query = @"select dbo.Component.*
                        from dbo.Component
                        left join dbo.Section on Component.ComponentId = Section.ComponentId
                        where Section.ComponentId is null";
            var data = await DbSet.FromSqlRaw(query).ToListAsync();
            return data;
        }
    }
}
