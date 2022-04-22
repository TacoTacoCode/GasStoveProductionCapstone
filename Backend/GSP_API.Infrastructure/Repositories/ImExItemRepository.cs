using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GSP_API.Infrastructure.Repositories
{
    public class ImExItemRepository: Repository<ImExItem>, IImExItemRepository
    {
        public ImExItemRepository(DbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
