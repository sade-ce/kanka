using System;
using System.IO;
using Microsoft.Extensions.Configuration;
using System.Text;
 
namespace kpsAngular
{
    public class KpsService
    {
       public KpsService(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }


        public Patient Sorgula()
        {
            var usernameConfig = Configuration["appSettings:KpsUserName"];
            var passwordConfig = Configuration["appSettings:KpsPassword"];
            var sorgulayanConfig = Configuration["appSettings:SorgulayanKimlikNo"];
            Console.WriteLine(usernameConfig);

            string tcNo = "18304638676";

            KPSRequestHelper kpsRequestHelper = new KPSRequestHelper();
            long sorgulayanKimlikNo;
            long sorgulanacakKimliNo;
            long.TryParse(tcNo, out sorgulanacakKimliNo);
            long.TryParse(sorgulayanConfig, out sorgulayanKimlikNo);
            string username = usernameConfig;
            string password = passwordConfig;
            Console.WriteLine(username+ "------------------");
            //send request to kps service with test user
            return  kpsRequestHelper.BilesikKisiveAdresSorgula(sorgulanacakKimliNo, sorgulayanKimlikNo, username, password);
              
               
              
          
            
            
            
            
        }


    }
}  