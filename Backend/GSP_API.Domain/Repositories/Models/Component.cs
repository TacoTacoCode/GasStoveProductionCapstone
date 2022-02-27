using System;
using System.Collections.Generic;

#nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class Component
    {
        public Component()
        {
            ComponentMaterials = new HashSet<ComponentMaterial>();
            ImportExportDetails = new HashSet<ImportExportDetail>();
            ProductComponents = new HashSet<ProductComponent>();
            Sections = new HashSet<Section>();
        }

        public string ComponentId { get; set; }
        public string ComponentName { get; set; }
        public int? Amount { get; set; }
        public string ImageUrl { get; set; }
        public DateTime? ManufactuirngDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string Status { get; set; }
        public string Substance { get; set; }
        public string Size { get; set; }
        public string Color { get; set; }
        public double? Weight { get; set; }

        public virtual ICollection<ComponentMaterial> ComponentMaterials { get; set; }
        public virtual ICollection<ImportExportDetail> ImportExportDetails { get; set; }
        public virtual ICollection<ProductComponent> ProductComponents { get; set; }
        public virtual ICollection<Section> Sections { get; set; }
    }
}
