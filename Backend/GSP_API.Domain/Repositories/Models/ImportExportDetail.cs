using System;
using System.Collections.Generic;

#nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class ImportExportDetail
    {
        public int ImportExportDetailId { get; set; }
        public int? ImportExportId { get; set; }
        public int? ProcessDetailId { get; set; }
        public string ItemId { get; set; }
        public int? Amount { get; set; }

        public virtual ImportExport ImportExport { get; set; }
        public virtual Component Item { get; set; }
        public virtual Product Item1 { get; set; }
        public virtual Material ItemNavigation { get; set; }
    }
}
