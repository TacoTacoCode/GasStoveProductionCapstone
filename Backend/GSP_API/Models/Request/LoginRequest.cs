using GSP_API.Domain.Repositories.Models;
using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace GSP_API.Models.Request
{
    public class LoginRequest
    {
        public string Phone { get; set; }
        public string Password { get; set; }
    }
}
