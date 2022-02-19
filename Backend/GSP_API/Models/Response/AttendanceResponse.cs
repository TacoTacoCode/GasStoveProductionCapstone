using GSP_API.Domain.Repositories.Models;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace GSP_API.Models.Response
{
    public class AttendanceResponse
    {
        public int AttendanceId { get; set; }
        public DateTime? CheckDate { get; set; }
        public int? PresentedAmount { get; set; }
        public string Note { get; set; }


        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual ICollection<AttendanceDetail> AttendanceDetail { get; set; }
    }
}
