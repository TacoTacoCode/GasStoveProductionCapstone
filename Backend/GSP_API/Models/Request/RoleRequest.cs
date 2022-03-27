using GSP_API.Domain.Repositories.Models;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace GSP_API.Models.Request
{
    public class RoleRequest
    {
        public string RoleId { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }


        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public virtual ICollection<Account> Account { get; set; }
    }
}
