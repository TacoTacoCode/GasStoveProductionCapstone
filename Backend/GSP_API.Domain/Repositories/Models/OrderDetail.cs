using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class OrderDetail
    {
        public OrderDetail()
        {
            Process = new HashSet<Process>();
        }

        public int OrderDetailId { get; set; }
        public int? OrderId { get; set; }
        public string ProductId { get; set; }
        public int? Amount { get; set; }
        public double? Price { get; set; }
        public string Note { get; set; }

        public virtual Order Order { get; set; }
        public virtual Product Product { get; set; }
        public virtual ICollection<Process> Process { get; set; }
    }
}
