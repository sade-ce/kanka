using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    public class ApplicationUser : IdentityUser<long>
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
                
    }
}