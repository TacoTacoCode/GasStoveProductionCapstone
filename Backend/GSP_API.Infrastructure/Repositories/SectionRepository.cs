using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace GSP_API.Infrastructure.Repositories
{
    public class SectionRepository : Repository<Section>, ISectionRepository
    {
        public SectionRepository(DbFactory dbFactory) : base(dbFactory)
        {
        }

        public async Task<Section> GetSectionAndWorkersByLead(int sectionLeadId)
        {
            var data = await this.DbSet.Where(e => e.SectionLeadId == sectionLeadId).Include(s => s.Accounts).FirstAsync();
            return data;
        }
    }
}
