﻿using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System.Linq;
using System.Threading.Tasks;

namespace GSP_API.Business.Services
{
    public class ComponentMaterialService
    {
        private readonly IComponentMaterialRepository _componentMaterialRepository;

        public ComponentMaterialService(
            IComponentMaterialRepository componentMaterialRepository)
        {
            _componentMaterialRepository = componentMaterialRepository;
        }

        public async Task<ComponentMaterial> GetCompoMateById(int compoMateId)
        {
            return await _componentMaterialRepository.GetById(p => p.Id == compoMateId);
        }

        public async Task<string> AddCompoMate(ComponentMaterial compoMate)
        {
            return await _componentMaterialRepository.Add(compoMate); ;
        }

        public async Task<string> UpdateCompoMate(ComponentMaterial newCompoMate)
        {
            var data = await _componentMaterialRepository.FindFirst(p => p.Id == newCompoMate.Id);
            if (data != null)
            {
                return await _componentMaterialRepository.Update(newCompoMate);
            }
            return null;
        }
    }
}
