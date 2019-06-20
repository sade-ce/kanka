using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Http;

namespace backend.Services.Interfaces
{
    public interface IFileService
    {
         Task<ProcessResult<string>> UploadAsync(IFormFile file);
    }
}