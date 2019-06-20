namespace backend.Models
{
    public class Guest : BaseModel
    {
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Identification { get; set; }

 
        public long CountryID { get; set; }
        public Country Country { get; set; }

        
    }
}