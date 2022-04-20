using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSP_API.Business.Services
{
    public class ProcessDetailService
    {
        private readonly IProcessDetailRepository _processDetailRepository;
        private readonly IProcessRepository _processRepository;
        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly IOrderRepository _orderRepository;

        public ProcessDetailService(
            IProcessDetailRepository processDetailRepository, IOrderDetailRepository orderDetailRepository, IOrderRepository orderRepository, IProcessRepository processRepository)
        {
            _processDetailRepository = processDetailRepository;
            _orderDetailRepository = orderDetailRepository;
            _orderRepository = orderRepository;
            _processRepository = processRepository;
        }

        public async Task<List<ProcessDetail>> GetAllProcessDetailes()
        {
            return await _processDetailRepository.GetAll(p => p.Status != "Delete");
        }

        public async Task<ProcessDetail> GetProcessDetailById(int processDetailId)
        {
            return await _processDetailRepository.GetById(p => p.ProcessDetailId == processDetailId);
        }

        public async Task<List<ProcessDetail>> GetProcessDetailBySectionId(int sectionId)
        {
            var datas = await _processDetailRepository.GetAll(p => p.SectionId == sectionId && (p.Status.Equals("New") || p.Status.Equals("Processing")));
            return datas;
        }

        public async Task<List<ProcessDetail>> GetProcessDetailByProcessId(int processId)
        {
            var datas = await _processDetailRepository.GetAll(p => p.ProcessId == processId);
            return datas;
        }

        public async Task<string> GetTaskName(int processId)
        {
            var process = await _processRepository.FindFirst(p => p.ProcessId == processId);
            var orderDetail = await _orderDetailRepository.FindFirst(od => od.OrderDetailId == process.OrderDetailId);
            var order = await _orderRepository.FindFirst(o => o.OrderId == orderDetail.OrderId);
            var taskName = $"{order.CustomerName}_0{order.OrderId}_0{processId}";
            return taskName;
        }

        public async Task<string> AddProcessDetail(ProcessDetail processDetail)
        {
            return await _processDetailRepository.Add(processDetail);
        }

        public async Task<string> UpdateProcessDetail(ProcessDetail newProcessDetail)
        {
            var data = await _processDetailRepository.FindFirst(p => p.ProcessDetailId == newProcessDetail.ProcessDetailId);
            if (data != null)
            {
                return await _processDetailRepository.Update(newProcessDetail);
            }
            return null;
        }

        public async Task<string> UpdateProcessDetailbyImEx(ProcessDetail newProcessDetail)
        {
            var data = await _processDetailRepository.FindFirst(p => p.ProcessDetailId == newProcessDetail.ProcessDetailId);
            if (data != null)
            {
                return await _processDetailRepository.Update(newProcessDetail);
            }
            return null;
        }

        public async Task<string> DelProcessDetail(int processDetailId)
        {
            var data = await _processDetailRepository.GetById(p => p.ProcessDetailId == processDetailId);
            if (data != null)
            {
                data.Status = "Inactive";
                return await _processDetailRepository.Update(data);
            }
            return null;
        }

        public async Task<string> AddRangeProcessDetail(List<ProcessDetail> processDetailsList)
        {
            return await _processDetailRepository.AddRange(processDetailsList);
        }
    }
}
