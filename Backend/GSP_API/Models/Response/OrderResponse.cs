using GSP_API.Domain.Repositories.Models;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace GSP_API.Models.Response
{
    public class OrderResponse
    {
        public int OrderId { get; set; }
        public int? AccountId { get; set; }
        public double? TotalPrice { get; set; }
        public DateTime? Deadline { get; set; }
        public string Status { get; set; }
        public string Note { get; set; }


        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual Account Account { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual ICollection<OrderDetail> OrderDetail { get; set; }
    }
}
