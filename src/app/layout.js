import { Quicksand } from "next/font/google";

import Navbar from "./_layout/Navbar";
import Footer from "./_layout/Footer";

import "./globals.css";

export const metadata = {
  title: "Estudio Castelo",
  description: "Artist website",
  icons: {
    icon: "/favicon.svg",
  },
};

const quicksand = Quicksand({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={quicksand.className}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
