using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSP_API.Business.Services
{
    public class ProcessService
    {
        private readonly IProcessRepository _processRepository;
        private readonly ProcessDetailService _processDetailService;
        private readonly ProductComponentService _productComponentService;
        private readonly SectionService _sectionService;
        private readonly OrderDetailService _orderDetailService;
        private readonly OrderService _orderService;

        public ProcessService(
            IProcessRepository processRepository, ProcessDetailService processDetailService,
            ProductComponentService productComponentService, SectionService sectionService,
            OrderDetailService orderDetailService, OrderService orderService)
        {
            _processRepository = processRepository;
            _processDetailService = processDetailService;
            _productComponentService = productComponentService;
            _sectionService = sectionService;
            _orderDetailService = orderDetailService;
            _orderService = orderService;
        }

        public async Task<List<Process>> GetAllProcesses()
        {
            return await _processRepository.GetAll(p => p.ProcessId != 0);
        }

        public async Task<Process> GetProcessById(int processId)
        {
            return await _processRepository.GetById(p => p.ProcessId == processId);
        }
        public async Task<List<Process>> GetProcessByOrderDetailId(int orderDetailId)
        {
            return await _processRepository.GetAll(p => p.OrderDetailId == orderDetailId);
        }

        public async Task<List<Process>> GetProcessesByStatus(string status)
        {
            return await _processRepository.GetAll(p => p.Status == status);
        }

        public async Task<string> AddProcess(Process process)
        {
            var data = await _processRepository.Add(process);
            //If Add Process successfully
            switch (data)
            {
                case "true":
                    List<ProcessDetail> processDetailList = (List<ProcessDetail>)process.ProcessDetails;
                    return await _processDetailService.AddRangeProcessDetail(processDetailList);
                default:
                    return data;
            }
        }

        public async Task<Process> CreateProcess(OrderDetail orderDetail)
        {
            if (orderDetail.OrderDetailId == 0)
            {
                orderDetail = new()
                {
                    OrderDetailId = 2,
                    OrderId = 1,
                    ProductId = "PRO1",
                    Amount = 10,
                    Price = 2,
                    Note = "abc",
                };
            }
            //delete above if not test
            var listProCompo = await _productComponentService.GetProCompo(orderDetail.ProductId);
            var average = listProCompo[0].Product.Average ?? 0;
            DateTime? expected = listProCompo[0].Product.Average == null ? null :
                GetExpected(orderDetail.Amount, listProCompo[0].Product.Average, null);

            var process = new Process()
            {
                CreatedDate = DateTime.Now.Date,
                Status = "New",
                NeededAmount = orderDetail.Amount,
                TotalAmount = orderDetail.Amount,
                FinishedAmount = 0,
                OrderDetailId = orderDetail.OrderDetailId,
                ExpectedFinishDate = expected
            };
            
            //Create processDetail based on OrderDetail.Amount
            foreach (var productComponent in listProCompo)
            {
                var total = orderDetail.Amount * productComponent.Amount;
                process.ProcessDetails.Add(new ProcessDetail()
                {
                    TotalAmount = total,
                    SectionId = _sectionService.GetSectionByComponentId(productComponent.ComponentId).Result.SectionId,
                    Status = "New",
                    FinishedAmount = 0,
                    AverageAmount = productComponent.Component.Average ?? 0,
                    ExpectedFinishDate = productComponent.Component.Average == null ? null
                                        : GetExpected(total, productComponent.Component.Average, null)
                });
            }
            
            //Add assemble Section
            process.ProcessDetails.Add(new ProcessDetail()
            {
                TotalAmount = orderDetail.Amount,
                SectionId = (await _sectionService.GetSectionByType(true)).SectionId,
                Status = "New",
                FinishedAmount = 0,
                AverageAmount = average,
                ExpectedFinishDate = expected
            });
            return process;
        }
        private DateTime GetExpected(int? total, int? average, DateTime? createdDate)
        {
            int date = Convert.ToInt32(total / average);
            if (createdDate == null)
            {
                createdDate = DateTime.Now.Date;
            }
            return ((DateTime)createdDate).AddDays(date);
        }

        public async Task<List<Process>> DistributeProcess(Process process, int[] amounts)
        {
            var processList = new List<Process>();
            var orderDetail = await _orderDetailService.GetOrderDetailById((int)process.OrderDetailId);

            //GetProCompo and map each compoID -> sectionID since ProcessDetail contains sectionID
            var listProCompo = await _productComponentService.GetProCompoByProId(orderDetail.ProductId);
            var secDic = listProCompo.ToDictionary(e => _sectionService.GetSectionByComponentId(e.ComponentId).Result.SectionId, e => e.Amount);

            var assembleSection = await _sectionService.GetSectionByType(true);


            foreach (var number in amounts)
            {
                //create process
                var newProcess = new Process()
                {
                    CreatedDate = process.CreatedDate,
                    Status = "New",
                    NeededAmount = number,
                    TotalAmount = number,
                    FinishedAmount = number == amounts.First() ? process.FinishedAmount : 0,
                    OrderDetailId = process.OrderDetailId,
                };
                //Create processDetail
                foreach (var item in secDic)
                {
                    newProcess.ProcessDetails.Add(new ProcessDetail()
                    {
                        TotalAmount = number * item.Value,
                        SectionId = item.Key,
                        Status = "New",
                        FinishedAmount = 0,
                    });
                }
                //add assemble process
                newProcess.ProcessDetails.Add(new ProcessDetail()
                {
                    TotalAmount = newProcess.TotalAmount - newProcess.FinishedAmount,
                    SectionId = assembleSection.SectionId,
                    Status = "New",
                    FinishedAmount = 0,
                });
                //add to return list
                processList.Add(newProcess);
            }
            return processList;
        }

        public async Task<string> AddProcessList(List<Process> processList)
        {
            ////validate
            var orderDetail = await _orderDetailService.GetOrderDetailById((int)processList[0].OrderDetailId);
            var sumOfProduct = 0;
            var processIndex = 1;
            foreach (var process in processList)
            {
                if (process.TotalAmount < process.NeededAmount)
                {
                    return $"Error: Total amount must greater than needder amount in sub process {processIndex}";
                }
                if (process.TotalAmount < process.FinishedAmount)
                {
                    return $"Error: Total amount must greater than Finished Amount in sub process No{processIndex}";
                }
                if (process.ExpiryDate.Value.CompareTo(process.CreatedDate.Value) < 0)
                {
                    return $"Error: ExpiryDate must be latter than CreateDate in sub process No{processIndex}";
                }
                var tpm = process.ProcessDetails.Where(p => p.ExpiryDate.Value.CompareTo(process.CreatedDate.Value) < 0);
                if (tpm.Any())
                {
                    return $"Error: ExpiryDate of each process detail must be latter than CreateDate in sub process No{processIndex}";
                }

                sumOfProduct += (int)(process.NeededAmount + process.FinishedAmount);
                processIndex += 1;
            }
            //validate amount
            if (sumOfProduct != orderDetail.Amount)
            {
                return "Error: Sum of needed ammount in all processes is different from Order Detail";
            }
            var order = await _orderService.GetOrderById((int)orderDetail.OrderId);
            order.Status = "Processing";
            await _orderService.UpdateOrder(order);
            var data = await _processRepository.AddRange(processList);
            return data;
        }

        public async Task<string> UpdateProcess(Process newProcess)
        {
            var data = await _processRepository.FindFirst(p => p.ProcessId == newProcess.ProcessId);
            if (data != null)
            {
                return await _processRepository.Update(newProcess);
            }
            return null;
        }

        public async Task<string> DelProcess(int processId)
        {
            var data = await _processRepository.GetById(p => p.ProcessId == processId);
            if (data != null)
            {
                data.Status = "Inactive";
                return await _processRepository.Update(data);
            }
            return null;
        }

        public async Task<int> GetNoProcess(int orderDetailId)
        {
            var processList = await _processRepository.GetAll(p => p.OrderDetailId == orderDetailId);
            return processList == null ? 0 : processList.Count;
        }

        public async Task<List<ProductComponent>> GetListProCompos(int processId)
        {
            try
            {
                var process = await GetProcessById(processId);
                var orderDetail = await _orderDetailService.GetOrderDetailById((int)process.OrderDetailId);
                var proComs = await _productComponentService.GetProCompo(orderDetail.ProductId);
                return proComs;
            }
            catch
            {
                return null;
            }
        }
    }
}

