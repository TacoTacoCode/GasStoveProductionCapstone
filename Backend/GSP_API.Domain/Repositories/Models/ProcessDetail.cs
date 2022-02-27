using System;
using System.Collections.Generic;

#nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class ProcessDetail
    {
        public int ProcessDetailId { get; set; }
        public int? ProcessId { get; set; }
        public int? SectionId { get; set; }
        public int? TotalAmount { get; set; }
        public int? FinishedAmount { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public DateTime? FinishedDate { get; set; }
        public string Status { get; set; }

        public virtual Process Process { get; set; }
        public virtual Section Section { get; set; }
    }
}
