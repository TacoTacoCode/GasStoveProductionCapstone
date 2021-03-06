using GSP_API.Domain.Repositories.Models;
using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace GSP_API.Models.Response
{
    public class AttendanceResponse
    {
        public int AttendanceId { get; set; }
        public DateTime? CheckDate { get; set; }
        public int? AccountId { get; set; }
        public string Note { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public virtual Account Account { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public virtual ICollection<AttendanceDetail> AttendanceDetail { get; set; }
    }
}
