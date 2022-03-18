using GSP_API.Domain.Repositories.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace GSP_API.Domain.Interfaces
{
    public interface IImportExportRepository : IRepository<ImportExport>
    {
        Task<List<ImportExport>> GetImExByItemType(Expression<Func<ImportExport, bool>> expression);
    }
}
