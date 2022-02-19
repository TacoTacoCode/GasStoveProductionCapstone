using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System.Linq;

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

        public IQueryable<Role> AddCompoMate()
        {
            //List<Role> list = _componentMaterialRepository
            return null;
        }
    }
}
