using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSP_API.Models.Response
{
    [JsonObject(ItemNullValueHandling = NullValueHandling.Ignore)]
    public class CartResponse
    {
        public int CartId { get; set; }
        public int? AccountId { get; set; }
        public string CartInfo { get; set; }
        public double? TotalPrice { get; set; }
    }
}
