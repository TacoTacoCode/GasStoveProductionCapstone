using GSP_API.Domain.Repositories.Models;
using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace GSP_API.Models.Request
{
    public class AttendanceRequest
    {
        public int AttendanceId { get; set; }
        public DateTime? CheckDate { get; set; }
        public int? AccountId { get; set; }
        public string Note { get; set; }
    }
}
