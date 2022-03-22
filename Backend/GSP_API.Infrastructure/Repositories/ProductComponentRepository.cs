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

        public List<ProductComponent> GetProCompoByProId2(string productId)
        {
            var data = DbSet.Where(p => p.ProductId == productId).Include(p => p.Component.Sections).ToList();
            return data;
        }
    }
}
