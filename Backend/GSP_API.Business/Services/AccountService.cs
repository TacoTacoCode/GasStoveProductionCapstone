using GSP_API.Domain.Interfaces;
using GSP_API.Domain.Repositories.Models;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using GSP_API.Business.Extensions;
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
            var accounts =  await _accountRepository.GetAll(p => p.AccountId != 0);
            return accounts;
        }

        public async Task<Account> GetAccountById(int accountId)
        {
            return await _accountRepository.GetById(p => p.AccountId == accountId);
        }

        public async Task<List<Account>> GetAccountBySectionId(int sectionId)
        {
            return await _accountRepository.GetAll(p => p.SectionId == sectionId);
        }

        public async Task<Account> GetAccountByEmail(string email)
        {
            return await _accountRepository.GetById(p => p.Email == email);
        }

        public async Task<Account> GetAccountByPhone(string phone)
        {
            return await _accountRepository.GetById(p => p.Phone == phone);
        }

        public async Task<Account> GetAccountByNamePhone(string name, string phone)
        {
            return await _accountRepository.GetById(p => p.Name == name && p.Phone == phone);
        }

        public async Task<string> AddAccount(Account account, Stream fileStream, string fileName)
        {
            if(account.Password != null)
            {
                var hassPw = GSP_API.Business.Extensions.Hash.ComputeSha256Hash(account.Password);
                account.Password = hassPw;
            }
            var imageUrl = fileName;
            if (fileStream != null)
            {
                try
                {
                    imageUrl = await FireBaseUtil.Upload(fileStream, fileName);
                    imageUrl = imageUrl.Substring(imageUrl.IndexOf("%2F") + 3);
                }
                catch (System.Exception ex)
                {
                    return ex.Message;
                }   
            }
            account.AvatarUrl = imageUrl;
            return await _accountRepository.Add(account);
        }

        public async Task<string> UpdateAccount(Account newAccount, Stream fileStream, string fileName)
        {
            var imageUrl = "";
            if (fileStream != null)
            {
                try
                {
                    imageUrl = await FireBaseUtil.Upload(fileStream, fileName);
                    newAccount.AvatarUrl = imageUrl.Substring(imageUrl.IndexOf("%2F") + 3);
                }
                catch (System.Exception ex)
                {
                    return ex.Message;
                }
            }
            var data = await _accountRepository.FindFirst(p => p.AccountId == newAccount.AccountId);
            if (data != null)
            {
                if(newAccount.Password == null)
                {
                    newAccount.Password = data.Password;
                }
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

        public async Task<IDictionary<int, Account>> AddRangeAccount(List<Account> accounts)
        {
            var returnDic = new Dictionary<int, Account>();
            var addList = new List<Account>();
            foreach (var pro in accounts)
            {
                var tmp = await GetAccountByNamePhone(pro.Name, pro.Phone);
                if (tmp != null)
                {
                    returnDic.Add(accounts.IndexOf(pro) + 1, pro);
                }
                else
                {
                    pro.Password = GSP_API.Business.Extensions.Hash.ComputeSha256Hash(pro.Password);
                    addList.Add(pro);
                }
            }
            await _accountRepository.AddRange(addList);
            return returnDic;
        }
    }
}
