using GSP_API.Domain.Repositories.Models;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace GSP_API.Models.Request
{
    public class OrderDetailRequest
    {
        public int OrderDetailId { get; set; }
        public int? OrderId { get; set; }
        public string ProductId { get; set; }
        public int? Amount { get; set; }
        public double? Price { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string Note { get; set; }        


        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual Order Order { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual Product Product { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual ICollection<Process> Process { get; set; }
    }
}
