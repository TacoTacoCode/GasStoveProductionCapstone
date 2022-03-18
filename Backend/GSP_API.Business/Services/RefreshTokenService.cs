using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GSP_API.Business.Services
{
    public class RefreshTokenService
    {
        private readonly IRefreshTokenRepository _refreshTokenRepository;

        public RefreshTokenService(
            IRefreshTokenRepository refreshTokenRepository)
        {
            _refreshTokenRepository = refreshTokenRepository;
        }  

        public async Task<RefreshToken> GetRefreshTokenById(int refreshTokenId)
        {
            return await _refreshTokenRepository.GetById(p => p.Id == refreshTokenId);
        }

        public async Task<RefreshToken> GetRefreshTokenByToken(string token)
        {
            return await _refreshTokenRepository.GetById(p => p.Token == token);
        }

        public async Task<string> AddRefreshToken(RefreshToken refreshToken)
        {
            return await _refreshTokenRepository.Add(refreshToken);
        }

        public async Task<string> UpdateRefreshToken(RefreshToken newRefreshToken)
        {
            var data = await _refreshTokenRepository.FindFirst(p => p.Id == newRefreshToken.Id);
            if (data != null)
            {
                return await _refreshTokenRepository.Update(newRefreshToken);
            }
            return null;
        }

        //public async Task<string> DelRefreshToken(string refreshTokenId)
        //{
        //    var data = await _refreshTokenRepository.GetById(p => p.Id == refreshTokenId);
        //    if (data != null)
        //    {
        //        data.Status = "Inactive";
        //        return await _refreshTokenRepository.Update(data);
        //    }
        //    return null;
        //}
    }
}
