using backend.Models;
using backend.ViewModels;

namespace backend.Services.Interfaces
{
    public interface ICountryService : ICrudService<Country, CountryFilter>
    {
    }
}