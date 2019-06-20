using System.Collections.Generic;
using backend.Models;
 
namespace backend.Services.Interfaces
{
    public interface ITokenService
    {
        string Generate(ApplicationUser user, List<string> roles);
    }
}