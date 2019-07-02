using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace kpsAngular.Controllers
{
    [Route("api/[controller]")]
    public class KpsServiceController:Controller

    
    {

          public KpsServiceController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        [HttpGet("[action]")]
        public Patient GetPatient()
        {
            KpsService ser=new KpsService(Configuration);
          return  ser.Sorgula();
        }
        
    }
}