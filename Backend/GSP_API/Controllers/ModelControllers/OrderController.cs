using AutoMapper;
using GSP_API.Models.Request;
using GSP_API.Models.Response;
using GSP_API.Business.Services;
using GSP_API.Domain.Repositories.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSP_API.Controllers.ModelControllers
{
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;
        private readonly IMapper _mapper;

        public OrderController(
             OrderService orderService,
             IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;
        }

        // GET: getAllOrders
        [HttpGet]
        [Route("getAllOrders")]
        public async Task<ActionResult<List<OrderResponse>>> GetAllOrders()
        {
            var data = await _orderService.GetAllOrders();
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var list = _mapper.Map<List<OrderResponse>>(data);
            return Ok(list);
        }
        [HttpGet]
        [Route("getAllOrdersWithDetail")]
        public async Task<ActionResult<List<OrderResponse>>> GetAllOrdersWithDetail()
        {
            var data = await _orderService.GetAllOrdersWithDetail();
            if (data == null)
            {
                return BadRequest("Not found");
            }
            return Ok(data);
        }

        // GET: getOrder/[status] processing/pending/done
        [HttpGet]
        [Route("getOrders/{status}")]
        public async Task<ActionResult<List<OrderResponse>>> GetOrdersByStatus(string status)
        {
            var data = await _orderService.GetOrdersByStatus(status);
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var list = _mapper.Map<List<OrderResponse>>(data);
            return Ok(list);
        }

        // GET: getOrder/[isShorTerm] true/false
        [HttpGet]
        [Route("getOrders/isShorTerm/{isShorTerm}")]
        public async Task<ActionResult<List<OrderResponse>>> GetOrdersByTerm(bool isShorTerm)
        {
            var data = await _orderService.GetOrdersByTerm(isShorTerm);
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var list = _mapper.Map<List<OrderResponse>>(data);
            return Ok(list);
        }

        // GET: getOrdersOf/acc/1
        [HttpGet]
        [Route("getOrdersOf/acc/{accountId}")]
        public async Task<ActionResult<List<OrderResponse>>> GetAllOrders(int accountId)
        {
            var data = await _orderService.GetOrderByAccount(accountId);
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var list = _mapper.Map<List<OrderResponse>>(data);
            return Ok(list);
        }

        // GET: getOrderOf/acc={accountId}&&status={status}
        [HttpGet]
        [Route("getOrderOf/{accountId}/{status}")]
        public async Task<ActionResult<OrderResponse>> GetOrderByAccountAndStatus(int accountId, string status)
        {
            var data = await _orderService.GetOrderByAccountAndStatus(accountId, status);
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var order = _mapper.Map<List<OrderResponse>>(data);
            return Ok(order);
        }

        // GET: getOrder/1
        [HttpGet]
        [Route("getOrder/{orderId}")]
        public async Task<ActionResult<OrderResponse>> GetOrderById(int orderId)
        {
            var data = await _orderService.GetOrderById(orderId);
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var order = _mapper.Map<OrderResponse>(data);
            return Ok(order);
        }

        // POST: AddOrder/[order]
        [HttpPost]
        [Route("addOrder")]
        public async Task<ActionResult> AddOrder([FromBody] OrderRequest orderRequest)
        {
            var data = _mapper.Map<Order>(orderRequest);
            var result = await _orderService.AddOrder(data);
            if (result == "true")
            {
                return Ok("Add successfully");
            }            
            return BadRequest(result);
        }

        // POST: AddOrder/2/[order]
        [HttpPost]
        [Route("addOrder/2")]
        public async Task<ActionResult> AddOrder2([FromBody] OrderRequest orderRequest)
        {
            var data = _mapper.Map<Order>(orderRequest);
            var result = await _orderService.AddOrder2(data);
            if (result == "true")
            {
                return Ok("Add successfully");
            }
            return BadRequest(result);
        }

        // PUT: UpdateOrder/[order]
        [HttpPut]
        [Route("updateOrder")]
        public async Task<ActionResult> UpdateOrder([FromBody] OrderRequest orderRequest)
        {
            var data = await _orderService.UpdateOrder(_mapper.Map<Order>(orderRequest));
            if (data == null)
            {
                return BadRequest("Not found");
            }
            else if (data.Equals("true"))
            {
                return Ok("Update Successfully");
            }
            return BadRequest(data);
        }

        // PUT: DelOrder/1
        [HttpPut]
        [Route("delOrder/{orderId}")]
        public async Task<ActionResult> DelrOder(int orderId)
        {
            var data = await _orderService.DelOrder(orderId);
            if (data == null)
            {
                return BadRequest("Not found");
            }
            else if (data.Equals("true"))
            {
                return Ok("Delete Successfully");
            }
            return BadRequest(data);
        }
    }
}
