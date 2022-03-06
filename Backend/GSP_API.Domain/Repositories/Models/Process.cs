using System;
using System.Collections.Generic;

#nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class Process
    {
        public Process()
        {
            ProcessDetails = new HashSet<ProcessDetail>();
        }

        public int ProcessId { get; set; }
        public int? OrderDetailId { get; set; }
        public int? NeededAmount { get; set; }
        public int? TotalAmount { get; set; }
        public int? FinishedAmount { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public DateTime? FinishedDate { get; set; }
        public DateTime? ExpectedFinishDate { get; set; }
        public string Status { get; set; }

        public virtual OrderDetail OrderDetail { get; set; }
        public virtual ICollection<ProcessDetail> ProcessDetails { get; set; }
    }
}
