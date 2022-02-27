using System;
using System.Collections.Generic;

#nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class Account
    {
        public Account()
        {
            AttendanceDetails = new HashSet<AttendanceDetail>();
            Orders = new HashSet<Order>();
            Sections = new HashSet<Section>();
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
        public virtual ICollection<AttendanceDetail> AttendanceDetails { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<Section> Sections { get; set; }
    }
}
