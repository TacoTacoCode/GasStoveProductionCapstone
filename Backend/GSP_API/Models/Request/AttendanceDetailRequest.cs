using GSP_API.Domain.Repositories.Models;
using Newtonsoft.Json;

namespace GSP_API.Models.Request
{
    public class AttendanceDetailRequest
    {
        public int AttendanceDetailId { get; set; }
        public int? AttendanceId { get; set; }
        public int? AccountId { get; set; }
        public bool? IsPresented { get; set; }
        public string Note { get; set; }


        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public virtual Account Account { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public virtual Attendance Attendance { get; set; }
    }
}
