using GSP_API.Domain.Repositories.Models;
using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace GSP_API.Models.Request
{
    public class OrderRequest
    {
        public int OrderId { get; set; }
        public int? AccountId { get; set; }
        public double? TotalPrice { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string Status { get; set; }
        public string Note { get; set; }
        public bool? IsShorTerm { get; set; }
        public string CustomerName { get; set; }
        public string CustomerAdderss { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public virtual ICollection<OrderDetailRequest> OrderDetail { get; set; }
    }
}
