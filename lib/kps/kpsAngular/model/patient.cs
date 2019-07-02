using System;
namespace kpsAngular{



    public class Patient:BaseModel{ 
 
public Patient()
{
    Address=new Address();
} 
        public long KimlikNo { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string MotherName { get; set; }
        public long MotherTc { get; set; }
        public string FatherName { get; set; }
        public long FatherTc { get; set; }
        public string sex {get;set;}
        public DateTime? Birth_at { get; set; }
        public string Birth_in { get; set; }
        public string Married { get; set; }
        public string status { get; set; }
        public DateTime? DeathDate{get;set;}

        public virtual Address   Address  {get;set;}

    }
}