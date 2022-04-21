using GSP_API.Domain.Repositories.Models;
using GSP_API.Domain.Interfaces;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;

namespace GSP_API.Business.Services
{
    public class ImportExportService
    {
        private readonly IImportExportRepository _importExportRepository;
        private readonly SectionService _sectionService;
        private readonly ProcessService _processService;
        private readonly ProcessDetailService _processDetailService;
        private readonly ProductService _productService;
        private readonly ComponentService _componentService;
        private readonly MaterialService _materialService;
        private readonly ImportExportDetailService _importExportDetailService;


        public ImportExportService(
            IImportExportRepository importExportRepository,
            SectionService sectionService,
            ProcessService processService,
            ProcessDetailService processDetailService,
            ProductService productService,
            ComponentService componentService,
            MaterialService materialService,
            ImportExportDetailService importExportDetailService
            )

        {
            _importExportRepository = importExportRepository;
            _sectionService = sectionService;
            _processService = processService;
            _processDetailService = processDetailService;
            _productService = productService;
            _componentService = componentService;
            _materialService = materialService;
            _importExportDetailService = importExportDetailService;
        }

        public async Task<List<ImportExport>> GetExBySection(int sectionId)
        {
            return await _importExportRepository.GetAll(p => p.SectionId == sectionId && p.IsImport == false);
        }

        public async Task<ImportExport> GetImExtById(int imExId)
        {
            return await _importExportRepository.GetById(p => p.ImportExportId == imExId);
        }

        public async Task<string> AddImEx(ImportExport imEx)    
        {
            imEx.Status = "New";
            var error = new List<string>();
            if ((bool)imEx.IsImport)
            {
                imEx.Status = "Done";
                foreach (var imExDetail in imEx.ImportExportDetails)
                {
                    var result = await _importExportDetailService.ImportItem(imExDetail, imEx.ItemType);
                    if (result.Contains("Error"))
                    {
                        error.Add(result);
                    }

                }
            }
            if (error.Count > 0)
            {
                return "Error at import";
            }
            var data = await _importExportRepository.Add(imEx);
            if (data.Contains("error"))
            {
                error.Add(data);
            }
            if (error.Count > 0)
            {
                return "Error at importExport";
            }
            return data;
        }

        public async Task<List<ImportExport>> GetExByType(string type)
        {
            var data = await _importExportRepository.GetAll(p => p.ItemType.Equals(type) && p.IsImport == false);
            return data;
        }

        public async Task<string> DelImEx(int imExId)
        {
            var data = await _importExportRepository.GetById(p => p.ImportExportId == imExId);
            if (data != null)
            {
                data.Status = "Decline";
                await _importExportRepository.Update(data);
            }
            return null;
        }

        public async Task<string> UpdateImEx(ImportExport imEx)
        {
            var data = await _importExportRepository.GetById(p => p.ImportExportId == imEx.ImportExportId);
            if (data != null)
            {
                await _importExportRepository.Update(data);
            }
            return null;
        }

        public async Task<List<ImportExport>> GetAllActive()
        {
            return await _importExportRepository.GetAll(p => p.Status != "Finished");
        }


    }
}
