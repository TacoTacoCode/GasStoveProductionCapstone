using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;

namespace GSP_API.Infrastructure.Repositories
{
    public class RefreshTokenRepository : Repository<RefreshToken>, IRefreshTokenRepository
    {
        public RefreshTokenRepository(DbFactory dbFactory) : base(dbFactory)
        {
        }        
    }
}
