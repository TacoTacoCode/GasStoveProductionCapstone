using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class Material
    {
        public Material()
        {
            ComponentMaterial = new HashSet<ComponentMaterial>();
            ImportExportDetail = new HashSet<ImportExportDetail>();
        }

        public string MaterialId { get; set; }
        public string MaterialName { get; set; }
        public int? Amount { get; set; }
        public string Unit { get; set; }
        public string ImageUrl { get; set; }
        public string Status { get; set; }

        public virtual ICollection<ComponentMaterial> ComponentMaterial { get; set; }
        public virtual ICollection<ImportExportDetail> ImportExportDetail { get; set; }
    }
}
