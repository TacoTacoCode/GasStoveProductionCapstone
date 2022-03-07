using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSP_API.Business.Services
{
    public class RoleService
    {
        private readonly IRoleRepository _roleRepository;

        public RoleService(
            IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        public async Task<List<Role>> GetAllRoles()
        {
            return await _roleRepository.GetAll(p => p.Status == "Active");
        }

        public async Task<Role> GetRoleByAccount(Account account)
        {
            return await _roleRepository.GetById(p => p.RoleId == account.RoleId);
        }

        public async Task<string> AddRole(Role role)
        {
            return await _roleRepository.Add(role);
        }

        public async Task<string> UpdateRole(Role newRole)
        {
            var data = await _roleRepository.FindById(p => p.RoleId == newRole.RoleId);
            if (data != null)
            {
                return await _roleRepository.Update(newRole);
            }
            return null;
        }

        public async Task<string> DelRole(string roleId)
        {
            var data = await _roleRepository.GetById(p => p.RoleId == roleId);
            if (data != null)
            {
                //data.IsActive = false;
                return await _roleRepository.Update(data);
            }
            return null;
        }
    }
}
