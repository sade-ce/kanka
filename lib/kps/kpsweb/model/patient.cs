using System;
namespace kpsweb{



    public class Patient:BaseModel{

        public long KimlikNo { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string MotherName { get; set; }
        public long MotherTc { get; set; }
        public string FatherName { get; set; }
        public long FatherTc { get; set; }
        public bool sex {get;set;}
        public DateTime birthday { get; set; }
        public string BirthPlace { get; set; }
        public bool Married { get; set; }
        public string status { get; set; }


    }
}