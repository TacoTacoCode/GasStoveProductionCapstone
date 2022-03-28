using GSP_API.Domain.Repositories.Models;
using Newtonsoft.Json;

namespace GSP_API.Models.Request
{
    public class ImportExportDetailRequest
    {
        public int ImportExportDetailId { get; set; }
        public int? ImportExportId { get; set; }
        public int? ProcessDetailId { get; set; }
        public string ItemId { get; set; }
        public int? Amount { get; set; }
        public int? ExportedAmount { get; set; }
    }
}
