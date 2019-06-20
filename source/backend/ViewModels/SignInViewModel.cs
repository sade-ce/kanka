using System.ComponentModel.DataAnnotations;

namespace backend.ViewModels
{
    public class SignInViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}