"use client";

import React from 'react';
import { useLanguage } from '@/components/LanguageContext'; // Pastikan path ini benar
import { dict } from '@/data/dictionary';

export default function Testimoni() {
  // 1. Ambil state bahasa dari context (sesuaikan destructuring dengan isi context-mu)
  const { lang } = useLanguage(); 
  
  // Jika context-mu langsung me-return string 'id' atau 'en', gunakan ini:
  // const language = useLanguage(); 

  // 2. Ambil data dengan optional chaining (?.) untuk berjaga-jaga
  const content = dict[lang]?.testimoni;

  if (!content || !content.data) {
    return <section className="relative py-24 bg-[#050810] min-h-[400px] w-full" />;
  }

  const testimoniData = content.data;
  const row1 = [...testimoniData.slice(0, 5), ...testimoniData.slice(0, 5)];
  const row2 = [...testimoniData.slice(5, 10), ...testimoniData.slice(5, 10)];

  return (
    <section className="relative py-24 bg-[#050810] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/Testimoni/bg.png" 
          alt="Background Testimoni" 
          className="w-full h-full object-fill brightness-95" 
        />
      </div>

      <style jsx>{`
        @keyframes slideRight { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes slideLeft { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        @keyframes gasp { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.12); } }
        .animate-slideRight { animation: slideRight 40s linear infinite; will-change: transform; }
        .animate-slideLeft { animation: slideLeft 40s linear infinite; will-change: transform; }
        .testimoni-card { transition: all 0.3s ease; }
        .testimoni-card:hover { 
          animation: gasp 0.6s cubic-bezier(0.36, 0, 0.66, -0.56);
          box-shadow: 0 20px 40px rgba(16, 185, 129, 0.2);
          border-color: rgba(16, 185, 129, 0.6);
        }
      `}</style>

      <div className="relative z-10">
        <h2 className="text-4xl font-bold mb-16 text-center text-white drop-shadow-md">
          {content.title1} <span className="text-emerald-500">{content.title2}</span>
        </h2>
        
        {/* Baris 1 */}
        <div className="flex animate-slideRight mb-8 w-max">
          {row1.map((t, i) => (
            <div key={i} className="testimoni-card mr-6 min-w-[320px] bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/60 cursor-pointer">
              <div className="flex items-center gap-4 mb-5">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-500/30 flex-shrink-0">
                  <img src={t.avatar} alt={t.nama} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{t.nama}</h4>
                  <p className="text-emerald-400 text-xs">{content.visitor}</p>
                </div>
              </div>
              <p className="text-slate-300 italic text-base leading-relaxed">"{t.teks}"</p>
            </div>
          ))}
        </div>

        {/* Baris 2 */}
        <div className="flex animate-slideLeft w-max">
          {row2.map((t, i) => (
            <div key={i} className="testimoni-card mr-6 min-w-[320px] bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/60 cursor-pointer">
              <div className="flex items-center gap-4 mb-5">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-500/30 flex-shrink-0">
                  <img src={t.avatar} alt={t.nama} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{t.nama}</h4>
                  <p className="text-emerald-400 text-xs">{content.visitor}</p>
                </div>
              </div>
              <p className="text-slate-300 italic text-base leading-relaxed">"{t.teks}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}