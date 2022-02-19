using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace GSP_API.Infrastructure.Repositories
{
    public class AttendanceRepository : Repository<Attendance>, IAttendanceRepository
    {
        public AttendanceRepository(DbFactory dbFactory) : base(dbFactory)
        {
        }

        public async Task<List<Attendance>> GetAttendanceBySection(Expression<Func<Attendance, bool>> expression)
        {
            return await DbSet.Where(expression).ToListAsync();
        }
    }
}
