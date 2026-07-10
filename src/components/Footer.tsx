"use client";

import React from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, ArrowRight, Heart } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { dict } from '@/data/dictionary';

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
  </svg>
);

const YoutubeIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3v6Z"/>
  </svg>
);

export default function Footer() {
  const { lang } = useLanguage();
  const t = dict[lang]?.footer;

  if (!t) return null;

  const navLinks = [
    { label: t.navHome, href: '#home' },
    { label: t.navHistory, href: '#sejarah' },
    { label: t.navDest, href: '#destinasi' },
    { label: t.navMap, href: '#peta' },
    { label: t.navPackage, href: '#paketwisata' },
    { label: t.navTesti, href: '#testimoni' },
    { label: t.navFaq, href: '#faq' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#0a121d] via-[#050810] to-[#0a2342] text-white pt-16 pb-12 border-t border-slate-800/80 relative overflow-hidden w-full">
      <div className="absolute top-0 right-10 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 pb-14 border-b border-slate-800/80">
          
          <div className="lg:col-span-4 space-y-5">
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 cursor-pointer group w-max"
            >
              <Image 
                src="/Home/logo.png" 
                alt="Oraha Logo" 
                width={60} 
                height={60} 
                className="w-14 h-14 object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <div>
                <span className="text-2xl font-serif font-bold tracking-wider text-white block">
                  ORAHA
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-400 block -mt-1">
                  Ecotourism Portal
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed pr-0 lg:pr-4">
              {t.desc}
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{t.partner}</span>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-emerald-400 border-l-2 border-emerald-500 pl-3">
              {t.explore}
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-slate-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1.5 group w-max"
                  >
                    <ArrowRight size={14} className="text-emerald-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-emerald-400 border-l-2 border-emerald-500 pl-3">
              {t.contactUs}
            </h4>
            <div className="space-y-3.5 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed text-slate-400">
                  Jl. Marina Labuan Bajo No. 8, Manggarai Barat, Nusa Tenggara Timur, Indonesia 86554
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-emerald-400 shrink-0" />
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-300 hover:text-emerald-400 transition-colors font-mono">
                  +62 812-3456-7890 (WhatsApp)
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-emerald-400 shrink-0" />
                <a href="mailto:info@orahakomodo.id" className="text-xs text-slate-300 hover:text-emerald-400 transition-colors">
                  info@orahakomodo.id
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-emerald-400 border-l-2 border-emerald-500 pl-3">
              {t.followUs}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.followDesc}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-[#ff1d7f] hover:border-[#E4405F]/50 hover:bg-[#E4405F]/10 hover:scale-110 transition-all duration-300 shadow-lg" aria-label="Instagram">
                <InstagramIcon size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-[#1877F2] hover:border-[#1877F2]/50 hover:bg-[#1877F2]/10 hover:scale-110 transition-all duration-300 shadow-lg" aria-label="Facebook">
                <FacebookIcon size={18} />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-[#ffffff] hover:border-[#ff0050]/50 hover:bg-slate-800 hover:scale-110 transition-all duration-300 shadow-lg" aria-label="TikTok">
                <TikTokIcon size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-[#FF0000] hover:border-[#FF0000]/50 hover:bg-[#FF0000]/10 hover:scale-110 transition-all duration-300 shadow-lg" aria-label="YouTube">
                <YoutubeIcon size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; 2026 <strong className="text-slate-300 font-normal">ORAHA Ecotourism</strong>. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-center sm:text-right">
            <span>{t.createdWith}</span>
            <Heart size={14} className="text-rose-500 fill-rose-500 animate-pulse inline" />
            <span>{t.for} <strong className="text-emerald-400 font-medium">SDGs Creative Web Competition — BytesFest 2026</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
}