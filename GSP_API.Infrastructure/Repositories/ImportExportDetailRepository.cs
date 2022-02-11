using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace GSP_API.Infrastructure.Repositories
{
    public class ImportExportDetailRepository : Repository<ImportExportDetail>, IImportExportDetailRepository
    {
        public ImportExportDetailRepository(DbFactory dbFactory) : base(dbFactory)
        {
        }        
    }
}
