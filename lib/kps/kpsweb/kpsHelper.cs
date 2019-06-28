using System;
using System.IO;
using Microsoft.Extensions.Configuration;
using System.Text;
 
namespace kpsweb
{
    public class KpsService
    {
       public KpsService(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }


        public void Sorgula()
        {
            var usernameConfig = Configuration["appSettings:KpsUserName"];
            var passwordConfig = Configuration["appSettings:KpsPassword"];
            var sorgulayanConfig = Configuration["appSettings:SorgulayanKimlikNo"];
            Console.WriteLine(usernameConfig);

            string tcNo = "10711897622";

            KPSRequestHelper kpsRequestHelper = new KPSRequestHelper();
            long sorgulayanKimlikNo;
            long sorgulanacakKimliNo;
            long.TryParse(tcNo, out sorgulanacakKimliNo);
            long.TryParse(sorgulayanConfig, out sorgulayanKimlikNo);
            string username = usernameConfig;
            string password = passwordConfig;
            Console.WriteLine(username+ "------------------");
            //send request to kps service with test user
            var result = kpsRequestHelper.BilesikKisiveAdresSorgula(sorgulanacakKimliNo, sorgulayanKimlikNo, username, password);
              
               Console.WriteLine(result+result.Soyad);
              
          
            
            
            
            
        }


    }
}  