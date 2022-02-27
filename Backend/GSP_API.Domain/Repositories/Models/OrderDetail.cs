using System;
using System.Collections.Generic;

#nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class OrderDetail
    {
        public OrderDetail()
        {
            Processes = new HashSet<Process>();
        }

        public int OrderDetailId { get; set; }
        public int? OrderId { get; set; }
        public string ProductId { get; set; }
        public int? Amount { get; set; }
        public double? Price { get; set; }
        public string Note { get; set; }

        public virtual Order Order { get; set; }
        public virtual Product Product { get; set; }
        public virtual ICollection<Process> Processes { get; set; }
    }
}
