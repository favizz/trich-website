import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/authContext/AuthProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const NunitoSans = Nunito_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Trich Barberspace",
  description: "Trich AI  sBarberspace Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={NunitoSans.className}>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
