import DescBg from "@/public/homeAssets/DescBg.png";
import Form from "../components/Form";

const KetentuanUmum = [
    "- Promo ini terbuka untuk umum.",
    "- Promo ini hanya berlaku untuk layanan “The Cutting Edge”.",
    "- Promo ini hanya berlaku pada hari Senin-Kamis untuk sesi pukul 10.00, 11.00, dan 12.00.",
    "- Promo ini tidak dapat dipakai bersamaan dengan promo lainnya.",
];

const CaraPemakaian = [
    "- Pastikan telah mem-follow Instagram kami di @trichbarber",
    "- Lakukan reservasi melalui website kami di trich.id untuk memastikan ketersediaan tempat Anda.",
    "- Post Instastory saat Anda berkunjung ke TRICH Barberspace dan tag @trichbarber.",
    "- Dengan menggunakan promo ini, Anda dianggap telah menyetujui seluruh syarat dan ketentuan yang berlaku.",
];

const page = () => {
  return (
    <main
      style={{ backgroundImage: `url(${DescBg.src})` }}
      className="w-full min-h-screen bg-cover bg-center flex items-center justify-center"
    >
      <Form ketentuan={KetentuanUmum} cara={CaraPemakaian} />
    </main>
  );
};

export default page;
