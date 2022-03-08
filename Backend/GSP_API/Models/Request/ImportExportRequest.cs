using GSP_API.Domain.Repositories.Models;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace GSP_API.Models.Request
{
    public class ImportExportRequest
    {
        public int ImportExportId { get; set; }
        public int? SectionId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ItemType { get; set; }
        public bool? IsImport { get; set; }
        public string Status { get; set; }
        public DateTime? FirstExportDate { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual ItemType ItemTypeNavigation { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual ICollection<ImportExportDetail> ImportExportDetails { get; set; }
    }
}
