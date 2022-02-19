﻿using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace GSP_API.Infrastructure.Repositories
{
    public class ComponentRepository: Repository<Component>, IComponentRepository 
    {
        public ComponentRepository(DbFactory dbFactory) : base(dbFactory)
        {
        }        
    }
}