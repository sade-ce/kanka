using System.Threading.Tasks;
using backend.Models;
using backend.ViewModels;

namespace backend.Services.Interfaces
{
    public interface IProfileService
    {
         Task<ProcessResult<ProfileViewModel>> GetProfileAsync();
        
    }
}