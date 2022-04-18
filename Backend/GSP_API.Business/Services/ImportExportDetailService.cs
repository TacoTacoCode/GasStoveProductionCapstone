using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GSP_API.Business.Services
{
    public class ImportExportDetailService  
    {
        private readonly IImportExportDetailRepository _importExportDetailRepository;
        private readonly IImportExportRepository _importExportRepository;
        //private readonly ImportExportService _importExportService;
        private readonly ProcessDetailService _processDetailService;
        private readonly ProcessService _processService;
        private readonly ComponentService _componentService;
        private readonly MaterialService _materialService;
        private readonly ProductService _productService;

        public ImportExportDetailService(
            IImportExportDetailRepository importExportDetailRepository,
            ProcessDetailService processDetailService, ComponentService componentService,
            MaterialService materialService, ProductService productService,
            ProcessService processService, IImportExportRepository importExportRepository)
        {
            _importExportDetailRepository = importExportDetailRepository;
            _processDetailService = processDetailService;
            _componentService = componentService;
            _materialService = materialService;
            _productService = productService;
            _processService = processService;
            _importExportRepository = importExportRepository;
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

        public async Task<string> ProvideItem(ImportExportDetail exportDetail, string itemType)
        {
            try
            {
                var oldExportDetail = await _importExportDetailRepository.FindFirst(e => e.ImportExportDetailId == exportDetail.ImportExportDetailId);
                //update amount
                if (itemType == "C")
                {
                    var item = await _componentService.GetComponentById(exportDetail.ItemId);
                    if (!((int)item.Amount < exportDetail.ExportedAmount))
                    {
                        item.Amount -= exportDetail.ExportedAmount;
                        exportDetail.ExportedAmount += (oldExportDetail.ExportedAmount ?? 0);
                        if (exportDetail.ExportedAmount > exportDetail.Amount)
                        {
                            return "Exported amount is exceed request amount";
                        }
                        await _componentService.UpdateComponent(item, null, item.ImageUrl);

                    }
                    else
                    {
                        return "Not enough component: " + item.ComponentName;
                    }
                }
                else if (itemType == "M")
                {
                    var item = await _materialService.GetMaterialById(exportDetail.ItemId);
                    if (!((int)item.Amount < exportDetail.ExportedAmount))
                    {
                        item.Amount -= exportDetail.ExportedAmount;
                        exportDetail.ExportedAmount += (oldExportDetail.ExportedAmount ?? 0);
                        if (exportDetail.ExportedAmount > exportDetail.Amount)
                        {
                            return "Exported amount is exceed request amount";
                        }
                        await _materialService.UpdateMaterial(item, null, item.ImageUrl);
                    }
                    else
                    {
                        return "Not enough material: " + item.MaterialName;
                    }
                }
                //exportDetail.Amount = oldExportDetail.Amount;
                await _importExportDetailRepository.Update(exportDetail);

                //update date
                if (exportDetail.ProcessDetailId != null)
                {
                    var flag = false;
                    var processDetail = await _processDetailService.GetProcessDetailById((int)exportDetail.ProcessDetailId);
                    //update date if null
                    if (processDetail.FirstExportDate == null)
                    {
                        processDetail.FirstExportDate = System.DateTime.Now;
                        flag = true;
                    }
                    //update status
                    if (processDetail.Status.Equals("New"))
                    {
                        flag = true;
                        processDetail.Status = "Processing";
                    }
                    if (flag)
                        await _processDetailService.UpdateProcessDetail(processDetail);
                }
                await UpdateStatus((int)exportDetail.ImportExportId);
                return "Provided";
            }
            catch (System.Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<string> ImportItem(ImportExportDetail importDetail, string itemType)
        {
            try
            {
                ProcessDetail processDetail = null;
                int? amount = -1;
                if (importDetail.ProcessDetailId != null)
                {
                    processDetail = await _processDetailService.GetProcessDetailById((int)importDetail.ProcessDetailId);
                    processDetail.FinishedAmount = (processDetail.FinishedAmount ?? 0) + importDetail.Amount;

                    if (processDetail.FinishedAmount == processDetail.TotalAmount)
                    {
                        processDetail.Status = "Done";
                        processDetail.FinishedDate = DateTime.Now.Date;
                        amount = 0;
                    }else if(processDetail.FinishedAmount > processDetail.TotalAmount)
                    {
                        processDetail.Status = "Done";
                        amount = processDetail.FinishedAmount - processDetail.TotalAmount;
                        processDetail.FinishedAmount = processDetail.TotalAmount;
                        processDetail.FinishedDate = DateTime.Now.Date;
                    }

                    //cal average = totalAmount/totalDate
                    //bat firstExport dum`...
                    var datePass = Convert.ToInt32(DateTime.Now.Subtract((DateTime)processDetail.FirstExportDate).TotalDays);
                    if (datePass == 0) datePass++;
                    var average = Convert.ToInt32(processDetail.FinishedAmount / datePass);
                    processDetail.AverageAmount = average;

                    //from average cal expected date
                    var calDate = Convert.ToInt32(processDetail.TotalAmount / average);
                    processDetail.ExpectedFinishDate = ((DateTime)processDetail.FirstExportDate).AddDays(calDate);
                    await _processDetailService.UpdateProcessDetail(processDetail);
                }
                //import to warehouse
                if(!(amount < 0))
                {
                    if (itemType == "C")
                    {
                        var item = await _componentService.GetComponentById(importDetail.ItemId);
                        item.Amount += amount;
                        await _componentService.UpdateComponent(item, null, item.ImageUrl);
                    }
                    else if (itemType == "P")
                    {
                        var item = await _productService.GetProductById(importDetail.ItemId);
                        item.Amount += amount;
                        //import product => section assemble => update process info
                        if(processDetail != null)
                        {
                            var process = await _processService.GetProcessById((int)processDetail.ProcessId);
                            process.Status = "Done";
                            process.FinishedDate = processDetail.FinishedDate;
                            process.FinishedAmount = processDetail.FinishedAmount;
                            await _processService.UpdateProcess(process);
                        }
                        await _productService.UpdateProduct(item, null, item.ImageUrl);
                    }
                }
                else
                {
                    //import product => section assemble => update process info
                    if (processDetail != null && itemType == "P")
                    {
                        var process = await _processService.GetProcessById((int)processDetail.ProcessId);
                        process.FinishedAmount = processDetail.FinishedAmount;
                        process.ExpectedFinishDate = processDetail.ExpectedFinishDate;
                        process.Status = "Processing";  
                        await _processService.UpdateProcess(process);
                    }
                }

                return "Imported";
            }
            catch 
            {
                return $"Error at import detail id: {importDetail.ImportExportDetailId}";
            }
        }

        private async Task<string> UpdateStatus(int imExId)
        {
            var allImExDetails = await _importExportDetailRepository.GetAll(
                i => i.ImportExportId == imExId);
            var tmp = allImExDetails.FindAll(e => e.Amount != e.ExportedAmount);
            if (tmp.Count == 0)
            {
                var imEx = await _importExportRepository.FindFirst(ie => ie.ImportExportId == imExId);
                if (imEx != null)
                {
                    imEx.Status = "Done";
                    await _importExportRepository.Update(imEx);
                }
            }
            return "";
        }
    }
}
