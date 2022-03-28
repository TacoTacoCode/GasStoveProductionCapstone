using System;
using System.Collections.Generic;
using Newtonsoft.Json;

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

        public virtual ICollection<ImportExportDetailRequest> ImportExportDetails { get; set; }
    }
}
