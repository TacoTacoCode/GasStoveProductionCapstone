using GSP_API.Domain.Repositories.Models;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace GSP_API.Models.Request
{
   [JsonObject(ItemNullValueHandling =NullValueHandling.Ignore)]
    public class MaterialRequest
    {
        public string MaterialId { get; set; }
        public string MaterialName { get; set; }
        public int? Amount { get; set; }
        public string Unit { get; set; }
        public string ImageUrl { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }
        public string ItemId { get; set; }


        public virtual ICollection<ComponentMaterial> ComponentMaterial { get; set; }
    }
}
