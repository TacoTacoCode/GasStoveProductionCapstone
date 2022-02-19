using GSP_API.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSP_API.Business.Services
{
    public class TypesService
    {
        private readonly ITypesRepository _typesRepository;
        
        public TypesService(
            ITypesRepository typesRepository)
        {
            _typesRepository = typesRepository;           

        }
    }
}
