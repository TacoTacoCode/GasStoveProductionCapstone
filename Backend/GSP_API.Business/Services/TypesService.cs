using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

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

        public async Task<Types> GetTypeById(string typeId)
        {
            return await _typesRepository.GetById(p => p.TypeId == typeId);
        }
      
        public async Task<string> AddType(Types types)
        {
            return await _typesRepository.Add(types);
        }

        public async Task<string> UpdateAccount(string typeId, Types newTypes)
        {
            var data = await _typesRepository.FindById(p => p.TypeId == typeId);
            if (data != null)
            {
                newTypes.TypeId = data.TypeId;
                await _typesRepository.Update(newTypes);
            }
            return null;
        }
    }
}
