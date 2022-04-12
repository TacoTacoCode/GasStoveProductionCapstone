using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
namespace GSP_API.Models.Request
{
    public class ProductComponentRequest
    {
        public int Id { get; set; }
        public string ProductId { get; set; }
        public string ComponentId { get; set; }
        public int? Amount { get; set; }
    }
}
