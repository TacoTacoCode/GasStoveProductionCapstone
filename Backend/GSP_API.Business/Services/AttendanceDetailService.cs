using GSP_API.Domain.Repositories.Models;
using GSP_API.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GSP_API.Business.Services
{
    public class AttendanceDetailService
    {
        private readonly IAttendanceDetailRepository _attendanceDetailRepository;
        private readonly IAttendanceRepository _attendanceRepository;

        public AttendanceDetailService(
            IAttendanceDetailRepository attendanceDetailRepository, IAttendanceRepository attendanceRepository)
        {
            _attendanceDetailRepository = attendanceDetailRepository;
            _attendanceRepository = attendanceRepository;
        }

        public async Task<List<AttendanceDetail>> GetAttendanceDetailByAttendance(int attendanceId)
        {
            return await _attendanceDetailRepository
                .GetAttendanceDetailByAttendance(p => p.AttendanceId == attendanceId);
        }

        public async Task<AttendanceDetail> GetAttendanceDetailById(int attendanceDetailId)
        {
            return await _attendanceDetailRepository.GetById(p => p.AttendanceDetailId == attendanceDetailId);
        }

        public async Task<List<AttendanceDetail>> GetAttendanceDetail(int accountId, DateTime date)
        {
            try
            {
                var attendace = await _attendanceRepository.FindFirst(e => e.AccountId == accountId 
                                                                    && (e.CheckDate.Equals(date) 
                                                                    || e.CheckDate.Equals(date.AddMonths(-1))));
                if (attendace == null)
                    return new List<AttendanceDetail>();
                var data = await _attendanceDetailRepository.GetAll(p => p.AttendanceId == attendace.AttendanceId);
                return data;
            }
            catch (Exception ex)
            {
                return null;
            }

        }

        public async Task<string> AddAttendanceDetail(AttendanceDetail attendanceDetail)
        {
            return await _attendanceDetailRepository.Add(attendanceDetail);
        }

        public async Task<string> UpdateAttendanceDetail(AttendanceDetail newAttendanceDetail)
        {

            var data = await _attendanceDetailRepository.FindFirst(p => p.AttendanceDetailId == newAttendanceDetail.AttendanceDetailId);
            if (data != null)
            {
                return await _attendanceDetailRepository.Update(newAttendanceDetail);
            }
            return null;
        }

        public async Task<string> DelAttendanceDetail(int attendanceDetailId)
        {
            var data = await _attendanceDetailRepository.GetById(p => p.AttendanceDetailId == attendanceDetailId);
            if (data != null)
            {
                //data.Status = "Inactive";
                return await _attendanceDetailRepository.Update(data);
            }
            return null;
        }
    }
}
