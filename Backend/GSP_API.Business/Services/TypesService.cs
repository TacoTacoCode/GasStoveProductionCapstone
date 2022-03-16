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
        private readonly IItemTypesRepository _itemTypesRepository;

        public TypesService(
            IItemTypesRepository itemTypesRepository)
        {
            _itemTypesRepository = itemTypesRepository;

        }

        public async Task<ItemType> GetTypeById(string typeId)
        {
            return await _itemTypesRepository.GetById(p => p.TypeId == typeId);
        }

        public async Task<string> AddType(ItemType ItemType)
        {
            return await _itemTypesRepository.Add(ItemType);
        }

        public async Task<string> UpdateAccount(ItemType newTypes)
        {
            var data = await _itemTypesRepository.FindFirst(p => p.TypeId == newTypes.TypeId);
            if (data != null)
            {
                return await _itemTypesRepository.Update(newTypes);
            }
            return null;
        }
    }
}
