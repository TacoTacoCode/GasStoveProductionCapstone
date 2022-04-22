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
            ProductComponents = new HashSet<ProductComponent>();
            Sections = new HashSet<Section>();
        }

        public string ComponentId { get; set; }
        public string ComponentName { get; set; }
        public int? Amount { get; set; }
        public int? Average { get; set; }
        public string ImageUrl { get; set; }
        public string Status { get; set; }
        public string Substance { get; set; }
        public string Size { get; set; }
        public string Color { get; set; }
        public double? Weight { get; set; }
        public string Description { get; set; }
        public string ItemId { get; set; }

        public virtual ImExItem Item { get; set; }
        public virtual ICollection<ComponentMaterial> ComponentMaterials { get; set; }
        public virtual ICollection<ProductComponent> ProductComponents { get; set; }
        public virtual ICollection<Section> Sections { get; set; }
    }
}
