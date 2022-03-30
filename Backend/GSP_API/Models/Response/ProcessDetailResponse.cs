using GSP_API.Domain.Repositories.Models;
using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace GSP_API.Models.Response
{
    public class ProcessDetailResponse
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
        public DateTime? FirstExportDate { get; set; }



        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public virtual Process Process { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public virtual Section Section { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public virtual ICollection<ImportExportDetail> ImportExportDetails { get; set; }
    }
}
