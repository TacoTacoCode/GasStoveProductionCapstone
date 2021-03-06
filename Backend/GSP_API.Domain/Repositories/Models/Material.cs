using System;
using System.Collections.Generic;

#nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class Material
    {
        public Material()
        {
            ComponentMaterials = new HashSet<ComponentMaterial>();
        }

        public string MaterialId { get; set; }
        public string MaterialName { get; set; }
        public int? Amount { get; set; }
        public string Unit { get; set; }
        public string ImageUrl { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }
        public string ItemId { get; set; }

        public virtual ImExItem Item { get; set; }
        public virtual ICollection<ComponentMaterial> ComponentMaterials { get; set; }
    }
}
