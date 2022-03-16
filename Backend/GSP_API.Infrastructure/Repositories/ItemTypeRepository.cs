using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSP_API.Infrastructure.Repositories
{
    public class IItemRepository : Repository<ItemType>, IItemTypesRepository
    {
        public IItemRepository(DbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
