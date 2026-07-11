"use client";

import React from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { dict } from '@/data/dictionary';

export default function Testimoni() {
  const { lang } = useLanguage(); 
  const content = dict[lang]?.testimoni;

  if (!content || !content.data) {
    return <section id="testimoni" className="relative py-24 bg-[#050810] min-h-[400px] w-full" />;
  }

  const testimoniData = content.data;
  const row1 = [...testimoniData.slice(0, 5), ...testimoniData.slice(0, 5)];
  const row2 = [...testimoniData.slice(5, 10), ...testimoniData.slice(5, 10)];

  return (
    <section id="testimoni" className="relative py-24 bg-[#050810] overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/Testimoni/bg.png" 
          alt="Background Testimoni" 
          className="w-full h-full object-fill brightness-95 opacity-80" 
        />
        {/* Tambahan overlay gradient tipis agar teks lebih terbaca */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050810]/40 via-transparent to-[#050810]/80"></div>
      </div>

      <style jsx>{`
        @keyframes slideRight { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes slideLeft { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        @keyframes gasp { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        .animate-slideRight { animation: slideRight 40s linear infinite; will-change: transform; }
        .animate-slideLeft { animation: slideLeft 40s linear infinite; will-change: transform; }
        .testimoni-card { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .testimoni-card:hover { 
          animation: gasp 0.6s cubic-bezier(0.36, 0, 0.66, -0.56);
          box-shadow: 0 20px 40px rgba(16, 185, 129, 0.15);
          border-color: rgba(52, 211, 153, 0.5);
          transform: translateY(-4px);
        }
      `}</style>

      <div className="relative z-10">
        
        {/* ========================================= */}
        {/* HEADER TESTIMONI YANG LEBIH PROFESIONAL   */}
        {/* ========================================= */}
        <div className="flex flex-col items-center justify-center mb-16 px-6 text-center">
          <span className="text-emerald-400 font-bold uppercase tracking-[0.25em] text-[10px] md:text-xs mb-3 block drop-shadow-md">
            {lang === 'id' ? 'Ulasan & Pengalaman' : 'Reviews & Experiences'}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-[54px] font-serif font-bold text-white leading-tight drop-shadow-lg">
            {content.title1}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-300">
              {content.title2}
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-transparent mt-6 rounded-full opacity-80"></div>
        </div>
        
        {/* Baris 1 */}
        <div className="flex animate-slideRight mb-8 w-max">
          {row1.map((t, i) => (
            <div key={i} className="testimoni-card mr-6 min-w-[340px] bg-[#0b121a]/85 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/50 cursor-pointer">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-[2.5px] border-emerald-500/50 flex-shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <img src={t.avatar} alt={t.nama} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-white text-base tracking-wide">{t.nama}</h4>
                  <p className="text-emerald-400 text-[11px] font-medium uppercase tracking-wider">{content.visitor}</p>
                </div>
              </div>
              <p className="text-slate-300 italic text-sm leading-relaxed">"{t.teks}"</p>
            </div>
          ))}
        </div>

        {/* Baris 2 */}
        <div className="flex animate-slideLeft w-max">
          {row2.map((t, i) => (
            <div key={i} className="testimoni-card mr-6 min-w-[340px] bg-[#0b121a]/85 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/50 cursor-pointer">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-[2.5px] border-emerald-500/50 flex-shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <img src={t.avatar} alt={t.nama} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-white text-base tracking-wide">{t.nama}</h4>
                  <p className="text-emerald-400 text-[11px] font-medium uppercase tracking-wider">{content.visitor}</p>
                </div>
              </div>
              <p className="text-slate-300 italic text-sm leading-relaxed">"{t.teks}"</p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}