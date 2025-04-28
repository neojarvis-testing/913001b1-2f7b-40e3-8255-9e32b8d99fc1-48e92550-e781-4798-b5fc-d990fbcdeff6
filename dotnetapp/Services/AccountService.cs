using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Data;

namespace dotnetapp.Services
{
    public class AccountService : IAccountService
    {
        private readonly ApplicationDbContext _context;

        public AccountService(ApplicationDbContext context)
        {
            _context = context;
        }

        public Account CreateAccount(Account account)
        {
            account.Status = "InActive";
            account.DateCreated = DateTime.Now;
            account.LastUpdated = DateTime.Now;
            _context.Accounts.Add(account);
            _context.SaveChanges();
            return account;
        }

        public Account GetAccountById(int accountId)
        {
            //return _context.Accounts.Find(accountId);

            var account = _context.Accounts.FirstOrDefault(a => a.AccountId == accountId);
            if(account == null)
            {
                return null;
            }
            return account;
        }

        public IEnumerable<Account> GetAllAccounts()
        {
            return _context.Accounts.ToList();
        }

        public IEnumerable<Account> GetAccountsByUserId(int userId)
        {
            return _context.Accounts.Where(a => a.UserId == userId).ToList();
        }

        public Account UpdateAccount(int accountId,Account updatedAccount)
        {
            var account = _context.Accounts.Find(accountId);
            if(account == null)
            {
                return null;
            }
            else{
                account.Balance = updatedAccount.Balance;
                account.Status = updatedAccount.Status;
                account.LastUpdated = DateTime.Now;
                _context.SaveChanges();
                return account;
            }
        }

        public bool DeleteAccount(int accountId)
        {
            var account = _context.Accounts.Find(accountId);
            if(account == null)
            {
                return false;
            }
            else{
                _context.Accounts.Remove(account);
                _context.SaveChanges();
                return true;
            }
        }
    }
}