using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class ImportExportDetail
    {
        public int ImportExportDetailId { get; set; }
        public int? ImportExportId { get; set; }
        public string ItemId { get; set; }
        public int? Amount { get; set; }

        public virtual ImportExport ImportExport { get; set; }
        public virtual Component Item { get; set; }
        public virtual Material ItemNavigation { get; set; }
    }
}
