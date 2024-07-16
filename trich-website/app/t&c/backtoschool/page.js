import DescBg from "@/public/homeAssets/DescBg.png";
import Form from "../components/Form";

const KetentuanUmum = [
  "- Promo ini terbuka untuk semua pelajar, mulai dari TK sampai SMA.",
  "- Promo ini berlaku untuk dua orang di waktu yang bersamaan.",
  "- Promo ini hanya berlaku untuk layanan “The Cutting Edge”.",
  "- Promo ini berlaku selama 30 hari dari tanggal 15 Juli 2024 - 14 Agustus 2024",
  "- Promo ini tidak dapat dipakai bersamaan dengan promo lainnya.",
];

const CaraPemakaian = [
 "- Pastikan telah mem-follow Instagram kami di @trichbarber",
 "- Tunjukkan kartu identitas siswa atau bukti keanggotaan sekolah yang valid saat mengunjungi TRICH Barberspace.",
 "- Khusus bagi pelajar TK dan SD dapat mengajak orang tua atau pendamping sebagai partner potong rambut.",
 "- Lakukan reservasi melalui website kami di trich.id untuk memastikan ketersediaan tempat Anda.",
 "- Post Instastory saat Anda berkunjung ke TRICH Barberspace dan tag @trichbarber.",
 "- Dengan menggunakan promo ini, Anda dianggap telah menyetujui seluruh syarat dan ketentuan yang berlaku."
];

const page = () => {
  return (
    <main
      style={{ backgroundImage: `url(${DescBg.src})` }}
      className="w-full min-h-screen bg-cover bg-center flex items-center justify-center"
    >
      <Form ketentuan={KetentuanUmum} cara={CaraPemakaian}/>
    </main>
  );
};

export default page;