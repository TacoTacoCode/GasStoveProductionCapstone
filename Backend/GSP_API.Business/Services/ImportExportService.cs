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
            var data = await _importExportRepository.Add(imEx);
            //If Add ImEx successfully
            switch (data)
            {
                case "true":
                    List<ImportExportDetail> imExDetailList = (List<ImportExportDetail>)imEx.ImportExportDetails;
                    return await new ImportExportDetailService().AddRangeImExDetail(imExDetailList);
                default:
                    return data;
            }
        }

        public async Task<string> UpdateImEx(ImportExport newImEx)
        {
            var sectionService = new SectionService();
            var processService = new ProcessService();
            var processDetailService = new ProcessDetailService();
            var productService = new ProductService();
            var componentService = new ComponentService();
            var materialService = new MaterialService();

            var data = await _importExportRepository.FindFirst(p => p.ImportExportId == newImEx.ImportExportId);
            if (data != null)
            {
                await _importExportRepository.Update(newImEx);
                //Get list of imEx detail
                List<ImportExportDetail> importExportDetail =
                            await new ImportExportDetailService().GetImExDetailByImEx(newImEx.ImportExportId);
                //Check Assemble
                var checkAssemble = await sectionService.CheckAssemble((int)newImEx.SectionId);
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
                                                var product = await productService.GetProductById(item.ItemId);
                                                product.Amount += item.Amount;
                                                await productService.UpdateProduct(product);
                                                break;
                                            default:
                                                var processDetail =
                                                    await processDetailService.GetProcessDetailById((int)item.ProcessDetailId);
                                                processDetail.FinishedAmount += item.Amount;

                                                var process = await processService.GetProcessById((int)processDetail.ProcessId);
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
                                                    product = await productService.GetProductById(item.ItemId);
                                                    product.Amount = process.TotalAmount - process.NeededAmount;
                                                    await productService.UpdateProduct(product);

                                                    //Update Status
                                                    processDetail.Status = "Done";
                                                    process.Status = "Done";
                                                }

                                                await processDetailService.UpdateProcessDetail(processDetail);
                                                await processService.UpdateProcess(process);                                                
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
                                                var product = await productService.GetProductById(item.ItemId);
                                                product.Amount += item.Amount;
                                                await productService.UpdateProduct(product);
                                                break;
                                            default:
                                                var processDetail =
                                                    await processDetailService.GetProcessDetailById((int)item.ProcessDetailId);
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

                                                await processDetailService.UpdateProcessDetail(processDetail);
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
                                                var component = await componentService.GetComponentById(item.ItemId);
                                                //Update by amount of imExDetail
                                                component.Amount -= item.Amount;
                                                await componentService.UpdateComponent(component);
                                                break;
                                            case "Processing":
                                                component = await componentService.GetComponentById(item.ItemId);
                                                //Update by amount of Exported Amount
                                                component.Amount -= item.ExportedAmount;
                                                await componentService.UpdateComponent(component);
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
                                                var material = await materialService.GetMaterialById(item.ItemId);
                                                material.Amount -= item.Amount;
                                                await materialService.UpdateMaterial(material);
                                                break;
                                            case "Processing":
                                                material = await materialService.GetMaterialById(item.ItemId);
                                                material.Amount -= item.ExportedAmount;
                                                await materialService.UpdateMaterial(material);
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
    }
}
