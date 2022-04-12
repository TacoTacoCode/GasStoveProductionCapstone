using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GSP_API.Business.Services
{
    public class CartService
    {
        private readonly ICartRepository _cartRepository;

        public CartService(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        public async Task<Cart> GetCartById(int cartId)
        {
            return await _cartRepository.FindFirst(p => p.CartId == cartId);
        }

        public async Task<string> AddCart(Cart cart)
        {
            var data = await _cartRepository.Add(cart);
            return data;
        }

        public async Task<string> UpdateCart(Cart newCart)
        {
            var oldCart = await _cartRepository.FindFirst(c => c.CartId == newCart.CartId);
            if (oldCart == null) {
                return "Error: Dont have this cart";
            }
            var data = await _cartRepository.Add(newCart);
            return data;
        }

        public async Task<Cart> GetCartByAccountId(int accountId)
        {
            var cart = await _cartRepository.FindFirst(c => c.AccountId == accountId);
            if (cart == null)
            {
                cart = new Cart()
                {
                    AccountId = accountId,
                };
                await _cartRepository.Add(cart);
            }
            return cart;
        }
    }
}
