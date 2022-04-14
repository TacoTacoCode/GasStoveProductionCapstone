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
        private readonly IOrderRepository _orderRepository;
        private readonly IProcessRepository _processRepository;
        private readonly IProductRepository _productRepository;
        private readonly IComponentRepository _compoRepository;
        private readonly ISectionRepository _sectionRepository;

        public OrderDetailService(
            IOrderDetailRepository orderDetailRepository, IOrderRepository orderRepository,
            IProcessRepository processRepository, IProductRepository productRepository,
            IComponentRepository compoRepository, ISectionRepository sectionRepository)
        {
            _orderDetailRepository = orderDetailRepository;
            _orderRepository = orderRepository;
            _processRepository = processRepository;
            _productRepository = productRepository;
            _compoRepository = compoRepository;
            _sectionRepository = sectionRepository;
        }

        public OrderDetailService()
        {
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
            var order = await _orderRepository.FindFirst(o => o.OrderId == orderDetail.OrderId);
            order.TotalPrice += (orderDetail.Price * orderDetail.Amount);
            await _orderRepository.Update(order);
            return await _orderDetailRepository.Add(orderDetail);
        }

        public async Task<string> UpdateOrderDetail(OrderDetail newOrderDetail)
        {
            var data = await _orderDetailRepository.FindFirst(p => p.OrderDetailId == newOrderDetail.OrderDetailId);
            var order = await _orderRepository.FindFirst(o => o.OrderId == newOrderDetail.OrderId);

            if (data != null && order != null)
            {
                var diff = (newOrderDetail.Price * newOrderDetail.Amount) - (data.Price * data.Amount);
                order.TotalPrice += diff;
                await _orderRepository.Update(order);
                return await _orderDetailRepository.Update(newOrderDetail);
            }
            return null;
        }

        public async Task<string> DelOrderDetail(int orderDetailId)
        {
            try
            {
                var data = await _orderDetailRepository.GetById(p => p.OrderDetailId == orderDetailId);
                if (data != null)
                {
                    var order = await _orderRepository.FindFirst(o => o.OrderId == data.OrderId);
                    order.TotalPrice -= (data.Price * data.Amount);
                    await _orderRepository.Update(order);
                    var processes = await _processRepository.FindProcessWithDetails(p => p.OrderDetailId == orderDetailId);
                    //set Process and processDetail status, amount go to ware house
                    if (processes != null)
                    {
                        var section = (await _sectionRepository.GetAll(s => true)).ToDictionary(s => s.SectionId, s => s.ComponentId);
                        foreach (var process in processes)
                        {
                            process.Status = "Delete";
                            foreach (var detail in process.ProcessDetails)
                            {
                                detail.Status = "Delete";
                                var compo = await _compoRepository.FindFirst(c => c.ComponentId == section[detail.SectionId.Value]);
                                if (compo != null)
                                {
                                    compo.Amount += detail.FinishedAmount;
                                    await _compoRepository.Update(compo);
                                }
                                else
                                {
                                    var product = await _productRepository.FindFirst(p => p.ProductId == data.ProductId);
                                    product.Amount += detail.FinishedAmount;
                                    await _productRepository.Update(product);
                                }
                            }
                            await _processRepository.Update(process);
                        }
                    }
                    return await _orderDetailRepository.Delete(data);
                }
                return null;
            }
            catch
            {
                return null;
            }
        }

        public async Task<string> AddRangeOrderDetail(List<OrderDetail> orderDetailsList)
        {
            return await _orderDetailRepository.AddRange(orderDetailsList);
        }
    }
}
