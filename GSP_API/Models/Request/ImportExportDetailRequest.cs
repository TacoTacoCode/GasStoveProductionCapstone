using GSP_API.Domain.Repositories.Models;
using System.Text.Json.Serialization;

namespace GSP_API.Models.Request
{
    public class ImportExportDetailRequest
    {
        public int ImportExportDetailId { get; set; }
        public int? ImportExportId { get; set; }
        public string ItemId { get; set; }
        public int? Amount { get; set; }        


        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual ImportExport ImportExport { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual Component Item { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual Material ItemNavigation { get; set; }
    }
}
