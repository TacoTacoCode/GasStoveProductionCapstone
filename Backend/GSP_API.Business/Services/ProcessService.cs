using GSP_API.Domain.Interfaces;
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

        public ProcessService(
            IProcessRepository processRepository,
            ProcessDetailService processDetailService,
            ProductComponentService productComponentService, SectionService sectionService)
        {
            _processRepository = processRepository;
            _processDetailService = processDetailService;
            _productComponentService = productComponentService;
            _sectionService = sectionService;
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
            var process = new Process() {
                CreatedDate = System.DateTime.Now.Date,
                Status = "New",
                NeededAmount = orderDetail.Amount,
                TotalAmount = orderDetail.Amount,
                FinishedAmount = 0,
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
