﻿using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace GSP_API.Domain.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<string> Add(T entity);
        Task<string> Delete(T entity);
        Task<string> Update(T entity);
        Task<List<T>> GetAll(Expression<Func<T, bool>> expression);
        Task<T> GetById(Expression<Func<T, bool>> expression);
        Task<T> FindById(Expression<Func<T, bool>> expression);
    }
}
