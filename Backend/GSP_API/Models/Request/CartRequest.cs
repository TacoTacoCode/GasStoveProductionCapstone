using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSP_API.Models.Request
{
    [JsonObject(ItemNullValueHandling = NullValueHandling.Ignore)]
    public class CartRequest
    {
        public int CartId { get; set; }
        public int? AccountId { get; set; }
        public string CartInfo { get; set; }
        public double? TotalPrice { get; set; }
    }
}
