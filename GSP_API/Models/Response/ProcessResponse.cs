using GSP_API.Domain.Repositories.Models;
using System;
using System.Text.Json.Serialization;

namespace GSP_API.Models.Response
{
    public class ProcessResponse
    {
        public int ProcessId { get; set; }
        public int? OrderDetailId { get; set; }
        public int? SectionId { get; set; }
        public int? ManufacturingId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? FinishedDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public int? Amount { get; set; }
        public int? FinishedAmount { get; set; }
        public string Status { get; set; }


        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual OrderDetail OrderDetail { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual Section Section { get; set; }
    }
}
