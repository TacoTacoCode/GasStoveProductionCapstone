using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GSP_API.Business.Services
{
    public class ImportExportDetailService
    {
        private readonly IImportExportDetailRepository _importExportDetailRepository;

        public ImportExportDetailService()
        {
        }

        public ImportExportDetailService(
            IImportExportDetailRepository importExportDetailRepository)
        {
            _importExportDetailRepository = importExportDetailRepository;
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

        //public async Task<string> UpdateImportDetail(ImportExportDetail newImExDetail)
        //{
        //    var data = await _importExportDetailRepository.FindFirst(p => p.ImportExportDetailId == newImExDetail.ImportExportDetailId);
        //    if (data != null)
        //    {
        //        return await _importExportDetailRepository.Update(newImExDetail);
        //    }
        //    return null;
        //}

        //public async Task<string> UpdateExportDetail(ImportExportDetail newImExDetail)
        //{
        //    var data = await _importExportDetailRepository.FindFirst(p => p.ImportExportDetailId == newImExDetail.ImportExportDetailId);
        //    if (data != null)
        //    {
        //        return await _importExportDetailRepository.Update(newImExDetail);
        //    }
        //    return null;
        //}

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
    }
}
