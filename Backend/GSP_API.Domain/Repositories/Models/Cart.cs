using System;
using System.Collections.Generic;

#nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class Cart
    {
        public int CartId { get; set; }
        public int? AccountId { get; set; }
        public string CartInfo { get; set; }
        public double? TotalPrice { get; set; }

        public virtual Account Account { get; set; }
    }
}
