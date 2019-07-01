namespace kpsweb{

    public class Address:BaseModel {

public string PublicAddress { get; set; }
public long AddressCode  { get; set; }
public string Coubtry    { get; set; }
public long CountryCode { get; set; }
public string District { get; set; }
public string DistricCode { get; set; }
public string  Town { get; set; }
public long TownCode { get; set; }
public string    Village { get; set; }
public string VillageCode { get; set; }
public string ForeignAddress { get; set; }
public long ForeignAddressCode { get; set; }





    }
}