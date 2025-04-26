using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;

namespace dotnetapp.Services
{
    public interface IAccountService
    {
        IEnumerable<Account> GetAllAccounts();

        Account GetAccountById(int id);

        Account CreateAccount(Account account);

        bool DeleteAccount(int id);

        IEnumerable<Account> GetAccountsByUserId(int userId);

    }
}