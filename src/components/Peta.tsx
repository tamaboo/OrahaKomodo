"use client";

import React from 'react';
import { CheckCircle2, XCircle, Map, Mountain, Waves, MapPin, Ban } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

// IMPORT CONTEXT BAHASA DAN DICTIONARY
import { useLanguage } from '@/components/LanguageContext';
import { dict } from '@/data/dictionary';

// DATA 10 TITIK PIN DESTINASI (Koordinat 'top' dikurangi agar posisinya naik)
const mapLocations = [
  { id: 1, name: 'Loh Liang', desc: 'Pusat observasi satwa komodo liar.', img: '/Destinasi/Loh Liang/0.jpeg', top: '34%', left: '39%', position: 'bottom' },
  { id: 2, name: 'Pink Beach', desc: 'Pantai eksotis pasir merah muda.', img: '/Destinasi/Pink Beach/0.jpg', top: '43%', left: '36%', position: 'bottom' },
  { id: 3, name: 'Pulau Padar', desc: 'Pemandangan 3 teluk pantai unik.', img: '/Destinasi/Pulau Padar/0.jpg', top: '51%', left: '33%', position: 'bottom' },
  { id: 4, name: 'Batu Bolong', desc: 'Situs menyelam kelas dunia.', img: '/Destinasi/Batu Bolong/0.jpeg', top: '40%', left: '42%', position: 'top' },
  { id: 5, name: 'Taka Makasar', desc: 'Pulau pasir timbul air pirus jernih.', img: '/Destinasi/Taka Makasar/0.jpeg', top: '32%', left: '44%', position: 'top' },
  { id: 6, name: 'Manta Point', desc: 'Bercengkerama dengan Ikan Pari Manta.', img: '/Destinasi/Manta Point/0.jpg', top: '38%', left: '48%', position: 'bottom' },
  { id: 7, name: 'Pulau Rinca', desc: 'Habitat asli komodo & trekking savana.', img: '/Destinasi/Pulau Rinca/0.jpeg', top: '55%', left: '41%', position: 'top' },
  { id: 8, name: 'Pulau Kalong', desc: 'Ribuan kelelawar di langit senja.', img: '/Destinasi/Pulau Kalong/0.jpeg', top: '59%', left: '44%', position: 'bottom' },
  { id: 9, name: 'Pulau Kelor', desc: 'Perbukitan hijau & panorama laut.', img: '/Destinasi/Pulau Kelor/0.jpg', top: '47%', left: '49%', position: 'top' },
  { id: 10, name: 'Pulau Kanawa', desc: 'Gerbang surga bawah laut.', img: '/Destinasi/Pulau Kanawa/0.jpg', top: '33%', left: '51%', position: 'top' },
];

export default function Peta() {
  const { lang } = useLanguage();
  const t = dict[lang]?.peta;
  
  if (!t || !t.stats) return null; 

  const statIcons = [Map, Mountain, Waves];

  return (
    <section 
      id="peta" 
      className="relative w-full min-h-[850px] lg:min-h-[950px] py-24 flex items-center bg-[#050810] overflow-hidden m-0"
    >
      
      {/* ========================================== */}
      {/* LAYER 1: BACKGROUND COVER PENUH */}
      {/* ========================================== */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <img 
          src="/Peta/bg.png" 
          alt="Peta Komodo" 
          className="w-full h-full object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-[#050810]/40 z-0"></div>
      </div>

      {/* ========================================== */}
      {/* LAYER 1.5: TITIK PIN PETA INTERAKTIF */}
      {/* ========================================== */}
      <div className="absolute inset-0 max-w-[1600px] mx-auto w-full h-full pointer-events-auto z-10 hidden md:block">
        {mapLocations.map((loc) => (
          <div key={loc.id} className="absolute group z-20 -translate-x-1/2 -translate-y-1/2" style={{ top: loc.top, left: loc.left }}>
            
            <div className="relative flex items-center justify-center cursor-pointer">
              <div className="absolute w-4 h-4 md:w-6 md:h-6 bg-emerald-400/40 rounded-full animate-ping"></div>
              <div className="relative z-10 bg-emerald-600 border border-emerald-300 text-white p-1.5 md:p-2 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.8)] group-hover:bg-yellow-400 group-hover:border-white group-hover:text-slate-950 group-hover:scale-125 transition-all duration-300">
                <MapPin className="fill-current w-3 h-3 md:w-3.5 md:h-3.5" />
              </div>
            </div>

            {/* Tooltip Deskripsi Destinasi */}
            <div className={`absolute left-1/2 -translate-x-1/2 w-44 md:w-52 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl shadow-2xl p-2.5 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none z-50 ${loc.position === 'bottom' ? 'top-full mt-2 md:mt-3 origin-top' : 'bottom-full mb-2 md:mb-3 origin-bottom'}`}>
              <img src={loc.img} alt={loc.name} className="w-full h-20 md:h-24 object-cover rounded-xl mb-2.5 border border-slate-800" />
              <h4 className="font-serif font-bold text-white text-xs md:text-sm leading-snug">{loc.name}</h4>
              <p className="text-[10px] md:text-xs text-slate-300 leading-relaxed mt-1 font-medium">{loc.desc}</p>
              <div className={`absolute left-1/2 -translate-x-1/2 border-[6px] md:border-[8px] border-transparent ${loc.position === 'bottom' ? 'bottom-full border-b-slate-900' : 'top-full border-t-slate-900'}`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================== */}
      {/* LAYER 2: UI (STATISTIK KIRI & DO/DONTS KANAN) */}
      {/* ========================================== */}
      <div className="w-full relative z-30 pointer-events-none">
        
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start w-full px-6 md:px-12 lg:px-16 xl:px-24">
          
          {/* KOLOM KIRI: TEKS & STATISTIK */}
          <div className="w-full lg:w-auto lg:max-w-md flex flex-col justify-center space-y-10 pointer-events-auto">
            <ScrollReveal>
              <div className="space-y-4">
                <span className="text-emerald-400 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs block drop-shadow-md">
                  {t.subtitle}
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-[54px] font-serif font-bold text-white leading-tight drop-shadow-lg">
                  {t.title1} <br />
                  <span className="text-emerald-400">{t.title2}</span>
                </h2>
                <p className="text-slate-200 text-sm md:text-base leading-relaxed max-w-sm drop-shadow-md">
                  {t.desc}
                </p>
              </div>
            </ScrollReveal>

            {/* KARTU STATISTIK */}
            <div className="space-y-4 w-full md:w-max">
              {t.stats.map((stat: any, index: number) => {
                const Icon = statIcons[index] || Map;
                return (
                  <ScrollReveal key={index} delay={index * 100}>
                    <div className="flex items-center gap-5 p-5 rounded-[1.25rem] bg-[#0a1118]/80 backdrop-blur-xl border border-slate-700/60 hover:border-emerald-500/50 transition-colors group shadow-2xl">
                      <div className="text-emerald-400 group-hover:scale-110 transition-transform">
                        <Icon size={34} strokeWidth={1.5} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-3xl font-serif font-bold text-white leading-none">
                          {stat.num}
                        </span>
                        <span className="text-[10px] md:text-xs text-slate-400 font-semibold tracking-widest uppercase mt-1.5">
                          {stat.label}
                        </span>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* KOLOM KANAN: DO & DON'TS BOX */}
          <div className="w-full lg:w-auto lg:max-w-[22rem] flex justify-end pointer-events-auto mt-16 lg:mt-0">
            <ScrollReveal delay={300} className="w-full">
              <div className="bg-[#0b121a]/85 backdrop-blur-2xl border border-slate-700/80 rounded-3xl lg:rounded-l-[2rem] lg:rounded-r-none p-6 shadow-2xl w-full">
                
                <h3 className="text-yellow-500 text-lg md:text-xl font-serif font-bold mb-1 tracking-wide">
                  {t.dodontTitle}
                </h3>
                <p className="text-slate-300 text-[10px] md:text-[11px] leading-relaxed mb-6">
                  {t.dodontDesc}
                </p>

                {/* DO SECTION */}
                <div className="mb-6">
                  <h4 className="text-emerald-400 font-bold text-[11px] md:text-xs mb-3 uppercase tracking-widest inline-block">
                    {t.doTitle}
                  </h4>
                  <ul className="space-y-3">
                    {t.doList.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-slate-200 text-[10px] md:text-[11px] font-medium leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* DON'T SECTION */}
                <div>
                  <h4 className="text-rose-400 font-bold text-[11px] md:text-xs mb-3 uppercase tracking-widest inline-block">
                    {t.dontTitle}
                  </h4>
                  <ul className="space-y-3">
                    {t.dontList.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        {idx === t.dontList.length - 1 ? (
                          <Ban size={14} className="text-rose-500 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle size={14} className="text-rose-500 shrink-0 mt-0.5" />
                        )}
                        <span className="text-slate-200 text-[10px] md:text-[11px] font-medium leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}