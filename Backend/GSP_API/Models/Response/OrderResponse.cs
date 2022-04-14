﻿using GSP_API.Domain.Repositories.Models;
using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace GSP_API.Models.Response
{
    public class OrderResponse
    {
        public int OrderId { get; set; }
        public int? AccountId { get; set; }
        public double? TotalPrice { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string Status { get; set; }
        public string Note { get; set; }
        public bool? IsShorTerm { get; set; }
        public string CustomerName { get; set; }
        public string CustomerAddress { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public virtual Account Account { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public virtual ICollection<OrderDetail> OrderDetail { get; set; }
    }
}
