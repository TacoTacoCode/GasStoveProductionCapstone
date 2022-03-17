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
            return await _componentRepository.GetAll(p => p.Status == "Active");
        }

        public async Task<Component> GetComponentById(string componentId)
        {
            return await _componentRepository.GetById(p => p.ComponentId == componentId);
        }

        public async Task<string> AddComponent(Component component)
        {
            return await _componentRepository.Add(component);
        }

        public async Task<string> UpdateComponent(Component newComponent)
        {

            var data = await _componentRepository.FindFirst(p => p.ComponentId == newComponent.ComponentId);
            if (data != null)
            {
                return await _componentRepository.Update(newComponent);
            }
            return null;
        }

        public async Task<string> DelComponent(string componentId)
        {
            var data = await _componentRepository.GetById(p => p.ComponentId == componentId);
            if (data != null)
            {
                data.Status = "Inactive";
                return await _componentRepository.Update(data);
            }
            return null;
        }
        public async Task<Component> FindcomponentById(string componentId)
        {
            return await _componentRepository.FindFirst(p => p.ComponentId == componentId);
        }
        public async Task<IDictionary<int, Component>> AddRangeComponent(List<Component> components)
        {
            var returnDic = new Dictionary<int, Component>();
            var addList = new List<Component>();
            foreach (var pro in components)
            {
                var tmp = await FindcomponentById(pro.ComponentId);
                if (tmp != null)
                {
                    returnDic.Add(components.IndexOf(pro) + 1, pro);
                }
                else
                {
                    addList.Add(pro);
                }
            }
            await _componentRepository.AddRange(addList);
            return returnDic;
        }
    }
}
