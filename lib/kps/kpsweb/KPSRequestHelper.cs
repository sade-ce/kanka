using System;
using System.IO;
using System.Net;
using System.Text;
using System.Xml;
using ExtensionMethods;

namespace kpsweb
{
    public class KPSRequestHelper
    {

        private string token = "";
        private DateTime tokenExpires = DateTime.Now.AddMinutes(-1);

        //Gerçek Ortam
        private string kpsUrl = "https://kpsv2.saglik.gov.tr/Router/RoutingService.svc";
        private string stsUrl = "https://kpsv2.saglik.gov.tr/STS/STSService.svc";

        //Test Ortamı
        private string kpsTestUrl = "https://kpsv2test.saglik.gov.tr/Router/RoutingService.svc";
        private string stsTestUrl = "https://kpsv2test.saglik.gov.tr/STS/STSService.svc";

        /// <summary>
        /// 
        /// </summary>
        /// <param name="kimlikNo"></param>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public XmlDocument BilesikKisiSorgula(long kimlikNo, long sorgulayanKimlikNo, string userName, string password)
        {
            string token = GetSTSToken(sorgulayanKimlikNo, userName, password);

            Console.WriteLine("sending kps request....");

            var now = DateTime.Now;
            string created = now.AddMinutes(-1).ToUniversalTime().ToString("o");
            string expires = now.AddMinutes(5).ToUniversalTime().ToString("o");

            StringBuilder xml = new StringBuilder();
            xml.Append("<s:Envelope xmlns:s=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:a=\"http://www.w3.org/2005/08/addressing\" xmlns:u=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\">");

            xml.Append("<s:Header>");
            xml.Append("<a:Action s:mustUnderstand=\"1\">https://www.saglik.gov.tr/KPS/01/01/2017/IKpsServices/BilesikKisiSorgula</a:Action>");
            xml.Append("<a:MessageID>urn:uuid:" + Guid.NewGuid() + "</a:MessageID>");
            xml.Append("<a:ReplyTo>");
            xml.Append("<a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address>");
            xml.Append("</a:ReplyTo>");

            xml.Append("<a:To s:mustUnderstand=\"1\">" + kpsTestUrl + "</a:To>");
            xml.Append("<o:Security s:mustUnderstand=\"1\" xmlns:o=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\">");
            xml.Append("<u:Timestamp u:Id=\"_0\">");
            xml.Append("<u:Created>" + created + "</u:Created>");
            xml.Append("<u:Expires>" + expires + "</u:Expires>");
            xml.Append("</u:Timestamp>");


            // token
            xml.Append(token);


            xml.Append("</o:Security>");
            xml.Append("</s:Header>");
            xml.Append("<s:Body>");
            xml.Append("<BilesikKisiSorgula xmlns=\"https://www.saglik.gov.tr/KPS/01/01/2017\">");
            xml.Append("<kimlikNo>" + kimlikNo + "</kimlikNo>");
            xml.Append("</BilesikKisiSorgula>");
            xml.Append("</s:Body>");
            xml.Append("</s:Envelope>");


            string envelopeString = xml.ToString();

            var result = SendSoapRequest(envelopeString, kpsTestUrl);

            Console.WriteLine("kps request SUCCESS");

            return result;
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="kimlikNo"></param>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public BilesikKisiveAdresSorgulaModel KimlikNoIleAdresBilgisiSorgula(long kimlikNo, long sorgulayanKimlikNo, string userName, string password)
        {
            string token = GetSTSToken(sorgulayanKimlikNo, userName, password);

            Console.WriteLine("sending kps request....");

            var now = DateTime.Now;
            string created = now.AddMinutes(-1).ToUniversalTime().ToString("o");
            string expires = now.AddMinutes(5).ToUniversalTime().ToString("o");

            StringBuilder xml = new StringBuilder();
            xml.Append("<s:Envelope xmlns:s=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:a=\"http://www.w3.org/2005/08/addressing\" xmlns:u=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\">");

            xml.Append("<s:Header>");
            xml.Append("<a:Action s:mustUnderstand=\"1\">https://www.saglik.gov.tr/KPS/01/01/2017/IKpsServices/KimlikNoIleAdresBilgisiSorgula</a:Action>");
            xml.Append("<a:MessageID>urn:uuid:" + Guid.NewGuid() + "</a:MessageID>");
            xml.Append("<a:ReplyTo>");
            xml.Append("<a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address>");
            xml.Append("</a:ReplyTo>");

            xml.Append("<a:To s:mustUnderstand=\"1\">" + kpsTestUrl + "</a:To>");
            xml.Append("<o:Security s:mustUnderstand=\"1\" xmlns:o=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\">");
            xml.Append("<u:Timestamp u:Id=\"_0\">");
            xml.Append("<u:Created>" + created + "</u:Created>");
            xml.Append("<u:Expires>" + expires + "</u:Expires>");
            xml.Append("</u:Timestamp>");


            // token
            xml.Append(token);


            xml.Append("</o:Security>");
            xml.Append("</s:Header>");
            xml.Append("<s:Body>");
            xml.Append("<KimlikNoIleAdresBilgisiSorgula xmlns=\"https://www.saglik.gov.tr/KPS/01/01/2017\">");
            xml.Append("<kimlikNo>" + kimlikNo + "</kimlikNo>");
            xml.Append("</KimlikNoIleAdresBilgisiSorgula>");
            xml.Append("</s:Body>");
            xml.Append("</s:Envelope>");


            string envelopeString = xml.ToString();

            var result = SendSoapRequest(envelopeString, kpsTestUrl);

            Console.WriteLine("kps request SUCCESS");

            BilesikKisiveAdresSorgulaModel model = new BilesikKisiveAdresSorgulaModel();
            model.Ad = result.GetElementsByTagName("Ad")[0].InnerText;
            model.Soyad = result.GetElementsByTagName("Soyad")[0].InnerText;
            model.AnneAd = result.GetElementsByTagName("AnneAd")[0].InnerText;
            model.BabaAd = result.GetElementsByTagName("BabaAd")[0].InnerText;
            model.Cinsiyet = result.GetElementsByTagName("Cinsiyet")[0].InnerText;
                     model.DogumTarih = GetElementsByTagDateHelper(result, "DogumTarih");
            model.DogumYer = result.GetElementsByTagName("DogumYer")[0].InnerText;
            model.AcikAdres = result.GetElementsByTagName("AcikAdres")[0].InnerText;
            model.AdresNo = result.GetElementsByTagName("AdresNo")[0].InnerText;
            model.IlIlceMerkezAdresi = result.GetElementsByTagName("IlIlceMerkezAdresi")[0].InnerText;

            return model;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="kimlikNo"></param>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public BilesikKisiveAdresSorgulaModel BilesikKisiveAdresSorgula(long kimlikNo, long sorgulayanKimlikNo, string userName, string password)
        {
            string token = GetSTSToken(sorgulayanKimlikNo, userName, password);

            Console.WriteLine("sending kps request....");

            var now = DateTime.Now;
            string created = now.AddMinutes(-1).ToUniversalTime().ToString("o");
            string expires = now.AddMinutes(5).ToUniversalTime().ToString("o");

            StringBuilder xml = new StringBuilder();
            xml.Append("<s:Envelope xmlns:s=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:a=\"http://www.w3.org/2005/08/addressing\" xmlns:u=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\">");

            xml.Append("<s:Header>");
            xml.Append("<a:Action s:mustUnderstand=\"1\">https://www.saglik.gov.tr/KPS/01/01/2017/IKpsServices/BilesikKisiveAdresSorgula</a:Action>");
            xml.Append("<a:MessageID>urn:uuid:" + Guid.NewGuid() + "</a:MessageID>");
            xml.Append("<a:ReplyTo>");
            xml.Append("<a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address>");
            xml.Append("</a:ReplyTo>");

            xml.Append("<a:To s:mustUnderstand=\"1\">" + kpsTestUrl + "</a:To>");
            xml.Append("<o:Security s:mustUnderstand=\"1\" xmlns:o=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\">");
            xml.Append("<u:Timestamp u:Id=\"_0\">");
            xml.Append("<u:Created>" + created + "</u:Created>");
            xml.Append("<u:Expires>" + expires + "</u:Expires>");
            xml.Append("</u:Timestamp>");


            // token
            xml.Append(token);


            xml.Append("</o:Security>");
            xml.Append("</s:Header>");
            xml.Append("<s:Body>");
            xml.Append("<BilesikKisiveAdresSorgula xmlns=\"https://www.saglik.gov.tr/KPS/01/01/2017\">");
            xml.Append("<kimlikNo>" + kimlikNo + "</kimlikNo>");
            xml.Append("</BilesikKisiveAdresSorgula>");
            xml.Append("</s:Body>");
            xml.Append("</s:Envelope>");


            string envelopeString = xml.ToString();

            var result = SendSoapRequest(envelopeString, kpsTestUrl);

            Console.WriteLine("kps request SUCCESS");

            BilesikKisiveAdresSorgulaModel model = new BilesikKisiveAdresSorgulaModel();
            model.Ad = GetElementsByTagNameHelper(result, "Ad");
            model.Soyad = GetElementsByTagNameHelper(result, "Soyad");
            model.AnneAd = GetElementsByTagNameHelper(result, "AnneAd");
            model.BabaAd = GetElementsByTagNameHelper(result, "BabaAd");
            model.Cinsiyet = GetElementsByTagNameHelper(result, "Cinsiyet");
            model.DogumTarih = GetElementsByTagDateHelper(result, "DogumTarih");
            model.DogumYer = GetElementsByTagNameHelper(result, "DogumYer");
            model.AcikAdres = GetElementsByTagNameHelper(result, "AcikAdres");
            model.AdresNo = GetElementsByTagNameHelper(result, "AdresNo");
            model.IlIlceMerkezAdresi = GetElementsByTagNameHelper(result, "IlIlceMerkezAdresi");
            model.KoyAdresi = GetElementsByTagNameHelper(result, "KoyAdresi");
            model.Il = GetElementsByTagNameHelper(result, "Il");
            model.IlKodu = GetElementsByTagNameHelper(result, "IlKodu");
            model.Ilce = GetElementsByTagNameHelper(result, "Ilce");
            model.IlceKodu = GetElementsByTagNameHelper(result, "IlceKodu");
            model.Koy = GetElementsByTagNameHelper(result, "Koy");
            model.Mahalle = GetElementsByTagNameHelper(result, "Mahalle");
            model.MahalleKodu = GetElementsByTagNameHelper(result, "MahalleKodu");
            model.AnneTcKimlikNo = GetElementsByTagNameHelper(result, "AnneTcKimlikNo");
            model.BabaTcKimlikNo = GetElementsByTagNameHelper(result, "BabaTcKimlikNo");
            model.YabanciAdres = GetElementsByTagNameHelper(result, "YabanciAdres");
            model.YabanciSehir = GetElementsByTagNameHelper(result, "YabanciSehir");
            model.YabanciUlke = GetElementsByTagNameHelper(result, "YabanciUlke");
            model.OlumTarih = GetElementsByTagDateHelper(result, "OlumTarih");
            model.MedeniHal = GetElementsByTagNameHelper(result, "MedeniHal");

  
            return model;
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        private string GetSTSToken(long sorgulayanKimlikNo, string username, string password)
        {

            //if old token is not expired use old token
            if (DateTime.Now < tokenExpires)
            {
                Console.WriteLine("[Use Old Token]");
                return token;
            }

            Console.WriteLine("sending new token request....");


            var now = DateTime.Now;
            string created = now.AddMinutes(-1).ToUniversalTime().ToString("o");
            string expires = now.AddMinutes(5).ToUniversalTime().ToString("o");



            StringBuilder envelope = new StringBuilder();
            envelope.Append("<s:Envelope xmlns:s=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:a=\"http://www.w3.org/2005/08/addressing\" xmlns:u=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\">");
            envelope.Append("<s:Header>");
            envelope.Append("<a:Action s:mustUnderstand=\"1\">http://docs.oasis-open.org/ws-sx/ws-trust/200512/RST/Issue</a:Action>");
            envelope.Append("<a:MessageID>urn:uuid:" + Guid.NewGuid() + "</a:MessageID>");
            envelope.Append("<a:ReplyTo>");
            envelope.Append("<a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address>");
            envelope.Append("</a:ReplyTo>");
            envelope.Append("<a:To s:mustUnderstand=\"1\">" + stsTestUrl + "</a:To>");

            envelope.Append("<SorgulayanKimlikNo a:IsReferenceParameter=\"true\" xmlns=\"\">" + sorgulayanKimlikNo + "</SorgulayanKimlikNo>");

            envelope.Append("<o:Security s:mustUnderstand=\"1\" xmlns:o=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\">");
            envelope.Append("<u:Timestamp u:Id=\"_0\">");
            envelope.Append("<u:Created>" + created + "</u:Created>");
            envelope.Append("<u:Expires>" + expires + "</u:Expires>");
            envelope.Append("</u:Timestamp>");
            envelope.Append("<o:UsernameToken u:Id=\"uuid-" + Guid.NewGuid() + "-1\">");

            //username,password
            envelope.Append("<o:Username>" + username + "</o:Username>");
            envelope.Append("<o:Password>" + password + "</o:Password>");

            envelope.Append("</o:UsernameToken>");
            envelope.Append("</o:Security>");
            envelope.Append("</s:Header>");
            envelope.Append("<s:Body>");


            envelope.Append("<trust:RequestSecurityToken xmlns:trust=\"http://docs.oasis-open.org/ws-sx/ws-trust/200512\">");
            envelope.Append("<wsp:AppliesTo xmlns:wsp=\"http://schemas.xmlsoap.org/ws/2004/09/policy\">");
            envelope.Append("<a:EndpointReference>");
            envelope.Append("<a:Address>" + kpsTestUrl + "</a:Address>");
            envelope.Append("</a:EndpointReference>");
            envelope.Append("</wsp:AppliesTo>");
            envelope.Append("<trust:KeyType>http://docs.oasis-open.org/ws-sx/ws-trust/200512/Bearer</trust:KeyType>");
            envelope.Append("<trust:RequestType>http://docs.oasis-open.org/ws-sx/ws-trust/200512/Issue</trust:RequestType>");
            envelope.Append("</trust:RequestSecurityToken>");
            envelope.Append("</s:Body>");
            envelope.Append("</s:Envelope>");


            var envopleString = envelope.ToString();

            XmlDocument x = SendSoapRequest(envopleString, stsTestUrl);

            tokenExpires = Convert.ToDateTime(x.GetElementsByTagName("saml:Conditions")[0].Attributes["NotOnOrAfter"].Value);

            XmlNode securityToken = x.GetElementsByTagName("trust:RequestedSecurityToken")[0];
            token = securityToken.InnerXml.ToString();

            Console.WriteLine("new token request SUCCESS");

            return token;
        }




        /// <summary>
        /// soap isteği
        /// </summary>
        /// <param name="envelopeString"></param>
        /// <param name="url"></param>
        /// <returns></returns>
        private XmlDocument SendSoapRequest(string envelopeString, string url)
        {
            string result = "";

            System.Net.HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            try
            {
                ASCIIEncoding encoding = new ASCIIEncoding();
                byte[] bytesToWrite = encoding.GetBytes(envelopeString);
                request.Method = "POST";
                request.ContentLength = bytesToWrite.Length;
                request.ContentType = "application/soap+xml; charset=UTF-8";
                Stream newStream = request.GetRequestStream();
                newStream.Write(bytesToWrite, 0, bytesToWrite.Length);
                newStream.Close();
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                Stream dataStream = response.GetResponseStream();
                if (dataStream != null)
                {
                    StreamReader reader = new StreamReader(dataStream);

                    XmlDocument xDoc = new XmlDocument();
                    xDoc.Load(reader);

                    return xDoc;
                }
            }
            catch (WebException ex)
            {
                if (ex.Response != null)
                {
                    if (ex.Response.ContentLength != 0)
                    {
                        using (var stream = ex.Response.GetResponseStream())
                        {
                            using (var reader = new StreamReader(stream))
                            {
                                result = reader.ReadToEnd();
                                Console.WriteLine(result);
                            }
                        }
                    }
                }

            }

            return null;
        }





        private string GetElementsByTagNameHelper(XmlDocument root, string tag)
        {
            var matches = root.GetElementsByTagName(tag);
            if (matches.Count > 0)
                return matches[0].InnerText;
            else
            {
                return "";
            }

        }

        private DateTime? GetElementsByTagDateHelper(XmlDocument root,string tag){
                string mdate="";
                var matches = root.GetElementsByTagName(tag);
                   if (matches.Count > 0)
                   {
              
               foreach (XmlNode xn in matches)
               {
                 string Yil = xn["Yil"].InnerText;
                 string Ay = xn["Ay"].InnerText;
                 string gun=xn["Gun"].InnerText;
                 Console.WriteLine("Gelen Tarih: {0} {1}", Yil, Ay);
                mdate=gun+"/"+Ay+"/"+Yil;
                 

               }

               //  gelen date verisi birşekilde boş ise 
               if (mdate == "//")
               {
                   return null;
               }
               return mdate.ToDateTime(format:"d/M/yyyy");
               }

               else
               {
                   return null;
               }

                  

        }

    }
}
