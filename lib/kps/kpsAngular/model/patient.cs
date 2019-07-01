using System;
namespace kpsAngular{



    public class Patient:BaseModel{ 
 
public Patient()
{
    Address=new Address();
}
        public string Name { get; set; }
        public string Surname { get; set; }
        public string MotherName { get; set; }
        public long MotherTc { get; set; }
        public string FatherName { get; set; }
        public long FatherTc { get; set; }
        public string sex {get;set;}
        public DateTime? Birthday { get; set; }
        public string BirthPlace { get; set; }
        public string Married { get; set; }
        public string status { get; set; }
        public DateTime? DeathDate{get;set;}

        public virtual Address   Address  {get;set;}

    }
}