// File: src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. IMPORT GLOBAL PROVIDER & KOMPONEN
import { LanguageProvider } from "@/components/LanguageContext";
import CustomCursor from "@/components/CustomCursor";

// 2. KONFIGURASI FONT
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 3. METADATA & SEO UTAMA WEB
export const metadata: Metadata = {
  title: "ORAHA | Komodo Ecotourism Portal",
  description: "Gerbang digital eksplorasi Taman Nasional Komodo. Pengalaman petualangan alam liar yang otentik dan berkelanjutan.",
  icons: {
    icon: "/Home/logo.png", // Opsional: Akan otomatis membaca logo Anda sebagai favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Tambahkan scroll-smooth agar navigasi anchor (href="#id") meluncur mulus
    <html lang="id" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050810] text-white overflow-x-hidden`}
      >
        <LanguageProvider>
          {/* Efek Kursor Interaktif Global */}
          <CustomCursor />
          
          {/* Render Seluruh Konten Halaman */}
          <main className="relative flex min-h-screen flex-col">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}