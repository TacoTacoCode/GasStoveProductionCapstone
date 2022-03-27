using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using GSP_API.Domain.Repositories.Models;

namespace GSP_API.Models.Request
{
    public class DistributeProcessRequest
    {
        public Process Process { get; set; }
        public int[] ProcessAmmounts { get; set; }

    }
}
