using GSP_API.Business.Extensions;
using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System.Collections.Generic;
using System.IO;
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

        public async Task<List<Material>> GetAllMaterials()
        {
            return await _materialRepository.GetAll(p => p.MaterialId != null);
        }

        public async Task<List<Material>> GetMaterialsByStatus(string status)
        {
            return await _materialRepository.GetAll(p => p.Status == status);
        }

        public async Task<Material> GetMaterialById(string materialId)
        {
            return await _materialRepository.GetById(p => p.MaterialId == materialId);
        }

        public async Task<string> AddMaterial(Material material, Stream fileStream, string fileName)
        {
            var imageUrl = fileName;
            if (fileStream != null)
            {
                try
                {
                    imageUrl = await FireBaseUtil.Upload(fileStream, fileName);
                }
                catch (System.Exception ex)
                {
                    return ex.Message;
                }
            }
            material.ImageUrl = imageUrl.Substring(imageUrl.IndexOf("%2F") + 3);
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

        public async Task<IDictionary<int, Material>> AddRangeMaterial(List<Material> materials)
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
