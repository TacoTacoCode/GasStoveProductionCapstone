using GSP_API.Domain.Repositories.Models;
using Newtonsoft.Json;
using System;

namespace GSP_API.Models.Request
{
    public class AttendanceDetailRequest
    {
        public int AttendanceDetailId { get; set; }
        public int? AttendanceId { get; set; }
        public DateTime? CheckDate { get; set; }
        public bool? IsPresented { get; set; }
        public string Note { get; set; }

    }
}
