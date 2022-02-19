using GSP_API.Domain.Repositories.Models;
using GSP_API.Domain.Interfaces;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GSP_API.Business.Services
{
    public class ComponentService
    {
        private readonly IComponentRepository _componentRepository;

        public ComponentService(
            IComponentRepository componentRepository)
        {
            _componentRepository = componentRepository;
        }

        public async Task<List<Component>> GetAllComponents()
        {
            return await _componentRepository.GetAll(p => p.Status == "1");
        }

        public async Task<Component> GetComponentById(string componentId)
        {
            return await _componentRepository.GetById(p => p.ComponentId == componentId);
        }

        public async Task<string> AddComponent(Component component)
        {
            return await _componentRepository.Add(component);
        }

        public async Task<string> UpdateComponent(string componentId, Component newComponent)
        {

            var data = await _componentRepository.FindById(p => p.ComponentId == componentId);
            if (data != null)
            {
                newComponent.ComponentId = data.ComponentId;
                await _componentRepository.Update(newComponent);                
            }
            return null;
        }

        public async Task<string> DelComponent(string componentId)
        {
            var data = await _componentRepository.GetById(p => p.ComponentId == componentId);
            if (data != null)
            {
                data.Status = "Inactive";
                await _componentRepository.Update(data);                
            }
            return null;
        }
    }
}
