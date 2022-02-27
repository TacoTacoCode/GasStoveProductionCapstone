using GSP_API.Domain.Repositories.Models;
using GSP_API.Domain.Interfaces;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace GSP_API.Business.Services
{
    public class ImportExportService
    {
        private readonly IImportExportRepository _importExportRepository;

        public ImportExportService(
            IImportExportRepository importExportRepository)
        {
            _importExportRepository = importExportRepository;
        }

        public async Task<List<ImportExport>> GetImExBySection(int sectionId)
        {
            return await _importExportRepository.GetAll(p => p.SectionId == sectionId);
        }

        public async Task<ImportExport> GetImExtById(int imExId)
        {
            return await _importExportRepository.GetById(p => p.ImportExportId == imExId);
        }

        public async Task<string> AddImEx(ImportExport imEx)
        {
            return await _importExportRepository.Add(imEx);
        }

        public async Task<string> UpdateImEx(int imExId, ImportExport newImEx)
        {

            var data = await _importExportRepository.FindById(p => p.ImportExportId == imExId);
            if (data != null)
            {
                newImEx.ImportExportId = data.ImportExportId;
                await _importExportRepository.Update(newImEx);
            }
            return null;
        }

        public async Task<string> DelImEx(int imExId)
        {
            var data = await _importExportRepository.GetById(p => p.ImportExportId == imExId);
            if (data != null)
            {
                data.Status = "Delete";
                await _importExportRepository.Update(data);
            }
            return null;
        }
    }
}
