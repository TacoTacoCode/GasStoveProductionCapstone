using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System.Linq;
using System.Threading.Tasks;

namespace GSP_API.Business.Services
{
    public class SectionService
    {
        private readonly ISectionRepository _sectionRepository;        

        public SectionService(
            ISectionRepository sectionRepository)
        {
            _sectionRepository = sectionRepository;
        }

        public async Task<int> GetWorkerAmountBySectionId(int sectionId)
        {
            var data = await _sectionRepository.GetById(p => p.SectionId == sectionId);
            return (int)data.WorkerAmount;
        }

        public async Task<Section> GetAllSections()
        {
            return await _sectionRepository.GetById(p => p.SectionId != 0);
        }

        public async Task<Section> GetSectionById(int sectionId)
        {
            return await _sectionRepository.GetById(p => p.SectionId == sectionId);            
        }

        public async Task<string> AddSection(Section section)
        {
            return await _sectionRepository.Add(section);
        }

        public async Task<string> UpdateSection(Section newSection)
        {

            var data = await _sectionRepository.FindFirst(p => p.SectionId == newSection.SectionId);
            if (data != null)
            {                
                return await  _sectionRepository.Update(newSection);                
            }
            return null;
        }

        public async Task<string> DelSection(int sectionId)
        {
            var data = await _sectionRepository.GetById(p => p.SectionId == sectionId);
            if (data != null)
            {                
                //data.Status = false;
                return await _sectionRepository.Update(data);                
            }
            return null;
        }

        public async Task<string> CheckAssemble(int sectionId)
        {
            var data = await _sectionRepository.FindFirst(p => p.SectionId == sectionId);
            if (data != null)
            {
                return data.IsAssemble.ToString();
            }
            return null;
        }
    }
}
