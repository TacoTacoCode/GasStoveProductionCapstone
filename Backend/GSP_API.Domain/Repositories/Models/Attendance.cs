using System;
using System.Collections.Generic;

#nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class Attendance
    {
        public Attendance()
        {
            AttendanceDetails = new HashSet<AttendanceDetail>();
        }

        public int AttendanceId { get; set; }
        public DateTime? CheckDate { get; set; }
        public int? PresentedAmount { get; set; }
        public string Note { get; set; }

        public virtual ICollection<AttendanceDetail> AttendanceDetails { get; set; }
    }
}
