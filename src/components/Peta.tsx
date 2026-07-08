"use client";

import React from 'react';
import { CheckCircle2, XCircle, Map, Mountain, Waves, MapPin, Ban } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

// IMPORT CONTEXT BAHASA DAN DICTIONARY
import { useLanguage } from '@/components/LanguageContext';
import { dict } from '@/data/dictionary';

// DATA 10 TITIK PIN DESTINASI (Koordinat disesuaikan ke tengah / mengikuti pulau)
const mapLocations = [
  { id: 1, name: 'Loh Liang', desc: 'Pusat observasi satwa komodo liar.', img: '/Destinasi/Loh Liang/0.jpeg', top: '35%', left: '42%', position: 'bottom' },
  { id: 2, name: 'Pink Beach', desc: 'Pantai eksotis pasir merah muda.', img: '/Destinasi/Pink Beach/0.jpg', top: '45%', left: '38%', position: 'bottom' },
  { id: 3, name: 'Pulau Padar', desc: 'Pemandangan 3 teluk pantai unik.', img: '/Destinasi/Pulau Padar/0.jpg', top: '55%', left: '45%', position: 'bottom' },
  { id: 4, name: 'Batu Bolong', desc: 'Situs menyelam kelas dunia.', img: '/Destinasi/Batu Bolong/0.jpeg', top: '40%', left: '48%', position: 'top' },
  { id: 5, name: 'Taka Makasar', desc: 'Pulau pasir timbul air pirus jernih.', img: '/Destinasi/Taka Makasar/0.jpeg', top: '42%', left: '52%', position: 'top' },
  { id: 6, name: 'Manta Point', desc: 'Bercengkerama dengan Ikan Pari Manta.', img: '/Destinasi/Manta Point/0.jpg', top: '46%', left: '55%', position: 'bottom' },
  { id: 7, name: 'Pulau Rinca', desc: 'Habitat asli komodo & trekking savana.', img: '/Destinasi/Pulau Rinca/0.jpeg', top: '65%', left: '50%', position: 'top' },
  { id: 8, name: 'Pulau Kalong', desc: 'Ribuan kelelawar di langit senja.', img: '/Destinasi/Pulau Kalong/0.jpeg', top: '68%', left: '54%', position: 'bottom' },
  { id: 9, name: 'Pulau Kelor', desc: 'Perbukitan hijau & panorama laut.', img: '/Destinasi/Pulau Kelor/0.jpg', top: '50%', left: '62%', position: 'top' },
  { id: 10, name: 'Pulau Kanawa', desc: 'Gerbang surga bawah laut.', img: '/Destinasi/Pulau Kanawa/0.jpg', top: '40%', left: '65%', position: 'top' },
];

export default function Peta() {
  const { lang } = useLanguage();
  const t = dict[lang]?.peta;
  
  if (!t || !t.stats) return null; 

  const statIcons = [Map, Mountain, Waves];

  return (
    <section 
      id="peta" 
      className="relative w-full min-h-[850px] lg:min-h-[950px] py-24 flex items-center bg-[#050810] overflow-hidden"
    >
      
      {/* ========================================== */}
      {/* LAYER 1: PETA & PIN */}
      {/* ========================================== */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] md:w-[110%] lg:w-full max-w-[1600px] z-0 pointer-events-auto flex items-center justify-center">
        <div className="relative w-full h-auto">
          <img 
            src="/Peta/bg.png" 
            alt="Peta Komodo" 
            className="w-full h-auto object-contain opacity-90 drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          />
          
          {/* TITIK PETA INTERAKTIF */}
          {mapLocations.map((loc) => (
            <div key={loc.id} className="absolute group z-20 -translate-x-1/2 -translate-y-1/2" style={{ top: loc.top, left: loc.left }}>
              <div className="relative flex items-center justify-center cursor-pointer">
                <div className="absolute w-5 h-5 md:w-8 md:h-8 bg-emerald-400/40 rounded-full animate-ping"></div>
                <div className="relative z-10 bg-emerald-600 border-2 border-emerald-300 text-white p-1.5 md:p-2.5 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.8)] group-hover:bg-yellow-400 group-hover:border-white group-hover:text-slate-950 group-hover:scale-125 transition-all duration-300">
                  <MapPin className="fill-current w-3 h-3 md:w-4 md:h-4" />
                </div>
              </div>

              {/* Tooltip Deskripsi Destinasi */}
              <div className={`absolute left-1/2 -translate-x-1/2 w-44 md:w-52 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl shadow-2xl p-2.5 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none z-50 ${loc.position === 'bottom' ? 'top-full mt-3 md:mt-4 origin-top' : 'bottom-full mb-3 md:mb-4 origin-bottom'}`}>
                <img src={loc.img} alt={loc.name} className="w-full h-20 md:h-24 object-cover rounded-xl mb-2.5 border border-slate-800" />
                <h4 className="font-serif font-bold text-white text-xs md:text-sm leading-snug">{loc.name}</h4>
                <p className="text-[10px] md:text-xs text-slate-300 leading-relaxed mt-1 font-medium">{loc.desc}</p>
                <div className={`absolute left-1/2 -translate-x-1/2 border-[6px] md:border-[8px] border-transparent ${loc.position === 'bottom' ? 'bottom-full border-b-slate-900' : 'top-full border-t-slate-900'}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-black/30 lg:bg-black/10 z-0 pointer-events-none"></div>

      {/* ========================================== */}
      {/* LAYER 2: UI (STATISTIK KIRI & DO/DONTS KANAN) */}
      {/* ========================================== */}
      <div className="w-full relative z-30 pointer-events-none">
        
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 w-full">
          
          {/* KOLOM KIRI: TEKS & STATISTIK */}
          <div className="w-full lg:w-auto lg:max-w-md flex flex-col justify-center space-y-10 pl-6 md:pl-12 lg:pl-16 xl:pl-24 pointer-events-auto">
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
            <div className="space-y-4 max-w-xs">
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
          <div className="w-full lg:w-auto lg:max-w-[28rem] flex justify-end pointer-events-auto mt-10 lg:mt-0">
            <ScrollReveal delay={300} className="w-full">
              <div className="bg-[#0b121a]/85 backdrop-blur-2xl border border-slate-700/80 rounded-none md:rounded-l-[2rem] p-7 md:p-9 shadow-2xl w-full">
                
                <h3 className="text-yellow-500 text-xl md:text-2xl font-serif font-bold mb-2 tracking-wide">
                  {t.dodontTitle}
                </h3>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-8">
                  {t.dodontDesc}
                </p>

                {/* DO SECTION */}
                <div className="mb-8">
                  <h4 className="text-emerald-400 font-bold text-sm mb-4 uppercase tracking-widest inline-block">
                    {t.doTitle}
                  </h4>
                  <ul className="space-y-4">
                    {t.doList.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-3.5">
                        <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                        <span className="text-slate-200 text-xs md:text-sm font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* DON'T SECTION */}
                <div>
                  <h4 className="text-rose-400 font-bold text-sm mb-4 uppercase tracking-widest inline-block">
                    {t.dontTitle}
                  </h4>
                  <ul className="space-y-4">
                    {t.dontList.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-3.5">
                        {idx === t.dontList.length - 1 ? (
                          <Ban size={18} className="text-rose-500 shrink-0" />
                        ) : (
                          <XCircle size={18} className="text-rose-500 shrink-0" />
                        )}
                        <span className="text-slate-200 text-xs md:text-sm font-medium">{item}</span>
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