using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GSP_API.Business.Services
{
    public class AccountService
    {
        private readonly IAccountRepository _accountRepository;

        public AccountService(
            IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }

        public async Task<List<Account>> GetActiveAccount()
        {
            return await _accountRepository.GetAll(p => p.IsActive == true);
        }

        public async Task<List<Account>> GetAllAccounts()
        {
            return await _accountRepository.GetAll(p => p.AccountId != 0);
        }

        public async Task<Account> GetAccountById(int accountId)
        {
            return await _accountRepository.GetById(p => p.AccountId == accountId);
        }

        public async Task<Account> GetAccountByEmail(string email)
        {
            return await _accountRepository.GetById(p => p.Email == email);
        }

        public async Task<Account> GetAccountByPhone(string phone)
        {
            return await _accountRepository.GetById(p => p.Phone == phone);
        }

        public async Task<string> AddAccount(Account account)
        {
            return await _accountRepository.Add(account);
        }

        public async Task<string> UpdateAccount(Account newAccount)
        {
            var data = await _accountRepository.FindFirst(p => p.AccountId == newAccount.AccountId);
            if (data != null)
            {
                return await _accountRepository.Update(newAccount);
            }
            return null;
        }

        public async Task<string> DelAccount(int accountId)
        {
            var data = await _accountRepository.GetById(p => p.AccountId == accountId);
            if (data != null)
            {
                Account delAccount = data;
                delAccount.IsActive = false;
                return await _accountRepository.Update(delAccount);
            }
            return null;
        }
    }
}
