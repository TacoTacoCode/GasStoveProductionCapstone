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
    public class ProductComponentRepository : Repository<ProductComponent>, IProductComponentRepository
    {
        public ProductComponentRepository(DbFactory dbFactory) : base(dbFactory)
        {

        }

        public Task<List<ProductComponent>> GetProCompo(string productId)
        {
            var data = DbSet.Where(p => p.ProductId == productId)
                .Include(p => p.Product).Include(p => p.Component).ToListAsync();
            return data;
        }

        public List<ProductComponent> GetProCompoByProId2(string productId)
        {
            var data = DbSet.Where(p => p.ProductId == productId).Include(p => p.Component.Sections).ToList();
            return data;
        }
    }
}
