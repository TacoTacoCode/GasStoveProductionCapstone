using GSP_API.Domain.Repositories.Models;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace GSP_API.Models.Request
{
    public class SectionRequest
    {
        public int SectionId { get; set; }
        public int? SectionLeadId { get; set; }
        public string ComponentId { get; set; }
        public int? WorkerAmount { get; set; }
        public bool? IsAssemble { get; set; }
        public string InstructionFilePath { get; set; }


        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public virtual Component Component { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public virtual Account SectionLead { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public virtual ICollection<Account> Account { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public virtual ICollection<Process> Process { get; set; }
    }
}
