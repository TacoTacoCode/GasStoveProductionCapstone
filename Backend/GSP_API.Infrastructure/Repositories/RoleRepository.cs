using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace GSP_API.Infrastructure.Repositories
{
    public class RoleRepository : Repository<Role>, IRoleRepository
    {
        public RoleRepository(DbFactory dbFactory) : base(dbFactory)
        {
        }

        public IQueryable<Role> GetRoleByAccount(Expression<Func<Role, bool>> expression)
        {
            return DbSet.Where(expression);
        }

        
    }
}
