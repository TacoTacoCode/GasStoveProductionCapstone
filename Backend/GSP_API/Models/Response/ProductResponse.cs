using GSP_API.Domain.Repositories.Models;
using System;
using System.Text.Json.Serialization;

namespace GSP_API.Models.Response
{
    public class ProductResponse
    {
        public string ProcessId { get; set; }
        public string OrderDetailId { get; set; }
        public string SectionId { get; set; }
        public string ManufacturingId { get; set; }
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
