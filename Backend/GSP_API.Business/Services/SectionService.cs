using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSP_API.Business.Services
{
    public class SectionService
    {
        private readonly ISectionRepository _sectionRepository;        
        private readonly IComponentRepository _compoRepository;

        public SectionService(
            ISectionRepository sectionRepository, IComponentRepository compoRepository)
        {
            _sectionRepository = sectionRepository;
            _compoRepository = compoRepository;
        }

        public async Task<int> GetWorkerAmountBySectionId(int sectionId)
        {
            var data = await _sectionRepository.GetById(p => p.SectionId == sectionId);
            return (int)data.WorkerAmount;
        }

        public async Task<string> GetCompoIdBySectionId(int sectionId)
        {
            var data = await _sectionRepository.GetById(p => p.SectionId == sectionId);
            if(data == null)
            {
                return "Cannot found section";
            }
            if(data.ComponentId == null)
            {
                return "Assemble section!!!";
            }
            return data.ComponentId;
        }

        public async Task<string> GetCompoNameBySectionId(int sectionId)
        {
            var data = await _sectionRepository.GetById(p => p.SectionId == sectionId);
            if (data == null)
            {
                return "Cannot found section";
            }
            if (data.ComponentId == null)
            {
                return "Assemble section!!!";
            }
            var compo = await _compoRepository.FindFirst(e => e.ComponentId == data.ComponentId);
            return compo.ComponentName;
        }

        public async Task<List<Section>> GetAllSections()
        {
            return await _sectionRepository.GetAll(p => p.SectionId != 0);
        }

        public async Task<Section> GetSectionById(int sectionId)
        {
            return await _sectionRepository.GetById(p => p.SectionId == sectionId);            
        }

        public async Task<Section> GetSectionByType(bool isAssemble)
        {
            return await _sectionRepository.GetById(p => p.IsAssemble == isAssemble);
        }

        public async Task<Section> GetSectionByComponentId(string CompoId)
        {
            return await _sectionRepository.GetById(p => p.ComponentId == CompoId);
        }

        public async Task<Section> GetSectionBySectionLeadId(int sectionManagerId)
        {
            return await _sectionRepository.GetSectionAndWorkersByLead(sectionManagerId);
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
