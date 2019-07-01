namespace ExtensionMethods {
    using System;
    using System.Globalization;

/*  kullanımı
           var mydate = "29021996";
            var date = mydate.ToDateTime(format: "ddMMyyyy") 
            
            
            
               var mydate = "31/1/1996";
            var date = mydate.ToDateTime(format:"d/M/yyyy");
            
            */


    public static class DateTimeExtensions {
        public static DateTime ToDateTime(this string s, 
                  string format = "ddMMyyyy", string cultureString = "tr-TR") {
            try {
                var r = DateTime.ParseExact(
                    s: s,
                    format: format,
                    provider: CultureInfo.GetCultureInfo(cultureString));
                return r;
            } catch (FormatException) {
                throw;
            } catch (CultureNotFoundException) {
                throw; // Given Culture is not supported culture
            }
        }

        public static DateTime ToDateTime(this string s, 
                    string format, CultureInfo culture) {
            try {
                var r = DateTime.ParseExact(s: s, format: format, 
                                        provider: culture);
                return r;
            } catch (FormatException) {
                throw;
            } catch (CultureNotFoundException) {
                throw; // Given Culture is not supported culture
            }

        }

    }
}

 