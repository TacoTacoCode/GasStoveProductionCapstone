﻿using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSP_API.Business.Services
{
    public class ProcessDetailService
    {
        private readonly IProcessDetailRepository _processDetailRepository;

        public ProcessDetailService(
            IProcessDetailRepository processDetailRepository)
        {
            _processDetailRepository = processDetailRepository;
        }

        public async Task<List<ProcessDetail>> GetAllProcessDetailes()
        {
            return await _processDetailRepository.GetAll(p => p.Status == "1");
        }

        public async Task<ProcessDetail> GetProcessDetailById(int processDetailId)
        {
            return await _processDetailRepository.GetById(p => p.ProcessDetailId == processDetailId);
        }

        public async Task<string> AddProcessDetail(ProcessDetail processDetail)
        {
            return await _processDetailRepository.Add(processDetail);
        }

        public async Task<string> UpdateProcessDetail(ProcessDetail newProcessDetail)
        {
            var data = await _processDetailRepository.FindById(p => p.ProcessDetailId == newProcessDetail.ProcessDetailId);
            if (data != null)
            {
                return await _processDetailRepository.Update(newProcessDetail);
            }
            return null;
        }

        public async Task<string> UpdateProcessDetailbyImEx(ProcessDetail newProcessDetail)
        {
            var data = await _processDetailRepository.FindById(p => p.ProcessDetailId == newProcessDetail.ProcessDetailId);
            if (data != null)
            {
                return await _processDetailRepository.Update(newProcessDetail);
            }
            return null;
        }

        public async Task<string> DelProcessDetail(int processDetailId)
        {
            var data = await _processDetailRepository.GetById(p => p.ProcessDetailId == processDetailId);
            if (data != null)
            {
                data.Status = "Inactive";
                return await _processDetailRepository.Update(data);
            }
            return null;
        }
    }
}