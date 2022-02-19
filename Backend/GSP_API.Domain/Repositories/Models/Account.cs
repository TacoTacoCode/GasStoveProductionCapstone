using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class Account
    {
        public Account()
        {
            AttendanceDetail = new HashSet<AttendanceDetail>();
            ImportExport = new HashSet<ImportExport>();
            Order = new HashSet<Order>();
            SectionNavigation = new HashSet<Section>();
        }

        public int AccountId { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public bool? Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string AvatarUrl { get; set; }
        public string RoleId { get; set; }
        public int? SectionId { get; set; }
        public bool? IsActive { get; set; }

        public virtual Role Role { get; set; }
        public virtual Section Section { get; set; }
        public virtual ICollection<AttendanceDetail> AttendanceDetail { get; set; }
        public virtual ICollection<ImportExport> ImportExport { get; set; }
        public virtual ICollection<Order> Order { get; set; }
        public virtual ICollection<Section> SectionNavigation { get; set; }
    }
}
