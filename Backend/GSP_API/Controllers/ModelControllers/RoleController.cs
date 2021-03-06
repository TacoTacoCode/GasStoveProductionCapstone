using AutoMapper;
using GSP_API.Models.Request;
using GSP_API.Business.Services;
using GSP_API.Domain.Repositories.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSP_API.Controllers.ModelControllers
{
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly RoleService _roleService;
        private readonly IMapper _mapper;

        public RoleController(
             RoleService roleService,
             IMapper mapper)
        {
            _roleService = roleService;
            _mapper = mapper;
        }

        // GET: getRoles
        [HttpGet]
        [Route("getRoles")]
        public async Task<ActionResult<List<Role>>> GetAllRoles()
        {
            var data = await _roleService.GetAllRoles();
            if (data == null)
            {
                return NotFound();
            }
            return Ok(data);
        }

        // POST: AddRole/[role]
        [HttpPost]
        [Route("addRole")]
        public async Task<ActionResult> AddRole([FromBody] RoleRequest roleRequest)
        {
            var data = await _roleService.AddRole(_mapper.Map<Role>(roleRequest));
            if (data == null)
            {
                return BadRequest("Not Found");
            }
            return Ok("Add successfully");
        }

        // PUT: UpdateRole
        [HttpPut]
        [Route("updateRole")]
        public async Task<ActionResult> UpdateRole([FromBody] RoleRequest roleRequest)
        {
            var data = await _roleService.UpdateRole(_mapper.Map<Role>(roleRequest));
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

        // PUT: DelRole
        [HttpPut]
        [Route("delRole/{roleId}")]
        public async Task<ActionResult> DelRole(string roleId)
        {
            var data = await _roleService.DelRole(roleId);
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
