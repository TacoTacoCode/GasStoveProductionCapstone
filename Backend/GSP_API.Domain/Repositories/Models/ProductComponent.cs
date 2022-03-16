using System;
using System.Collections.Generic;

#nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class ProductComponent
    {
        public int Id { get; set; }
        public string ProductId { get; set; }
        public string ComponentId { get; set; }
        public int? Amount { get; set; }

        public virtual Component Component { get; set; }
        public virtual Product Product { get; set; }
    }
}
