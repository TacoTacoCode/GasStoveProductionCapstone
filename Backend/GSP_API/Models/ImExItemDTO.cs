using Newtonsoft.Json;
namespace GSP_API.Models
{

    [JsonObject(ItemNullValueHandling =NullValueHandling.Ignore)]
    public class ImExItemDTO
    {
        public string Id { get; set; }
        public string ItemType { get; set; }
        public string ItemId { get; set; }
    }
}
