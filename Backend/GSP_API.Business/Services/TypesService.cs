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

        public async Task<ItemType> GetTypeById(string typeId)
        {
            return await _typesRepository.GetById(p => p.TypeId == typeId);
        }

        public async Task<string> AddType(ItemType ItemType)
        {
            return await _typesRepository.Add(ItemType);
        }

        public async Task<string> UpdateAccount(ItemType newTypes)
        {
            var data = await _typesRepository.FindFirst(p => p.TypeId == newTypes.TypeId);
            if (data != null)
            {
                return await _typesRepository.Update(newTypes);
            }
            return null;
        }
    }
}
