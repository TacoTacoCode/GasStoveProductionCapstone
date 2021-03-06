using GSP_API.Domain.Repositories.Models;
using GSP_API.Domain.Interfaces;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;
using GSP_API.Business.Extensions;

namespace GSP_API.Business.Services
{
    public class ComponentService
    {
        private readonly IComponentRepository _componentRepository;
        private readonly IComponentMaterialRepository _componentMateRepository;
        private readonly ImExItemService _imExItemService;

        public ComponentService(
            IComponentRepository componentRepository, IComponentMaterialRepository componentMateRepository, ImExItemService imExItemService)
        {
            _componentRepository = componentRepository;
            _componentMateRepository = componentMateRepository;
            _imExItemService = imExItemService;
        }

        public async Task<List<Component>> GetCompoNoSection()
        {
            return await _componentRepository.GetComponentsNoSection();
        }

        public async Task<List<Component>> GetAllComponents()
        {
            return await _componentRepository.GetAll(p => p.ComponentId != null);
        }

        public async Task<Component> GetComponentById(string componentId)
        {
            return await _componentRepository.GetById(p => p.ComponentId == componentId);
        }

        public async Task<List<Component>> GetComponentsByStatus(string status)
        {
            return await _componentRepository.GetAll(p => p.Status == status);
        }

        public async Task<string> AddComponent(Component component, Stream fileStream, string fileName, ImExItem imExItem = null)
        {
            var imageUrl = fileName;
            if (fileStream != null)
            {
                try
                {
                    imageUrl = await FireBaseUtil.Upload(fileStream, fileName);
                    imageUrl = imageUrl.Substring(imageUrl.IndexOf("%2F") + 3);
                }
                catch (System.Exception ex)
                {
                    return ex.Message;
                }
            }
            component.ImageUrl = imageUrl;
            if (imExItem != null)
            {
                component.ItemId = component.ComponentId + "C";
                await _imExItemService.Add(imExItem);
            }
            return await _componentRepository.Add(component);
        }

        public async Task<string> UpdateComponent(Component newComponent, Stream fileStream, string fileName, bool fromImEx = false)
        {
            if (fileStream != null)
            {
                try
                {
                    var imageUrl = await FireBaseUtil.Upload(fileStream, fileName);
                    newComponent.ImageUrl = imageUrl.Substring(imageUrl.IndexOf("%2F") + 3);
                }
                catch (System.Exception ex)
                {
                    return ex.Message;
                }
            }
            else
            {
                newComponent.ImageUrl = fileName;
            }
            if (!fromImEx)
            {
                var data = await _componentRepository.FindFirst(p => p.ComponentId == newComponent.ComponentId);
                if (data != null)
                {
                    var compoMates = await _componentMateRepository.GetAll(c => c.ComponentId == data.ComponentId);
                    await _componentMateRepository.RemoveRange(compoMates);
                    return await _componentRepository.Update(newComponent);
                }
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
