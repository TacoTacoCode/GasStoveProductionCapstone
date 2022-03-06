using System;
using System.Collections.Generic;

#nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class ImportExport
    {
        public ImportExport()
        {
            ImportExportDetails = new HashSet<ImportExportDetail>();
        }

        public int ImportExportId { get; set; }
        public int? SectionId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ItemType { get; set; }
        public bool? IsImport { get; set; }
        public string Status { get; set; }
        public DateTime? FirstExportDate { get; set; }

        public virtual ItemType ItemTypeNavigation { get; set; }
        public virtual ICollection<ImportExportDetail> ImportExportDetails { get; set; }
    }
}
