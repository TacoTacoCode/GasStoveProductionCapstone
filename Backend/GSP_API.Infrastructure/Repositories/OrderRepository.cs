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
    public class OrderRepository : Repository<Order>, IOrderRepository
    {
        public OrderRepository(DbFactory dbFactory) : base(dbFactory)
        {
        }

        public async Task<List<Order>> GetOrdersWithDetail()
        {
            var data = await this.DbSet.Include(p => p.OrderDetails).ToListAsync();
            return data;
        }
    }
}
