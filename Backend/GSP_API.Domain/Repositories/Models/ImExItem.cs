using System;
using System.Collections.Generic;

#nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class ImExItem
    {
        public ImExItem()
        {
            Components = new HashSet<Component>();
            ImportExportDetails = new HashSet<ImportExportDetail>();
            Materials = new HashSet<Material>();
            Products = new HashSet<Product>();
        }

        public string Id { get; set; }
        public string ItemType { get; set; }
        public string ItemId { get; set; }

        public virtual ICollection<Component> Components { get; set; }
        public virtual ICollection<ImportExportDetail> ImportExportDetails { get; set; }
        public virtual ICollection<Material> Materials { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}
