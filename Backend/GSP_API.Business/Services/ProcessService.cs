using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSP_API.Business.Services
{
    public class ProcessService
    {
        private readonly IProcessRepository _processRepository;

        public ProcessService(
            IProcessRepository processRepository)
        {
            _processRepository = processRepository;
        }

        public async Task<List<Process>> GetAllProcesses()
        {
            return await _processRepository.GetAll(p => p.Status == "Active");
        }

        public async Task<Process> GetProcessById(int processId)
        {
            return await _processRepository.GetById(p => p.ProcessId == processId);
        }

        public async Task<string> AddProcess(Process process)
        {
            return await _processRepository.Add(process);
        }

        public async Task<string> UpdateProcess(Process newProcess)
        {
            var data = await _processRepository.FindFirst(p => p.ProcessId == newProcess.ProcessId);
            if (data != null)
            {
                return await _processRepository.Update(newProcess);
            }
            return null;
        }

        public async Task<string> DelProcess(int processId)
        {
            var data = await _processRepository.GetById(p => p.ProcessId == processId);
            if (data != null)
            {
                data.Status = "Inactive";
                return await _processRepository.Update(data);
            }
            return null;
        }
    }
}
