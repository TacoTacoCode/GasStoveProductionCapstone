using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GSP_API.Business.Services;
using AutoMapper;
using GSP_API.Models.Response;
using GSP_API.Models.Request;
using GSP_API.Domain.Repositories.Models;

namespace GSP_API.Controllers.ModelControllers
{
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly CartService _cartService;
        private readonly IMapper _mapper;
        public CartController(CartService cartService, IMapper mapper)
        {
            _cartService = cartService;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getCartById/{cartId}")]
        public async Task<ActionResult<CartResponse>> GetCartById(int cartId)
        {
            var data = await _cartService.GetCartById(cartId);
            if (data == null)
            {
                return BadRequest("Not Found");
            }
            var account = _mapper.Map<CartResponse>(data);
            return Ok(account);
        }

        [HttpGet]
        [Route("getCartByAccountId/{accountId}")]
        public async Task<ActionResult<CartResponse>> GetCartByAccountId(int accountId)
        {
            var data = await _cartService.GetCartByAccountId(accountId);
            if (data == null)
            {
                return BadRequest("Not Found");
            }
            var account = _mapper.Map<CartResponse>(data);
            return Ok(account);
        }

        [HttpPost]
        [Route("addCart")]
        public async Task<ActionResult> AddCart([FromBody] CartRequest cartRequest)    
        {
            var data = await _cartService.AddCart(_mapper.Map<Cart>(cartRequest));
            if (data == null)
            {
                return BadRequest("Not Found");
            }
            return Ok("Add successfully");
        }

        [HttpPut]
        [Route("updateAttendance")]
        public async Task<ActionResult> UpdateCart([FromBody] CartRequest cartRequest)
        {
            var data = await _cartService.UpdateCart(_mapper.Map<Cart>(cartRequest));
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

    }
}
