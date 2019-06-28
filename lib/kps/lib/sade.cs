public partial class Sonuc
{
    public AdresBilgisi AdresBilgisi { get; set; }
    public HataBilgisi HataBilgisi { get; set; }
    public string KimlikNo { get; set; }
    public HataBilgisi MaviKartliKisiKutukleri { get; set; }
    public TcVatandasiKisiKutukleri TcVatandasiKisiKutukleri { get; set; }
    public HataBilgisi YabanciKisiKutukleri { get; set; }
}

public partial class AdresBilgisi
{
    public HataBilgisi AcikAdres { get; set; }
    public long AdresNo { get; set; }
    public AdresTip AdresTip { get; set; }
    public HataBilgisi BeldeAdresi { get; set; }
    public BeyanTarihi BeyanTarihi { get; set; }
    public HataBilgisi BeyandaBulunanKimlikNo { get; set; }
    public HataBilgisi HataBilgisi { get; set; }
    public HataBilgisi IlIlceMerkezAdresi { get; set; }
    public HataBilgisi KoyAdresi { get; set; }
    public BeyanTarihi TasinmaTarihi { get; set; }
    public BeyanTarihi TescilTarihi { get; set; }
    public YurtDisiAdresi YurtDisiAdresi { get; set; }
}


// "AdresTip": { "Aciklama": "Yurt Dışı Adresi", 	"Kod": "4" },
// "AdresTip": { 			"Aciklama": "İl/İlçe Merkezi", "Kod": "1" 	}
public partial class AdresTip
{
    public string Aciklama { get; set; }
    public long Kod { get; set; }
}

 public partial class IlIlceMerkezAdresi
{
    public AdresTip BagimsizBolumDurum { get; set; }
    public AdresTip BagimsizBolumTipi { get; set; }
    public long BinaAda { get; set; }
    public HataBilgisi BinaBlokAdi { get; set; }
    public AdresTip BinaDurum { get; set; }
    public long BinaKodu { get; set; }
    public long BinaNo { get; set; }
    public AdresTip BinaNumaratajTipi { get; set; }
    public string BinaPafta { get; set; }
    public long BinaParsel { get; set; }
    public string BinaSiteAdi { get; set; }
    public AdresTip BinaYapiTipi { get; set; }
    public string Csbm { get; set; }
    public long CsbmKodu { get; set; }
    public long DisKapiNo { get; set; }
    public HataBilgisi HataBilgisi { get; set; }
    public long IcKapiNo { get; set; }
    public string Il { get; set; }
    public long IlKodu { get; set; }
    public string Ilce { get; set; }
    public long IlceKodu { get; set; }
    public HataBilgisi KatNo { get; set; }
    public string Mahalle { get; set; }
    public long MahalleKodu { get; set; }
    public HataBilgisi TapuBagimsizBolumNo { get; set; }
    public AdresTip YapiKullanimAmac { get; set; }
    public HataBilgisi YolAltiKatSayisi { get; set; }
    public HataBilgisi YolUstuKatSayisi { get; set; }
}

public partial class YurtDisiAdresi
{
    public HataBilgisi DisTemsDuzeltmeBeyanTarih { get; set; }
    public HataBilgisi DisTemsDuzeltmeKararTarih { get; set; }
    public HataBilgisi DisTemsDuzeltmeNeden { get; set; }
    public HataBilgisi DisTemsilcilik { get; set; }
    public HataBilgisi HataBilgisi { get; set; }
    public string YabanciAdres { get; set; }
    public string YabanciSehir { get; set; }
    public AdresTip YabanciUlke { get; set; }
}

public partial class TcVatandasiKisiKutukleri
{
    public HataBilgisi GeciciKimlikBilgisi { get; set; }
    public HataBilgisi HataBilgisi { get; set; }
    public KisiBilgisi KisiBilgisi { get; set; }
    public NufusCuzdaniBilgisi NufusCuzdaniBilgisi { get; set; }
    public HataBilgisi TckkBilgisi { get; set; }
}

public partial class KisiBilgisi
{
    public string AnneTcKimlikNo { get; set; }
    public string BabaTcKimlikNo { get; set; }
    public long DogumYerKod { get; set; }
    public DurumBilgisi DurumBilgisi { get; set; }
    public HataBilgisi HataBilgisi { get; set; }
    public KayitYeriBilgisi KayitYeriBilgisi { get; set; }
    public string TcKimlikNo { get; set; }
    public TemelBilgisi TemelBilgisi { get; set; }
}

public partial class DurumBilgisi
{
    public HataBilgisi Din { get; set; }
    public AdresTip Durum { get; set; }
    public AdresTip MedeniHal { get; set; }
    public BeyanTarihi OlumTarih { get; set; }
}

public partial class KayitYeriBilgisi
{
    public long AileSiraNo { get; set; }
    public long BireySiraNo { get; set; }
    public AdresTip Cilt { get; set; }
    public AdresTip Il { get; set; }
    public AdresTip Ilce { get; set; }
}

public partial class TemelBilgisi
{
    public string Ad { get; set; }
    public string AnneAd { get; set; }
    public string BabaAd { get; set; }
    public AdresTip Cinsiyet { get; set; }
    public Tarih DogumTarih { get; set; }
    public string DogumYer { get; set; }
    public string Soyad { get; set; }
}

public partial class Tarih
{
    public long Ay { get; set; }
    public long Gun { get; set; }
    public long Yil { get; set; }
}

public partial class NufusCuzdaniBilgisi
{
    public string Ad { get; set; }
    public string AnneAd { get; set; }
    public string BabaAd { get; set; }
    public long CuzdanKayitNo { get; set; }
    public AdresTip CuzdanVerilmeNeden { get; set; }
    public Tarih DogumTarih { get; set; }
    public string DogumYer { get; set; }
    public HataBilgisi HataBilgisi { get; set; }
    public long No { get; set; }
    public string Seri { get; set; }
    public string Soyad { get; set; }
    public string TcKimlikNo { get; set; }
    public AdresTip VerildigiIlce { get; set; }
    public Tarih VerilmeTarih { get; set; }
}