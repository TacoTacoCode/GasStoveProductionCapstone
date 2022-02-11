using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class Component
    {
        public Component()
        {
            ComponentMaterial = new HashSet<ComponentMaterial>();
            ImportExportDetail = new HashSet<ImportExportDetail>();
            ProductComponent = new HashSet<ProductComponent>();
            Section = new HashSet<Section>();
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

        public virtual ICollection<ComponentMaterial> ComponentMaterial { get; set; }
        public virtual ICollection<ImportExportDetail> ImportExportDetail { get; set; }
        public virtual ICollection<ProductComponent> ProductComponent { get; set; }
        public virtual ICollection<Section> Section { get; set; }
    }
}
