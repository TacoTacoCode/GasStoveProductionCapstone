using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using GSP_API.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GSP_API.Business.Services
{
    public class ImExItemService
    {
        private  readonly IImExItemRepository _imExRepository;

        public ImExItemService(IImExItemRepository imExRepository)
        {
            _imExRepository = imExRepository;
        }

        public async Task<string> Add(ImExItem imExItem)
        {
            var data = await _imExRepository.Add(imExItem);
            return data;
        }
    }
}
