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
        private readonly IAccountRepository _accountRepository;

        public SectionService(
            ISectionRepository sectionRepository, IComponentRepository compoRepository, IAccountRepository accountRepository)
        {
            _sectionRepository = sectionRepository;
            _compoRepository = compoRepository;
            _accountRepository = accountRepository;
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

        public async Task<Component> GetCompoBySectionId(int sectionId)
        {
            var data = await _sectionRepository.GetById(p => p.SectionId == sectionId);
            if (data == null)
            {
                return null;
            }
            if (data.ComponentId == null)
            {
                return null;
            }
            var compo = await _compoRepository.FindFirst(e => e.ComponentId == data.ComponentId);
            return compo;
        }

        public async Task<List<Section>> GetAllSections()
        {
            return await _sectionRepository.GetAll(p => p.SectionId != 0);
        }

        public async Task<Section> GetSectionById(int sectionId)
        {
            return await _sectionRepository.GetById(p => p.SectionId == sectionId);            
        }

        public async Task<string> GetSectionLeaderById(int sectionId)
        {
            var section = await _sectionRepository.GetById(p => p.SectionId == sectionId);
            return _accountRepository.GetById(p => p.AccountId == section.SectionLeadId).Result.Name;
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
            var accountLeadId = section.SectionLeadId;
            if (accountLeadId != null)
            {
                section.WorkerAmount = 1;
                var sec = await _sectionRepository.Add2(section);
                var account = await _accountRepository.FindFirst(a => a.AccountId == accountLeadId);
                account.SectionId = sec.SectionId;
                await _accountRepository.Update(account);

            }
            return "true";
        }

        public async Task<string> UpdateSection(Section newSection)
        {

            var data = await _sectionRepository.FindFirst(p => p.SectionId == newSection.SectionId);
            if (data != null)
            {
                if (data.SectionLeadId != newSection.SectionLeadId)
                {
                    var account = await _accountRepository.FindFirst(a => a.AccountId == newSection.SectionLeadId);
                    account.SectionId = newSection.SectionId;
                    await _accountRepository.Update(account);
                }
                return await  _sectionRepository.Update(newSection);                
            }
            return null;
        }

        public async Task<string> DelSection(int sectionId)
        {
            var data = await _sectionRepository.GetById(p => p.SectionId == sectionId);
            if (data != null)
            {                
                data.Status = "Inactive";
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
