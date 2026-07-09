"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import ReactCountryFlag from "react-country-flag";

// IMPORT CONTEXT BAHASA
import { useLanguage } from '@/components/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMounted, setIsMounted] = useState(false);
  
  // AMBIL STATE & FUNGSI TOGGLE BAHASA GLOBAL
  const { lang, toggleLang } = useLanguage();

  // Efek tracking scroll untuk background dan active section
  useEffect(() => {
    setIsMounted(true); // Menandakan komponen sudah di-render di client/browser

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Logika Active Section (Scrollspy) yang lebih akurat
      const sections = ['home', 'sejarah', 'destinasi', 'peta', 'paketwisata'];
      let currentSection = 'home';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          // 100px adalah offset agar saat discroll belum sampai pas tengah pun menu sudah aktif
          if (window.scrollY >= element.offsetTop - 100) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // FUNGSI SCROLL YANG DIPERBAIKI (Lebih Aman & Akurat)
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false); // Tutup menu mobile jika sedang terbuka
    
    const element = document.getElementById(id);
    if (element) {
      // Menghitung posisi Y, dikurangi 80px untuk tinggi Navbar (Offset)
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      // Set active secara manual saat diklik agar instan berubah
      setActiveSection(id);
    }
  };

  // Daftar menu dwibahasa (Aman karena dijalankan setelah mounted atau fallback ke 'id')
  const currentLang = isMounted ? lang : 'id';
  const menuItems = currentLang === 'id' 
    ? [
        { label: 'Beranda', id: 'home' },
        { label: 'Sejarah', id: 'sejarah' },
        { label: 'Destinasi', id: 'destinasi' },
        { label: 'Peta', id: 'peta' },
        { label: 'Paket Wisata', id: 'paketwisata' },
      ]
    : [
        { label: 'Home', id: 'home' },
        { label: 'History', id: 'sejarah' },
        { label: 'Destinations', id: 'destinasi' },
        { label: 'Map', id: 'peta' },
        { label: 'Tour Packages', id: 'paketwisata' },
      ];

  return (
    <nav className={`fixed top-0 inset-x-0 z-[999] transition-all duration-300 ${
      isScrolled ? 'bg-[#050810]/90 backdrop-blur-md border-b border-slate-800/50 py-4 shadow-lg' : 'bg-transparent py-6'
    }`}>
      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 flex items-center justify-between">
        
        {/* LOGO */}
        <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2.5 cursor-pointer group">
          <Image src="/Home/logo.png" alt="Oraha Logo" width={45} height={40} className="object-contain group-hover:scale-105 transition-transform" />
          <span className="font-serif font-bold text-xl tracking-wider text-white">ORAHA</span>
        </div>

        {/* MENU DESKTOP */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {menuItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`relative font-medium text-sm transition-all duration-300 tracking-wide ${
                    activeSection === item.id ? 'text-emerald-400' : 'text-slate-300 hover:text-emerald-400'
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-400 transition-all duration-300 ${activeSection === item.id ? 'w-full' : 'w-0 hover:w-full'}`}></span>
                </a>
              </li>
            ))}
          </ul>

          <div className="h-5 w-[1px] bg-slate-700"></div>

          {/* TOGGLE BAHASA DENGAN BENDERA */}
          {isMounted && (
            <button
              suppressHydrationWarning
              onClick={toggleLang}
              className="flex items-center gap-2 bg-slate-900/80 border border-slate-700/60 hover:bg-emerald-600 hover:border-emerald-500 px-4 py-2 rounded-full text-white text-xs font-bold tracking-widest transition-all duration-300 shadow-md cursor-pointer"
            >
              <ReactCountryFlag 
                countryCode={lang === 'id' ? "ID" : "GB"} 
                svg 
                style={{ width: '1.2em', height: '1.2em', borderRadius: '2px' }}
              />
              <span className="uppercase">{lang === 'id' ? 'ID' : 'EN'}</span>
            </button>
          )}
        </div>

        {/* MENU MOBILE */}
        <div className="lg:hidden flex items-center gap-4">
          {isMounted && (
            <button suppressHydrationWarning onClick={toggleLang} className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-full text-white text-xs font-bold">
               <ReactCountryFlag countryCode={lang === 'id' ? "ID" : "GB"} svg style={{ width: '1.2em', height: '1.2em' }} />
               <span>{lang === 'id' ? 'ID' : 'EN'}</span>
            </button>
          )}
          <button suppressHydrationWarning onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[73px] bg-[#050810]/95 backdrop-blur-lg border-b border-slate-800 shadow-xl animate-in slide-in-from-top-4">
          <ul className="flex flex-col p-6 space-y-4">
            {menuItems.map((item) => (
              <li key={item.id} className="border-b border-slate-900 pb-2">
                <a href={`#${item.id}`} onClick={(e) => scrollToSection(e, item.id)} className="text-slate-300 hover:text-emerald-400 font-medium text-base block w-full">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}