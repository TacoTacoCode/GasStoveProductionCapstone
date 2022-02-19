using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class Types
    {
        public Types()
        {
            ImportExport = new HashSet<ImportExport>();
        }

        public string TypeId { get; set; }
        public string TypeName { get; set; }

        public virtual ICollection<ImportExport> ImportExport { get; set; }
    }
}
