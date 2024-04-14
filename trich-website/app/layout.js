import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/authContext/AuthProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Trich Barberspace",
  description: "Trich Barberspace Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
