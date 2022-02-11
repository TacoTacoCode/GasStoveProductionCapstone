using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class Attendance
    {
        public Attendance()
        {
            AttendanceDetail = new HashSet<AttendanceDetail>();
        }

        public int AttendanceId { get; set; }
        public DateTime? CheckDate { get; set; }
        public int? PresentedAmount { get; set; }
        public string Note { get; set; }

        public virtual ICollection<AttendanceDetail> AttendanceDetail { get; set; }
    }
}
