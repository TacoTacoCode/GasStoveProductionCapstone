using GSP_API.Domain.Repositories.Models;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace GSP_API.Models.Response
{
    public class OrderDetailResponse
    {
        public int OrderDetailId { get; set; }
        public int? OrderId { get; set; }
        public string ProductId { get; set; }
        public int? Amount { get; set; }
        public double? Price { get; set; }
        public string Note { get; set; }


        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public virtual Order Order { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public virtual Product Product { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public virtual ICollection<Process> Process { get; set; }
    }
}
