using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSP_API.Business.Services
{
    public class OrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;

        public OrderService(
            IOrderRepository orderRepository,
            IProductRepository productRepository)
        {
            _orderRepository = orderRepository;
            _productRepository = productRepository;
        }

        public async Task<List<Order>> GetAllOrders()
        {
            return await _orderRepository.GetAll(p => p.OrderId != 0);
        }
        public async Task<List<Order>> GetAllOrdersWithDetail()
        {
            return await _orderRepository.GetOrdersWithDetail();
        }
        public async Task<List<Order>> GetOrdersByStatus(string status)
        {
            return await _orderRepository.GetAll(p => p.Status == status);
        }
        public async Task<List<Order>> GetOrdersByTerm(bool? isShorTerm)
        {
            return await _orderRepository.GetAll(p => p.IsShorTerm == isShorTerm);
        }

        public async Task<List<Order>> GetOrderByAccount(int accountId)
        {
            return await _orderRepository.GetAll(p => p.AccountId == accountId);
        }

        public async Task<List<Order>> GetOrderByAccountAndStatus(int accountId, string status)
        {
            return await _orderRepository.GetAll(p => p.AccountId == accountId && p.Status == status);
        }

        public async Task<Order> GetOrderById(int orderId)
        {
            return await _orderRepository.GetById(p => p.OrderId == orderId);
        }

        public async Task<string> AddOrder(Order order)
        {
            if(order.Status != "Waiting")
                order.Status = "New";
            var total = 0.0;
            foreach (var orderDetail in order.OrderDetails)
            {
                total += (double)(orderDetail.Amount * orderDetail.Price);
            }
            order.TotalPrice = total;
            var data = await _orderRepository.Add(order);
            return data;
        }

        public async Task<string> AddOrder2(Order order)
        {
            if (order.Status != "Pending")
                order.Status = "New";
            var total = 0.0;
            foreach (var orderDetail in order.OrderDetails)
            {
                var product = await _productRepository.FindFirst(p => p.ProductId == orderDetail.ProductId);
                orderDetail.Price = product.Price;
                total += (double)(orderDetail.Amount * orderDetail.Price);

            }
            order.TotalPrice = total;
            var data = await _orderRepository.Add(order);
            return data;
        }

        public async Task<string> UpdateOrder(Order newOrder)
        {
            var data = await _orderRepository.FindFirst(p => p.OrderId == newOrder.OrderId);
            if (data != null)
            {
                if (newOrder.CustomerName == null) newOrder.CustomerName = data.CustomerName;
                if (newOrder.CustomerAddress == null) newOrder.CustomerAddress = data.CustomerAddress;
                return await _orderRepository.Update(newOrder);
            }
            return null;
        }

        public async Task<string> DelOrder(int orderId)
        {
            var data = await _orderRepository.GetById(p => p.OrderId == orderId);
            if (data != null)
            {
                data.Status = "Inactive";
                return await _orderRepository.Update(data);
            }
            return null;
        }

        internal Task GetOrderById(int? orderId)
        {
            throw new System.NotImplementedException();
        }
    }
}
