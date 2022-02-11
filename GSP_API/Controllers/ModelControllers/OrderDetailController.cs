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
    public class OrderDetailController : ControllerBase
    {
        private readonly OrderDetailService _orderDetailService;
        private readonly IMapper _mapper;

        public OrderDetailController(
             OrderDetailService orderDetailService,
             IMapper mapper)
        {
            _orderDetailService = orderDetailService;
            _mapper = mapper;
        }

        // GET: getOrderDetailOfs/ord/1
        [HttpGet]
        [Route("getOrderDetailsOf/ord/{orderId}")]
        public async Task<ActionResult<List<OrderResponse>>> GetAllOrders(int orderId)
        {
            var data = await _orderDetailService.GetOrderDetailsByOrder(orderId);
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var list = _mapper.Map<List<OrderResponse>>(data);
            return Ok(list);
        }

        // GET: getOrderDetail/1
        [HttpGet]
        [Route("getOrderDetail/{orderDetailId}")]
        public async Task<ActionResult<OrderDetailResponse>> GetOrderDetailById(int orderDetailId)
        {
            var data = await _orderDetailService.GetOrderDetailById(orderDetailId);
            if (data == null)
            {
                return BadRequest("Not found");
            }
            var orderDetail = _mapper.Map<OrderDetailResponse>(data);
            return Ok(orderDetail);
        }

        // POST: AddOrderDetail/[orderDetail]
        [HttpPost]
        [Route("addOrderDetail")]
        public async Task<ActionResult> AddAOrderDetail([FromBody] OrderDetailRequest orderDetailRequest)
        {
            var data = await _orderDetailService.AddOrderDetail(_mapper.Map<OrderDetail>(orderDetailRequest));
            if (data == null)
            {
                return BadRequest("Not Found");
            }
            return Ok("Add successfully");
        }

        // PUT: UpdateOrderDetail/1
        [HttpPut]
        [Route("updateOrderDetail/{orderDetailId}")]
        public async Task<ActionResult> UpdateOrderDetail(int orderDetailId, [FromBody] OrderDetailRequest orderDetailRequest)
        {
            var data = await _orderDetailService.UpdateOrderDetail(orderDetailId, _mapper.Map<OrderDetail>(orderDetailRequest));
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

        // PUT: DelOrderDetail/1
        [HttpPut]
        [Route("delOrderDetail/{orderDetailId}")]
        public async Task<ActionResult> DelOrderDetail(int orderDetailId)
        {
            var data = await _orderDetailService.DelOrderDetail(orderDetailId);
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

        //private bool AccountExists(string id)
        //{
        //    return _context.Account.Any(e => e.AccountId == id);
        //}
    }
}
