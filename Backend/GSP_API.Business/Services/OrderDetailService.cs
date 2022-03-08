using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSP_API.Business.Services
{
    public class OrderDetailService
    {
        private readonly IOrderDetailRepository _orderDetailRepository;

        public OrderDetailService(
            IOrderDetailRepository orderDetailRepository)
        {
            _orderDetailRepository = orderDetailRepository;
        }

        public async Task<List<OrderDetail>> GetOrderDetailsByOrder(int orderId)
        {
            return await _orderDetailRepository.GetAll(p => p.OrderId == orderId);
        }

        public async Task<OrderDetail> GetOrderDetailById(int orderDetailId)
        {
            return await _orderDetailRepository.GetById(p => p.OrderDetailId == orderDetailId);
        }

        public async Task<string> AddOrderDetail(OrderDetail orderDetail)
        {
            return await _orderDetailRepository.Add(orderDetail);
        }

        public async Task<string> UpdateOrderDetail(OrderDetail newOrderDetail)
        {
            var data = await _orderDetailRepository.FindFirst(p => p.OrderDetailId == newOrderDetail.OrderDetailId);
            if (data != null)
            {
               return await _orderDetailRepository.Update(newOrderDetail);
            }
            return null;
        }

        public async Task<string> DelOrderDetail(int orderDetailId)
        {
            var data = await _orderDetailRepository.GetById(p => p.OrderDetailId == orderDetailId);
            if (data != null)
            {
                //data.Status = "Inactive";
                return await _orderDetailRepository.Update(data);
            }
            return null;
        }
    }
}
