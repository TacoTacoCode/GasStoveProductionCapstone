using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;

namespace GSP_API.Infrastructure.Repositories
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductRepository(DbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
