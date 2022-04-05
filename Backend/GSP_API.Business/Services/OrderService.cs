﻿using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSP_API.Business.Services
{
    public class OrderService
    {
        private readonly IOrderRepository _orderRepository;

        public OrderService(
            IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
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

        public async Task<List<Order>> GetOrderByAccount(int accountId)
        {
            return await _orderRepository.GetAll(p => p.AccountId == accountId);
        }

        public async Task<Order> GetOrderById(int orderId)
        {
            return await _orderRepository.GetById(p => p.OrderId == orderId);
        }

        public async Task<string> AddOrder(Order order)
        {
            var data = await _orderRepository.Add(order);
            return data;
        }

        public async Task<string> UpdateOrder(Order newOrder)
        {

            var data = await _orderRepository.FindFirst(p => p.OrderId == newOrder.OrderId);
            if (data != null)
            {
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

    }
}
