using System;
using System.Collections.Generic;

#nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class ComponentMaterial
    {
        public int Id { get; set; }
        public string ComponentId { get; set; }
        public string MaterialId { get; set; }
        public int? Amount { get; set; }

        public virtual Component Component { get; set; }
        public virtual Material Material { get; set; }
    }
}
