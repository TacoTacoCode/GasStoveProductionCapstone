using GSP_API.Domain.Repositories.Models;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace GSP_API.Models.Request
{
    public class ProcessDetailRequest
    {
        public int ProcessDetailId { get; set; }
        public int? ProcessId { get; set; }
        public int? SectionId { get; set; }
        public int? TotalAmount { get; set; }
        public int? FinishedAmount { get; set; }
        public int? AverageAmount { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public DateTime? FinishedDate { get; set; }
        public string Status { get; set; }
        public DateTime? ExpectedFinishDate { get; set; }


        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual Process Process { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual Section Section { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual ICollection<ImportExportDetail> ImportExportDetails { get; set; }
    }
}
