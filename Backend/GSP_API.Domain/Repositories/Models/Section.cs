using System;
using System.Collections.Generic;

#nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class Section
    {
        public Section()
        {
            Accounts = new HashSet<Account>();
            ProcessDetails = new HashSet<ProcessDetail>();
        }

        public int SectionId { get; set; }
        public int? SectionLeadId { get; set; }
        public string ComponentId { get; set; }
        public int? WorkerAmount { get; set; }
        public bool? IsAssemble { get; set; }
        public string Status { get; set; }

        public virtual Component Component { get; set; }
        public virtual Account SectionLead { get; set; }
        public virtual ICollection<Account> Accounts { get; set; }
        public virtual ICollection<ProcessDetail> ProcessDetails { get; set; }
    }
}
