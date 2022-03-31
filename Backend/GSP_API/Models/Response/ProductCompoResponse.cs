using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GSP_API.Models.Response
{
    [JsonObject(ItemNullValueHandling =NullValueHandling.Ignore)]
    public class ProductCompoResponse
    {
        public int Id { get; set; }
        public string ProductId { get; set; }
        public string ComponentId { get; set; }
        public int? Amount { get; set; }

    }
}
