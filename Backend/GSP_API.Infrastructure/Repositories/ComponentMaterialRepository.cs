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

    }
}
