using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSP_API.Models.Request
{
    public class CompoMateRequest
    {
        public int Id { get; set; }
        public string ComponentId { get; set; }
        public string MaterialId { get; set; }
        public int? Amount { get; set; }
    }
}
