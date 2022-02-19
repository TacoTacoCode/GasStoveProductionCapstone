﻿using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class Order
    {
        public Order()
        {
            OrderDetail = new HashSet<OrderDetail>();
        }

        public int OrderId { get; set; }
        public int? AccountId { get; set; }
        public double? TotalPrice { get; set; }
        public DateTime? Deadline { get; set; }
        public string Status { get; set; }
        public string Note { get; set; }

        public virtual Account Account { get; set; }
        public virtual ICollection<OrderDetail> OrderDetail { get; set; }
    }
}