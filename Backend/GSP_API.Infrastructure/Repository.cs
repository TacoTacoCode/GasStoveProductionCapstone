using GSP_API.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace GSP_API.Infrastructure
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private DbFactory _dbFactory;
        private DbSet<T> _dbSet;

        protected DbSet<T> DbSet
        {
            get => _dbSet ?? (_dbSet = _dbFactory.DbContext.Set<T>());
        }

        public Repository(DbFactory dbFactory)
        {
            _dbFactory = dbFactory;
        }

        public async Task<string> Add(T entity)
        {
            try
            {
                await DbSet.AddAsync(entity);
                await _dbFactory.DbContext.SaveChangesAsync();
                return "true";
            }
            catch (Exception e)
            {
                await _dbFactory.DbContext.DisposeAsync();
                return e.Message.ToString();
            }
        }
        public async Task<T> Add2(T entity)
        {
            try
            {
                var task = await DbSet.AddAsync(entity);
                await _dbFactory.DbContext.SaveChangesAsync();
                return task.Entity;
            }
            catch
            {
                await _dbFactory.DbContext.DisposeAsync();
                return null;
            }
        }
        public async Task<string> Delete(T entity)
        {
            try
            {
                DbSet.Remove(entity);
                await _dbFactory.DbContext.SaveChangesAsync();
                return "true";
            }
            catch (Exception e)
            {
                await _dbFactory.DbContext.DisposeAsync();
                return e.Message.ToString();
            }
        }

        public async Task<string> Update(T entity)
        {
            try
            {
                DbSet.Update(entity);
                await _dbFactory.DbContext.SaveChangesAsync();
                return "true";
            }
            catch (Exception e)
            {
                await _dbFactory.DbContext.DisposeAsync();
                return e.Message.ToString();
            }
        }

        public async Task<List<T>> GetAll(Expression<Func<T, bool>> expression)
        {
            var data = await DbSet.Where(expression).ToListAsync();
            return data;
        }

        public async Task<T> GetById(Expression<Func<T, bool>> expression)
        {
            return await DbSet.Where(expression).FirstOrDefaultAsync();
        }

        public async Task<T> FindFirst(Expression<Func<T, bool>> expression)
        {
            return await DbSet.Where(expression).AsNoTracking().FirstOrDefaultAsync();
        }
        public async Task<List<T>> FindAll(Expression<Func<T, bool>> expression)
        {
            return await DbSet.Where(expression).AsNoTracking().ToListAsync<T>();
        }
        public async Task<string> AddRange(List<T> entites)
        {
            try
            {
                await DbSet.AddRangeAsync(entites);
                await _dbFactory.DbContext.SaveChangesAsync();
                return "true";
            }
            catch (Exception e)
            {
                await _dbFactory.DbContext.DisposeAsync();
                return e.Message.ToString();
            }
        }

        public async Task<string> RemoveRange(List<T> entites)
        {
            try
            {
                DbSet.RemoveRange(entites);
                await _dbFactory.DbContext.SaveChangesAsync();
                return "true";
            }
            catch (Exception e)
            {
                await _dbFactory.DbContext.DisposeAsync();
                return e.Message.ToString();
            }
        }
    }
}
