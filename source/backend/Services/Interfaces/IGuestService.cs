using backend.Models;
using backend.ViewModels;

namespace backend.Services.Interfaces
{
    public interface IGuestService : ICrudService<Guest, GuestFilter>
    {
    }
}