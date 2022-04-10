using GSP_API.Domain.Repositories.Models;
using Newtonsoft.Json;
using System;

namespace GSP_API.Models.Response
{
    public class AttendanceDetailResponse
    {
        public int AttendanceDetailId { get; set; }
        public int? AttendanceId { get; set; }
        public DateTime? CheckDate { get; set; }
        public bool? IsPresented { get; set; }
        public string Note { get; set; }



        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public virtual Attendance Attendance { get; set; }
    }
}
