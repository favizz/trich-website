"use client";

import Image from "next/image";
import { useState } from "react";
import Icon1 from "@/public/dashboardAssets/membership/membership-1.svg";
import Icon2 from "@/public/dashboardAssets/membership/membership-2.svg";
import Icon3 from "@/public/dashboardAssets/membership/membership-3.svg";
import Icon4 from "@/public/dashboardAssets/membership/membership-4.svg";
import WhatsAppIcon from "@/public/productAssets/WhatsApp.png";

const Membership = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isUpgradeModalOpen, setUpgradeModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div className="lg:max-w-[579px] xl:max-w-[759px] bg-white w-full px-2 sm:px-4 md:px-6 lg:p-6 rounded-xl">
            <p className="font-bold lg:text-xl leading-8">
                Upgrade to TRICH Membership for exclusive benefits
            </p>
            <div className="rounded-[10px] lg:pt-6 flex flex-row space-x-2">
                <div className="w-1/2 flex flex-col space-y-4">
                    <div className="flex flex-row items-center space-x-4">
                        <Image src={Icon1} alt="icon"/>
                        <p className="leading-tight">Unlimited TCE services during membership.</p>
                    </div>
                    <div className="flex flex-row items-center space-x-4">
                        <Image src={Icon2} alt="icon"/>
                        <p className="leading-tight">10% discount on Mask Off, Creambath, Trim & Treat.</p>
                    </div>
                    <div className="flex flex-row items-center space-x-4">
                        <Image src={Icon3} alt="icon"/>
                        <p className="leading-tight">10% discount on Permification, Smooth Operator, True Colors, and Tat Too.</p>
                    </div>
                    <div className="flex flex-row items-center space-x-4">
                        <Image src={Icon4} alt="icon"/>
                        <p className="leading-tight">Free drinks every visit.</p>
                    </div>

                    <p
                        className="underline font-semibold lg:text-lg lg:pt-8 cursor-pointer"
                        onClick={openModal}
                    >
                        Terms & Conditions
                    </p>

                    {isModalOpen && (
                        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white rounded-lg p-6 w-[80%] lg:w-[60%]">
                                {/* Title Section */}
                                <h2 className="text-lg font-bold mb-4">
                                    <span className="text-[#1A237E]">TERMS & CONDITIONS</span>{" "}
                                    <span className="text-[#F57C00]">LOYALTY CARD</span>
                                </h2>

                                {/* Scrollable Content Section */}
                                <div className="h-[300px] overflow-y-scroll bg-gray-200 p-4 rounded space-y-6">
                                    {[
                                        {
                                            title: "Umum",
                                            content: [
                                                "Program Loyalty Membership ini diselenggarakan oleh TRICH Barberspace (selanjutnya disebut 'Penyelenggara').",
                                                "Dengan mendaftar sebagai anggota, pelanggan dianggap telah membaca, memahami, dan menyetujui semua syarat dan ketentuan ini.",
                                            ],
                                        },
                                        {
                                            title: "Keanggotaan",
                                            content: [
                                                "Keanggotaan terbuka untuk semua pelanggan yang berusia minimal 17 tahun.",
                                                "Pendaftaran keanggotaan dilakukan secara offline di TRICH Barberspace yang akan dipandu oleh storekeeper.",
                                                "Anggota akan menerima identifikasi keanggotaan digital yang akan terlihat di website pengguna.",
                                                "Keanggotaan bersifat pribadi dan tidak dapat dipindahtangankan.",
                                            ],
                                        },
                                        {
                                            title: "Keuntungan Keanggotaan",
                                            content: [
                                                "Anggota berhak mendapatkan diskon khusus, layanan eksklusif, dan promosi yang hanya tersedia untuk anggota.",
                                                "Informasi mengenai keuntungan-keuntungan akan diumumkan melalui media sosial dan website TRICH Barberspace.",
                                                "Keuntungan tidak dapat ditukarkan dengan uang tunai atau produk lainnya kecuali dinyatakan sebaliknya.",
                                            ],
                                        },
                                        {
                                            title: "Biaya dan Masa Berlaku",
                                            content: [
                                                "Keanggotaan dapat dikenakan biaya pendaftaran atau biaya bulanan/tahunan sesuai dengan paket yang dipilih.",
                                                "Masa berlaku keanggotaan adalah [durasi keanggotaan] sejak tanggal pendaftaran, kecuali diperbarui atau dihentikan lebih awal.",
                                                "Tidak ada pengembalian dana untuk biaya keanggotaan yang sudah dibayarkan kecuali diatur secara khusus oleh Penyelenggara.",
                                            ],
                                        },
                                        {
                                            title: "Penggunaan Keanggotaan",
                                            content: [
                                                "Anggota dapat mengklaim manfaat keanggotaan dengan cara menyebutkan email & nomor telepon kepada storekeeper saat berkunjung ke TRICH Barberspace.",
                                                "Penyalahgunaan keanggotaan dapat mengakibatkan pembatalan keanggotaan tanpa pengembalian dana.",
                                            ],
                                        },
                                        {
                                            title: "Penghentian Keanggotaan",
                                            content: [
                                                "Anggota dapat menghentikan keanggotaan kapan saja dengan menghubungi layanan pelanggan.",
                                                "Penyelenggara berhak untuk menghentikan keanggotaan jika anggota melanggar syarat dan ketentuan ini.",
                                            ],
                                        },
                                        {
                                            title: "Privasi dan Data Pribadi",
                                            content: [
                                                "Penyelenggara akan mengumpulkan, menyimpan, dan menggunakan data pribadi anggota sesuai dengan kebijakan privasi.",
                                                "Data pribadi tidak akan dibagikan kepada pihak ketiga tanpa persetujuan anggota kecuali diwajibkan oleh hukum.",
                                            ],
                                        },
                                    ].map((section, index) => (
                                        <div key={index}>
                                            <p className="text-xl font-bold">{section.title}</p>
                                            <div className="pl-6 space-y-2">
                                                {section.content.map((item, idx) => (
                                                    <p key={idx} className="indent-[-1.2rem] pl-[1.2rem]">
                                                        {idx + 1}. {item}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Close Button */}
                                <div className="flex justify-center mt-4">
                                    <button
                                        className="bg-orange1 text-white px-6 py-2 rounded-md"
                                        onClick={closeModal}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="w-1/2 flex flex-col items-center  space-y-4">
                    <p className="font-semibold">Plan</p>
                    <div className="w-4/5 flex flex-col text-center justify-center lg:py-6 bg-[#D5D9E7]">
                        <p className="font-semibold lg:text-xl text-[#231D4F]">IDR 459.000 <a className="font-normal lg:text-base text-[#3B3C4E]">/6 month</a></p>
                    </div>
                    <div className="w-4/5 flex flex-col text-center justify-center lg:py-6 bg-[#D5D9E7]">
                        <p className="font-semibold lg:text-xl text-[#231D4F]">IDR 799.000 <a className="font-normal lg:text-base text-[#3B3C4E]">/12 month</a></p>
                    </div>
                    {/* Upgrade Now Button */}
                    <div
                        className="w-4/5 flex flex-col text-center justify-center lg:py-4 bg-orange1 rounded-md cursor-pointer hover:bg-orange-600 transition"
                        onClick={() => setUpgradeModalOpen(true)}
                    >
                        <p className="font-semibold lg:text-xl text-white">Upgrade Now</p>
                    </div>
                </div>
            </div>

            {/* Upgrade Now Modal (Same as WhatsApp Popup) */}
            {isUpgradeModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[500px] text-center relative mx-auto">
                        {/* Close Button */}
                        <button
                            onClick={() => setUpgradeModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center"
                        >
                            ×
                        </button>

                        {/* Logo or Icon */}
                        <div className="flex justify-center mb-4">
                            <Image
                                src={WhatsAppIcon}
                                alt="WhatsApp Logo"
                                className="w-20 h-20"
                            />
                        </div>

                        {/* Title */}
                        <h2
                            className="font-extrabold mb-6"
                            style={{
                                fontSize: "clamp(1.5rem, 5vw, 2.5rem)", // Responsive font size
                                textAlign: "center", // Ensures proper alignment
                                lineHeight: "1.2", // Adjusts spacing between lines for better readability
                            }}
                        >
                            Upgrade Your <br /> Membership!
                        </h2>

                        {/* Clickable WhatsApp Number */}
                        <div className="flex items-center justify-center mb-6">
                            <a
                                href="https://wa.me/08992310069"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-600 hover:text-green-700 font-bold"
                                style={{
                                    fontSize: "clamp(1rem, 4vw, 2rem)", // Responsive font size
                                    wordWrap: "break-word", // Ensure it wraps if needed
                                    overflowWrap: "break-word",
                                }}
                            >
                                +62 899-2310-069
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default Membership;