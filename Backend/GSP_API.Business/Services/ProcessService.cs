﻿using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
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

        public ProcessService(
            IProcessRepository processRepository,
            ProcessDetailService processDetailService,
            ProductComponentService productComponentService, SectionService sectionService, OrderDetailService orderDetailService)
        {
            _processRepository = processRepository;
            _processDetailService = processDetailService;
            _productComponentService = productComponentService;
            _sectionService = sectionService;
            _orderDetailService = orderDetailService;
        }

        public async Task<List<Process>> GetAllProcesses()
        {
            return await _processRepository.GetAll(p => p.ProcessId != 0);
        }

        public async Task<Process> GetProcessById(int processId)
        {
            return await _processRepository.GetById(p => p.ProcessId == processId);
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
            if(orderDetail.OrderDetailId == 0)
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
            var process = new Process() {
                CreatedDate = System.DateTime.Now.Date,
                Status = "New",
                NeededAmount = orderDetail.Amount,
                TotalAmount = orderDetail.Amount,
                FinishedAmount = 0,
                OrderDetailId = orderDetail.OrderDetailId,
                
            };
            var listProCompo = await _productComponentService.GetProCompoByProId(orderDetail.ProductId);

            //Create processDetail based on OrderDetail.Amount
            foreach (var productComponent in listProCompo)
            {
                process.ProcessDetails.Add(new ProcessDetail()
                {
                    TotalAmount = orderDetail.Amount * productComponent.Amount,
                    SectionId = _sectionService.GetSectionByComponentId(productComponent.ComponentId).Result.SectionId,
                    Status = "New",
                    FinishedAmount = 0,

                });               
            }
            process.ProcessDetails.Add(new ProcessDetail()
            {
                TotalAmount = orderDetail.Amount,
                SectionId = (await _sectionService.GetSectionByType(true)).SectionId,
                Status = "New",
                FinishedAmount = 0,
            });
            return process;
        }

        public async Task<string> AddProcessList(List<Process> processList)
        {
            ////validate
            var orderDetail = await  _orderDetailService.GetOrderDetailById((int)processList[0].OrderDetailId);
            //get all component need to build the product
            var proCompos = await _productComponentService.GetProCompoByProId(orderDetail.ProductId);
            //add amount of component need, convert to sectionId since processDetail contains SectionId 
            var sectionDic = proCompos.ToDictionary(e => _sectionService.GetSectionByComponentId(e.ComponentId).Result.SectionId, e => e.Amount);
            //add assemble section
            sectionDic.Add(_sectionService.GetSectionByType(true).Result.SectionId, orderDetail.Amount);

            var sumOfProduct = 0;
            var processIndex = 1;
            foreach (var process in processList)
            {
                //validate processDetail
                foreach (var proDetail in process.ProcessDetails)
                {
                    if (proDetail.TotalAmount < sectionDic[(int)proDetail.SectionId]*orderDetail.Amount) {
                        return "Lack of Component at Process No." + processIndex.ToString();
                    }

                }
                sumOfProduct += (int) (process.NeededAmount + process.FinishedAmount);
                processIndex += 1;
            }
            //validate amount
            if (sumOfProduct != orderDetail.Amount)
                return "Needed ammount in all processes is different from Order Detail";

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
    }
}
