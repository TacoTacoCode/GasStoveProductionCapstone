using System;
using System.Collections.Generic;

#nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class AttendanceDetail
    {
        public int AttendanceDetailId { get; set; }
        public int? AttendanceId { get; set; }
        public DateTime? CheckDate { get; set; }
        public bool? IsPresented { get; set; }
        public string Note { get; set; }

        public virtual Attendance Attendance { get; set; }
    }
}
