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
        <div className="bg-white w-full px-4 py-6 rounded-xl mx-auto">
            <p className="font-bold text-lg sm:text-xl leading-8 mb-4">
                Upgrade to TRICH Membership for exclusive benefits
            </p>

            <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
                {/* LEFT SIDE */}
                <div className="w-full lg:w-1/2 flex flex-col space-y-4">
                    <div className="flex flex-row items-start space-x-4">
                        <Image src={Icon1} alt="icon" className="w-6 h-6 mt-1" />
                        <p className="text-sm sm:text-base leading-tight">
                            Unlimited TCE services during membership.
                        </p>
                    </div>
                    <div className="flex flex-row items-start space-x-4">
                        <Image src={Icon2} alt="icon" className="w-6 h-6 mt-1" />
                        <p className="text-sm sm:text-base leading-tight">
                            10% discount on Mask Off, Creambath, Trim & Treat.
                        </p>
                    </div>
                    <div className="flex flex-row items-start space-x-4">
                        <Image src={Icon3} alt="icon" className="w-6 h-6 mt-1" />
                        <p className="text-sm sm:text-base leading-tight">
                            10% discount on Permification, Smooth Operator, True Colors, and Tat Too.
                        </p>
                    </div>
                    <div className="flex flex-row items-start space-x-4">
                        <Image src={Icon4} alt="icon" className="w-6 h-6 mt-1" />
                        <p className="text-sm sm:text-base leading-tight">
                            Free drinks every visit.
                        </p>
                    </div>

                    <p
                        className="underline font-semibold text-base sm:text-lg pt-4 cursor-pointer"
                        onClick={openModal}
                    >
                        Terms & Conditions
                    </p>
                </div>

                {/* RIGHT SIDE */}
                <div className="w-full lg:w-1/2 flex flex-col items-center space-y-4 px-2">
                    <p className="font-semibold text-base sm:text-lg">Plan</p>

                    <div className="w-full sm:w-4/5 text-center bg-[#D5D9E7] py-4 rounded">
                        <p className="font-semibold text-lg text-[#231D4F]">
                            IDR 459.000{" "}
                            <span className="font-normal text-sm text-[#3B3C4E]">/6 month</span>
                        </p>
                    </div>

                    <div className="w-full sm:w-4/5 text-center bg-[#D5D9E7] py-4 rounded">
                        <p className="font-semibold text-lg text-[#231D4F]">
                            IDR 799.000{" "}
                            <span className="font-normal text-sm text-[#3B3C4E]">/12 month</span>
                        </p>
                    </div>

                    <div
                        className="w-full sm:w-4/5 text-center bg-orange1 py-4 rounded-md cursor-pointer hover:bg-orange-600 transition"
                        onClick={() => setUpgradeModalOpen(true)}
                    >
                        <p className="font-semibold text-lg text-white">Upgrade Now</p>
                    </div>
                </div>
            </div>

            {/* TERMS MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <h2 className="text-lg font-bold mb-4">
                            <span className="text-[#1A237E]">TERMS & CONDITIONS</span>{" "}
                            <span className="text-[#F57C00]">LOYALTY CARD</span>
                        </h2>

                        <div className="bg-gray-200 p-4 rounded space-y-6">
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
                                    <p className="text-base font-bold">{section.title}</p>
                                    <ul className="pl-6 list-decimal space-y-2">
                                        {section.content.map((item, idx) => (
                                            <li key={idx} className="text-sm">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

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

            {/* WHATSAPP UPGRADE MODAL */}
            {isUpgradeModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[500px] text-center relative mx-auto">
                        <button
                            onClick={() => setUpgradeModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center"
                        >
                            ×
                        </button>

                        <div className="flex justify-center mb-4">
                            <Image src={WhatsAppIcon} alt="WhatsApp Logo" className="w-20 h-20" />
                        </div>

                        <h2
                            className="font-extrabold mb-6"
                            style={{
                                fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
                                textAlign: "center",
                                lineHeight: "1.2",
                            }}
                        >
                            Upgrade Your <br /> Membership!
                        </h2>

                        <div className="flex items-center justify-center mb-6">
                            <a
                                href="https://wa.me/08992310069"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-600 hover:text-green-700 font-bold"
                                style={{
                                    fontSize: "clamp(1rem, 4vw, 2rem)",
                                    wordWrap: "break-word",
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
