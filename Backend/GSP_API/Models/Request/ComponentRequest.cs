﻿using GSP_API.Domain.Repositories.Models;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace GSP_API.Models.Request
{
    public class ComponentRequest
    {
        public string ComponentId { get; set; }
        public string ComponentName { get; set; }
        public int? Amount { get; set; }
        public string ImageUrl { get; set; }
        public string Status { get; set; }
        public string Substance { get; set; }
        public string Size { get; set; }
        public string Color { get; set; }
        public double? Weight { get; set; }
        public string Description { get; set; }


        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual ICollection<ComponentMaterial> ComponentMaterial { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual ICollection<ImportExportDetail> ImportExportDetail { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual ICollection<ProductComponent> ProductComponent { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual ICollection<Section> Section { get; set; }
    }
}
