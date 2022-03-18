using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace GSP_API.Infrastructure.Repositories
{
    public class ImportExportRepository : Repository<ImportExport>, IImportExportRepository
    {
        public ImportExportRepository(DbFactory dbFactory) : base(dbFactory)
        { 

        }

        public Task<List<ImportExport>> GetImExByItemType(Expression<Func<ImportExport, bool>> expression)
        {
            return null;
        }
    }
}
