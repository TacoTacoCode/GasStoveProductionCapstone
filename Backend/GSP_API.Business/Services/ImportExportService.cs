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
            ImportExportDetailService importExportDetailService)

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
            if(error.Count > 0)
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

        /*public async Task<string> UpdateImEx(ImportExport newImEx)
        {

            var data = await _importExportRepository.FindFirst(p => p.ImportExportId == newImEx.ImportExportId);
            if (data != null)
            {
                await _importExportRepository.Update(newImEx);
                //Get list of imEx detail
                List<ImportExportDetail> importExportDetail =
                            await _importExportDetailService.GetImExDetailByImEx(newImEx.ImportExportId);
                //Check Assemble
                var checkAssemble = await _sectionService.CheckAssemble((int)newImEx.SectionId);
                try
                {
                    switch (newImEx.IsImport)
                    {
                        //For Import
                        case true:
                            //If Assemble Section
                            switch (checkAssemble)
                            {
                                case "true":
                                    foreach (ImportExportDetail item in importExportDetail)
                                    {
                                        //If Import for any Process
                                        switch (item.ProcessDetailId)
                                        {
                                            case null:
                                                var product = await _productService.GetProductById(item.ItemId);
                                                product.Amount += item.Amount;
                                                await _productService.UpdateProduct(product);
                                                break;
                                            default:
                                                var processDetail =
                                                    await _processDetailService.GetProcessDetailById((int)item.ProcessDetailId);
                                                processDetail.FinishedAmount += item.Amount;

                                                var process = await _processService.GetProcessById((int)processDetail.ProcessId);
                                                process.FinishedAmount += item.Amount;

                                                //Amount of day from the latest Import to the first Import 
                                                //of the same processDetail
                                                var workDay = newImEx.CreatedDate - newImEx.FirstExportDate;
                                                //Average amount
                                                var averageAmount = workDay.Value.Days / processDetail.FinishedAmount;

                                                //Amount of day to finish
                                                var remainDate = (processDetail.TotalAmount - processDetail.FinishedAmount) / averageAmount;
                                                var expectedFinishDate = newImEx.CreatedDate.Value.AddDays((double)remainDate);

                                                processDetail.AverageAmount = averageAmount;
                                                processDetail.ExpectedFinishDate = expectedFinishDate;
                                                process.ExpectedFinishDate = expectedFinishDate;

                                                //Check if Process (Detail) is done, if 'yes', close the process
                                                if (processDetail.FinishedAmount == processDetail.TotalAmount)
                                                {
                                                    //Update the remain prodcut in process (Needed vs Total)(Phần dư)
                                                    product = await _productService.GetProductById(item.ItemId);
                                                    product.Amount = process.TotalAmount - process.NeededAmount;
                                                    await _productService.UpdateProduct(product);

                                                    //Update Status
                                                    processDetail.Status = "Done";
                                                    process.Status = "Done";
                                                }

                                                await _processDetailService.UpdateProcessDetail(processDetail);
                                                await _processService.UpdateProcess(process);
                                                break;
                                        }
                                    }
                                    break;
                                case "false":
                                    foreach (ImportExportDetail item in importExportDetail)
                                    {
                                        //If Import for any Process
                                        switch (item.ProcessDetailId)
                                        {
                                            case null:
                                                var product = await _productService.GetProductById(item.ItemId);
                                                product.Amount += item.Amount;
                                                await _productService.UpdateProduct(product);
                                                break;
                                            default:
                                                var processDetail =
                                                    await _processDetailService.GetProcessDetailById((int)item.ProcessDetailId);
                                                processDetail.FinishedAmount += item.Amount;

                                                //Amount of day from the latest Import to the first Import 
                                                //of the same processDetail
                                                var workDay = newImEx.CreatedDate - newImEx.FirstExportDate;
                                                //Average amount
                                                var averageAmount = workDay.Value.Days / processDetail.FinishedAmount;

                                                //Amount of day to finish
                                                var remainDate = (processDetail.TotalAmount - processDetail.FinishedAmount) / averageAmount;
                                                var expectedFinishDate = newImEx.CreatedDate.Value.AddDays((double)remainDate);

                                                processDetail.AverageAmount = averageAmount;
                                                processDetail.ExpectedFinishDate = expectedFinishDate;

                                                //Check if Process (Detail) is done, if 'yes', close the process
                                                if (processDetail.FinishedAmount == processDetail.TotalAmount)
                                                {
                                                    processDetail.Status = "Done";
                                                }

                                                await _processDetailService.UpdateProcessDetail(processDetail);
                                                break;
                                        }
                                    }
                                    break;
                            }
                            break;
                        //For Export
                        case false:
                            //If Assemble Section
                            switch (checkAssemble)
                            {
                                case "true":
                                    foreach (ImportExportDetail item in importExportDetail)
                                    {
                                        //If Accepted
                                        switch (newImEx.Status)
                                        {
                                            case "Finished":
                                                var component = await _componentService.GetComponentById(item.ItemId);
                                                //Update by amount of imExDetail
                                                component.Amount -= item.Amount;
                                                await _componentService.UpdateComponent(component);
                                                break;
                                            case "Processing":
                                                component = await _componentService.GetComponentById(item.ItemId);
                                                //Update by amount of Exported Amount
                                                component.Amount -= item.ExportedAmount;
                                                await _componentService.UpdateComponent(component);
                                                break;
                                            case "Pending":
                                                break;
                                        }
                                    }
                                    break;
                                case "false":
                                    foreach (ImportExportDetail item in importExportDetail)
                                    {
                                        //If Accepted
                                        switch (newImEx.Status)
                                        {
                                            case "Finished":
                                                var material = await _materialService.GetMaterialById(item.ItemId);
                                                material.Amount -= item.Amount;
                                                await _materialService.UpdateMaterial(material);
                                                break;
                                            case "Processing":
                                                material = await _materialService.GetMaterialById(item.ItemId);
                                                material.Amount -= item.ExportedAmount;
                                                await _materialService.UpdateMaterial(material);
                                                break;
                                            case "Pending":
                                                break;
                                        }
                                    }
                                    break;
                            }
                            break;
                    }
                    return "Update successfully";
                }
                catch (Exception e)
                {
                    return e.Message.ToString();
                }
            }
            return null;
        }*/

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

        public async Task<List<ImportExport>> GetAllActive()
        {
            return await _importExportRepository.GetAll(p => p.Status != "Finished");
        }
    }
}
