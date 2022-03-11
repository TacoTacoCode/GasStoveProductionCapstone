using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSP_API.Business.Services
{
    public class MaterialService
    {
        private readonly IMaterialRepository _materialRepository;

        public MaterialService(
            IMaterialRepository materialRepository)
        {
            _materialRepository = materialRepository;
        }

        public MaterialService()
        {
        }

        public async Task<List<Material>> GetAllMaterials()
        {
            return await _materialRepository.GetAll(p => p.Status == "Active");
        }

        public async Task<Material> GetMaterialById(string materialId)
        {
            return await _materialRepository.GetById(p => p.MaterialId == materialId);
        }

        public async Task<string> AddMaterial(Material material)
        {
            return await _materialRepository.Add(material);
        }

        public async Task<string> UpdateMaterial(Material newMaterial)
        {
            var data = await _materialRepository.FindFirst(p => p.MaterialId == newMaterial.MaterialId);
            if (data != null)
            {
                return await _materialRepository.Update(newMaterial);
            }
            return null;
        }

        public async Task<string> DelMaterial(string materialId)
        {
            var data = await _materialRepository.GetById(p => p.MaterialId == materialId);
            if (data != null)
            {
                data.Status = "Inactive";
                return await _materialRepository.Update(data);
            }
            return null;
        }

        public async Task<Material> FindMaterialById(string materialId)
        {
            return await _materialRepository.FindFirst(p => p.MaterialId == materialId);
        }

        public async Task<IDictionary<int, Material>> AddRange(List<Material> materials)
        {
            var returnDic = new Dictionary<int, Material>();
            var addList = new List<Material>();
            foreach (var pro in materials)
            {
                var tmp = await FindMaterialById(pro.MaterialId);
                if (tmp != null)
                {
                    returnDic.Add(materials.IndexOf(pro) + 1, pro);
                }
                else
                {
                    addList.Add(pro);
                }
            }
            await _materialRepository.AddRange(addList);
            return returnDic;
        }

    }
}
