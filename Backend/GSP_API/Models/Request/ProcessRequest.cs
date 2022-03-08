using GSP_API.Domain.Repositories.Models;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace GSP_API.Models.Request
{
    public class ProcessRequest
    {
        public int ProcessId { get; set; }
        public int? OrderDetailId { get; set; }
        public int? NeededAmount { get; set; }
        public int? TotalAmount { get; set; }
        public int? FinishedAmount { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public DateTime? FinishedDate { get; set; }
        public DateTime? ExpectedFinishDate { get; set; }
        public string Status { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual OrderDetail OrderDetail { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual ICollection<ProcessDetail> ProcessDetails { get; set; }
    }
}
