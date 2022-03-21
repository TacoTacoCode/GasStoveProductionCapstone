using GSP_API.Domain.Repositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace GSP_API.Domain.Interfaces
{
    public interface IOrderRepository : IRepository<Order>
    {
        public Task<List<Order>> GetOrdersWithDetail();
    }
}
