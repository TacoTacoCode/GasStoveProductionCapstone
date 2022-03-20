using GSP_API.Domain.Repositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSP_API.Models.Request
{
    public class ProductCompoRequest
    {
        public ProductRequest product;
        public Dictionary<string, int> compos;
    }
}
