using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GSP_API.Business.Services
{
    public class ImportExportDetailService
    {
        private readonly IImportExportDetailRepository _importExportDetailRepository;
        private readonly ProcessDetailService _processDetailService;
        private readonly ComponentService _componentService;
        private readonly MaterialService _materialService;
        public ImportExportDetailService(
            IImportExportDetailRepository importExportDetailRepository, ProcessDetailService processDetailService, ComponentService componentService, MaterialService materialService)
        {
            _importExportDetailRepository = importExportDetailRepository;
            _processDetailService = processDetailService;
            _componentService = componentService;
            _materialService = materialService;
        }

        public async Task<List<ImportExportDetail>> GetImExDetailByImEx(int imExId)
        {
            return await _importExportDetailRepository.GetAll(p => p.ImportExportId == imExId);
        }

        public async Task<ImportExportDetail> GetImExDetailById(int imExDetailId)
        {
            return await _importExportDetailRepository.GetById(p => p.ImportExportDetailId == imExDetailId);
        }

        public async Task<string> AddImExDetail(ImportExportDetail imExDetail)
        {
            return await _importExportDetailRepository.Add(imExDetail);
        }

        public async Task<string> UpdateImExDetail(ImportExportDetail newImExDetail)
        {
            var data = await _importExportDetailRepository.FindFirst(p => p.ImportExportDetailId == newImExDetail.ImportExportDetailId);
            if (data != null)
            {
                return await _importExportDetailRepository.Update(newImExDetail);
            }
            return null;
        }

        public async Task<string> DelImExDetail(int imExDetailId)
        {
            var data = await _importExportDetailRepository.GetById(p => p.ImportExportDetailId == imExDetailId);
            if (data != null)
            {
                //data.Status = "Inactive";
                return await _importExportDetailRepository.Update(data);
            }
            return null;
        }

        public async Task<string> AddRangeImExDetail(List<ImportExportDetail> importExportDetailsList)
        {
            return await _importExportDetailRepository.AddRange(importExportDetailsList);            
        }

        public async Task<string> ProvideItem(int exportDetalId, int amount)
        {
            try
            {
                var exportDetail = await _importExportDetailRepository.FindFirst(e => e.ImportExportDetailId == exportDetalId);
                
                if (exportDetail.ProcessDetailId != null)
                {
                    var processDetail = await _processDetailService.GetProcessDetailById((int)exportDetail.ProcessDetailId);
                    //update date if null
                    if (processDetail.FirstExportDate == null)
                    {
                        processDetail.FirstExportDate = System.DateTime.Now;
                    }
                    //update status
                    if (processDetail.Status.Equals("New"))
                    {
                        processDetail.Status = "Processing";
                    }
                    await _processDetailService.UpdateProcessDetail(processDetail);
                }
                //update amount
                if (exportDetail.ItemId == "C")
                {
                    var item = await _componentService.GetComponentById(exportDetail.ItemId);
                    if (!((int)item.Amount < amount))
                    {
                        item.Amount -= amount;
                        exportDetail.ExportedAmount += amount;
                    }
                    else
                    {
                        return "Not enough component: " + item.ComponentName;
                    }
                }
                else if(exportDetail.ItemId == "M")
                {
                    var item = await _materialService.GetMaterialById(exportDetail.ItemId);
                    if (!((int)item.Amount < amount))
                    {
                        item.Amount -= amount;
                        exportDetail.ExportedAmount += amount;
                    }
                    else
                    {
                        return "Not enough material: " + item.MaterialName;
                    }
                }
                await _importExportDetailRepository.Update(exportDetail);
                return "Provided";
            }
            catch (System.Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
