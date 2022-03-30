using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GSP_API.Models.Response
{
    [JsonObject(ItemNullValueHandling = NullValueHandling.Ignore)]
    public class CompoMateResponse
    {
        public int Id { get; set; }
        public string ComponentId { get; set; }
        public string MaterialId { get; set; }
        public int? Amount { get; set; }

    }
}
