using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class Product
    {
        public Product()
        {
            OrderDetail = new HashSet<OrderDetail>();
            ProductComponent = new HashSet<ProductComponent>();
        }

        public string ProductId { get; set; }
        public string ProductName { get; set; }
        public int? Amount { get; set; }
        public double? Price { get; set; }
        public string ImageUrl { get; set; }
        public DateTime? ManufacturingDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string Status { get; set; }

        public virtual ICollection<OrderDetail> OrderDetail { get; set; }
        public virtual ICollection<ProductComponent> ProductComponent { get; set; }
    }
}
