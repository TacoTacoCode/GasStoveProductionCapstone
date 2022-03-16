using System;
using System.Collections.Generic;

#nullable disable

namespace GSP_API.Domain.Repositories.Models
{
    public partial class RefreshToken
    {
        public int Id { get; set; }
        public int? AccountId { get; set; }
        public string Token { get; set; }
        public bool? IsUsed { get; set; }
        public bool? IsRevorked { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ExpiryDate { get; set; }

        public virtual Account Account { get; set; }
    }
}
