using GSP_API.Domain.Repositories.Models;
using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace GSP_API.Models.Request
{
    public class ProductRequest
    {
        public string ProductId { get; set; }
        public string ProductName { get; set; }
        public int? Amount { get; set; }
        public double? Price { get; set; }
        public string ImageUrl { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }

 
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public virtual ICollection<ProductComponentRequest> ProductComponents { get; set; }
    }
}
