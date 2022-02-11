using System;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class Process
    {
        public int ProcessId { get; set; }
        public int? OrderDetailId { get; set; }
        public int? SectionId { get; set; }
        public int? ManufacturingId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? FinishedDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public int? Amount { get; set; }
        public int? FinishedAmount { get; set; }
        public string Status { get; set; }

        public virtual OrderDetail OrderDetail { get; set; }
        public virtual Section Section { get; set; }
    }
}
