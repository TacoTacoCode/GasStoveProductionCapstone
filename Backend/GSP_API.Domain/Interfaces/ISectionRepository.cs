using GSP_API.Domain.Repositories.Models;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace GSP_API.Domain.Interfaces
{
    public interface ISectionRepository : IRepository<Section>
    {
        Task<Section> GetSectionAndWorkersByLead(int sectionLeadId);
    }
}
