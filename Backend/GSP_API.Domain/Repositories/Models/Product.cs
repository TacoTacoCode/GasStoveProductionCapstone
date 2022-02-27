﻿using System;
using System.Collections.Generic;

#nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class Product
    {
        public Product()
        {
            ImportExportDetails = new HashSet<ImportExportDetail>();
            OrderDetails = new HashSet<OrderDetail>();
            ProductComponents = new HashSet<ProductComponent>();
        }

        public string ProductId { get; set; }
        public string ProductName { get; set; }
        public int? Amount { get; set; }
        public double? Price { get; set; }
        public string ImageUrl { get; set; }
        public DateTime? ManufacturingDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string Status { get; set; }

        public virtual ICollection<ImportExportDetail> ImportExportDetails { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
        public virtual ICollection<ProductComponent> ProductComponents { get; set; }
    }
}
