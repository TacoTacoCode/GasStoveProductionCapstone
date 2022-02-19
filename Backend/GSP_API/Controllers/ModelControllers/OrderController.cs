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
            var data = await _orderService.AddOrder(_mapper.Map<Order>(orderRequest));
            if (data == null)
            {
                return BadRequest("Not Found");
            }
            return Ok("Add successfully");
        }

        // PUT: UpdateOrder/1
        [HttpPut]
        [Route("updateOrder/{orderId}")]
        public async Task<ActionResult> UpdateOrder(int orderId, [FromBody] OrderRequest orderRequest)
        {
            var data = await _orderService.UpdateOrder(orderId, _mapper.Map<Order>(orderRequest));
            if (data.Equals(null))
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
            if (data.Equals(null))
            {
                return BadRequest("Not found");
            }
            else if (data.Equals("true"))
            {
                return Ok("Delete Successfully");
            }
            return BadRequest(data);
        }

        //private bool AccountExists(string id)
        //{
        //    return _context.Account.Any(e => e.AccountId == id);
        //}
    }
}
