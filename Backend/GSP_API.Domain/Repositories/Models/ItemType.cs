using System;
using System.Collections.Generic;

#nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class ItemType
    {
        public ItemType()
        {
            ImportExports = new HashSet<ImportExport>();
        }

        public string TypeId { get; set; }
        public string TypeName { get; set; }

        public virtual ICollection<ImportExport> ImportExports { get; set; }
    }
}
