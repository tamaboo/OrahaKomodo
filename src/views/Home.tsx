// File: src/views/Home.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { ArrowDown, Play, Sun, X } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

// IMPORT CONTEXT & DATA DICTIONARY
import { useLanguage } from '@/components/LanguageContext';
import { dict } from '@/data/dictionary';

// =========================================================================
// KOMPONEN IKON MANDIRI (ANTI-ERROR & 100% IDENTIK DENGAN LUCIDE)
// =========================================================================
const InstagramIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TikTokIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
  </svg>
);

const YoutubeIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3v6Z"/>
  </svg>
);

// =========================================================================
// KOMPONEN UTAMA HERO
// =========================================================================
export default function Hero() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);

  // AMBIL STATUS BAHASA GLOBAL DARI CONTEXT UNTUK MERUBAH ISI KONTEN TEKS
  const { lang } = useLanguage();
  const t = dict[lang].hero;

  // Array gambar background
  const bgImages = [
    "/Home/bg.png",
    "/Home/bg2.png",
    "/Home/bg3.png"
  ];

  // Efek untuk mengganti gambar secara otomatis setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 5000); // Ganti angka 5000 ini jika ingin jedanya lebih cepat/lambat (5000 = 5 detik)

    return () => clearInterval(interval);
  }, [bgImages.length]);

  // Fungsi smooth scroll ke bagian destinasi
  const scrollToDestinasi = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('destinasi');
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Fungsi smooth scroll ke section berikutnya
  const scrollToNextSection = () => {
    window.scrollBy({ top: window.innerHeight - 80, behavior: 'smooth' });
  };

  return (
    <>
      <section id="home" className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#050810]">
        
        {/* ========================================================================= */}
        {/* BACKGROUND IMAGE SLIDESHOW                                                */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 z-0 bg-[#050810]">
          {bgImages.map((src, index) => (
            <img 
              key={index}
              src={src} 
              alt={`Komodo Island Background ${index + 1}`} 
              className={`absolute inset-0 w-full h-full object-cover object-bottom transition-opacity duration-1000 ease-in-out ${
                index === currentBg ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            />
          ))}
          {/* Overlay Gelap agar teks tetap terbaca dengan jelas */}
          <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/80 via-black/20 to-black/60 pointer-events-none"></div>
        </div>

        {/* ========================================================================= */}
        {/* SIDEBAR SOSIAL MEDIA (KIRI)                                               */}
        {/* ========================================================================= */}
        <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-6 text-white">
          
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff5372] hover:scale-125 transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(228,64,95,0.8)]" aria-label="Instagram">
            <InstagramIcon size={22} />
          </a>
          
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#1877F2] hover:scale-125 transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(24,119,242,0.8)]" aria-label="Facebook">
            <FacebookIcon size={22} />
          </a>
          
          {/* Warna TikTok diubah ke Cyan agar animasinya terlihat nyala */}
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffffff] hover:scale-125 transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(0,242,254,0.9)]" aria-label="TikTok">
            <TikTokIcon size={22} />
          </a>
          
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000] hover:scale-125 transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(255,0,0,0.8)]" aria-label="YouTube">
            <YoutubeIcon size={22} />
          </a>
          
          <div className="w-[2px] h-20 bg-emerald-500/80 my-2 rounded-full"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
          <div className="w-2 h-2 rounded-full bg-emerald-600/60"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-700/40"></div>
        </div>

        {/* ========================================================================= */}
        {/* KONTEN UTAMA HERO (LAYOUT ASIMETRIS KIRI & KANAN)                        */}
        {/* ========================================================================= */}
        <div className="relative z-30 container mx-auto px-6 sm:pl-24 md:pl-28 lg:px-24 pt-32 pb-28 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full">
          
          {/* BAGIAN KIRI: JUDUL & DESKRIPSI */}
          <div className="max-w-xl text-left w-full">
            <ScrollReveal>
              <span className="text-yellow-400 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm mb-3 block drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {t.subtitle}
              </span>
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500 tracking-tight leading-none mb-6 drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]">
                {t.title}
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-8 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] font-medium max-w-lg">
                {t.desc}
              </p>
            </ScrollReveal>

            {/* TOMBOL DIRECT KE DESTINASI */}
            <ScrollReveal delay={400}>
              <a 
                href="#destinasi" 
                onClick={scrollToDestinasi}
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#7a9a5b] to-[#5d7c3e] hover:from-[#68854c] hover:to-[#4e6933] text-white px-8 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(122,154,91,0.6)] hover:-translate-y-0.5 border border-white/20"
              >
                {t.btnExplore}
              </a>
            </ScrollReveal>
          </div>

          {/* BAGIAN KANAN: KARTU WIDGET (VIDEO TRIGGER & WEATHER) */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 sm:gap-6 w-full sm:w-auto self-end lg:self-center mr-0 md:mr-6">
            
            {/* 1. Kartu Trigger Video */}
            <ScrollReveal delay={300}>
              <div 
                onClick={() => setIsVideoModalOpen(true)}
                className="group w-full sm:w-64 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/15 hover:border-yellow-500/50 p-5 rounded-2xl cursor-pointer transition-all duration-300 shadow-xl flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 group-hover:bg-yellow-500 border border-white/30 group-hover:border-yellow-400 flex items-center justify-center text-white group-hover:text-black mb-3 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(234,179,8,0.6)]">
                  <Play className="fill-current ml-0.5" size={20} />
                </div>
                <h4 className="text-yellow-400 font-bold text-sm mb-1">{t.videoLabel}</h4>
                <p className="text-slate-200 text-xs font-medium leading-snug">
                  {t.videoTitle}<br/>
                  <span className="text-slate-400 text-[11px] font-normal">{t.videoDesc}</span>
                </p>
              </div>
            </ScrollReveal>

            {/* 2. Kartu Weather Widget */}
            <ScrollReveal delay={500}>
              <div className="w-full sm:w-64 bg-black/40 backdrop-blur-md border border-white/15 p-5 rounded-2xl shadow-xl flex flex-col items-center text-center">
                <div className="text-yellow-400 mb-2 animate-pulse-slow">
                  <Sun size={36} />
                </div>
                <span className="text-slate-300 text-xs font-medium uppercase tracking-wider block mb-0.5">{t.weatherTitle}</span>
                <span className="text-white font-serif font-bold text-3xl tracking-wide">26°C</span>
              </div>
            </ScrollReveal>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* INDIKATOR SCROLL TO EXPLORE (BAWAH TENGAH)                                */}
        {/* ========================================================================= */}
        <div className="absolute bottom-4 lg:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center cursor-pointer group" onClick={scrollToNextSection}>
          <div className="w-10 h-10 rounded-full border border-white/30 group-hover:border-emerald-400 flex items-center justify-center text-white group-hover:text-emerald-400 transition-all duration-300 mb-2 animate-bounce bg-black/30 backdrop-blur-sm">
            <ArrowDown size={18} />
          </div>
          <span className="text-slate-300 group-hover:text-white text-xs font-medium tracking-wider transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            {t.scrollExplore}
          </span>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* POP-UP MODAL VIDEO (MUNCUL SAAT KARTU VIDEO DIKLIK)                       */}
      {/* ========================================================================= */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-lg animate-in fade-in duration-300">
          <div className="relative w-full max-w-4xl bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.9)] aspect-video">
            
            <button 
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-rose-600 border border-white/20 text-white flex items-center justify-center transition-colors duration-200 shadow-lg"
              aria-label={t.closeVideo}
            >
              <X size={20} />
            </button>

            <video 
              autoPlay 
              controls 
              playsInline 
              className="w-full h-full object-cover bg-black"
            >
              <source src="/Home/komodo.mp4" type="video/mp4" />
              {t.noVideo}
            </video>

          </div>
        </div>
      )}
    </>
  );
}