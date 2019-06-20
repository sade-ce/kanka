using System.Threading.Tasks;
using System.Collections.Generic;
using backend.Models;
using backend.ViewModels;

namespace backend.Services.Interfaces
{
    public interface IUserService
    {
         Task<ProcessResult<List<UserViewModel>>> GetListAsync(string sortOrder, string searchString, int pageIndex,  int pageSize);
         Task<ProcessResult<int>> CountAsync(string searchString);
    }
}