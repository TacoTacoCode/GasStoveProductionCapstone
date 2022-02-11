using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class ImportExport
    {
        public ImportExport()
        {
            ImportExportDetail = new HashSet<ImportExportDetail>();
        }

        public int ImportExportId { get; set; }
        public int? AccountId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ItemType { get; set; }
        public bool? IsImport { get; set; }
        public bool? IsAccepted { get; set; }

        public virtual Account Account { get; set; }
        public virtual Types ItemTypeNavigation { get; set; }
        public virtual ICollection<ImportExportDetail> ImportExportDetail { get; set; }
    }
}
