using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class Section
    {
        public Section()
        {
            Account = new HashSet<Account>();
            Process = new HashSet<Process>();
        }

        public int SectionId { get; set; }
        public int? SectionLeadId { get; set; }
        public string ComponentId { get; set; }
        public int? WorkerAmount { get; set; }
        public bool? IsAssemble { get; set; }
        public string InstructionFilePath { get; set; }

        public virtual Component Component { get; set; }
        public virtual Account SectionLead { get; set; }
        public virtual ICollection<Account> Account { get; set; }
        public virtual ICollection<Process> Process { get; set; }
    }
}
