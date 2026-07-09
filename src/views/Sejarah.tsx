"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, ShieldCheck, Landmark, Leaf } from 'lucide-react';

// IMPORT CONTEXT BAHASA DAN DICTIONARY
import { useLanguage } from '@/components/LanguageContext';
import { dict } from '@/data/dictionary';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Sejarah() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const img1Ref = useRef<HTMLImageElement>(null);
  const img2Ref = useRef<HTMLImageElement>(null);
  const img3Ref = useRef<HTMLImageElement>(null);
  
  const timelineRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);

  // PANGGIL STATE BAHASA AKTIF
  const { lang } = useLanguage();
  const t = dict[lang].sejarah;

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3500",
          scrub: 1,         
          pin: true,        
        }
      });

      tl.to({}, { duration: 0.8 })

      // SCENE 1: TIMELINE HILANG, Gambar 3 -> Gambar 1, Teks 1 Muncul
        .to(timelineRef.current, { opacity: 0, x: 50, duration: 1 }) 
        .to(img3Ref.current, { opacity: 0, scale: 0.85, duration: 1 }, "<")
        .to(img1Ref.current, { opacity: 1, scale: 1, duration: 1 }, "<")
        .to(text1Ref.current, { opacity: 1, y: 0, duration: 1 }, "<")
        
        .to({}, { duration: 0.8 }) 

      // SCENE 2: Gambar 1 & Teks 1 hilang, Gambar 2 & Teks 2 Muncul
        .to(text1Ref.current, { opacity: 0, y: -20, duration: 1 }) 
        .to(img1Ref.current, { opacity: 0, scale: 0.9, duration: 1 }, "<")
        .to(img2Ref.current, { opacity: 1, scale: 1, duration: 1 }, "<")
        .to(text2Ref.current, { opacity: 1, y: 0, duration: 1 }, "<")
        
        .to({}, { duration: 0.8 }); 
        
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="sejarah" ref={containerRef} className="w-full">
      <section ref={sectionRef} className="relative h-[100dvh] min-h-[650px] w-full bg-[#050810] flex items-center justify-center overflow-hidden">
        
        {/* ========================================== */}
        {/* BACKGROUND IMAGE YANG SUDAH DIPERBAIKI     */}
        {/* ========================================== */}
        <div className="absolute inset-0 z-0 bg-black">
          <img 
            src="/sejarah/bg.png" 
            alt="Background Sejarah" 
            className="w-full h-full object-cover object-center opacity-100 transition-transform duration-1000 ease-out" 
          />
          {/* Overlay Tipis: Cukup 20% agar warna asli gambar tetap menonjol */}
          <div className="absolute inset-0 bg-[#050810]/20 pointer-events-none"></div>
          {/* Gradient Bawah Tipis: Hanya untuk memastikan teks di bagian bawah tetap terbaca */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050810]/70 via-transparent to-transparent pointer-events-none"></div>
        </div>

        {/* ========================================== */}
        {/* GAMBAR UTAMA GSAP SCROLL                   */}
        {/* ========================================== */}
        <div className="relative w-full max-w-2xl h-[45vh] md:h-[60vh] translate-y-20 md:translate-y-40 z-10 flex items-center justify-center pointer-events-none">
          <img ref={img3Ref} src="/Home/3.png" alt="Komodo Dorsal View" className="absolute inset-0 w-full h-full object-contain opacity-100 drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]" />
          <img ref={img1Ref} src="/Home/1.png" alt="Komodo Side View" className="absolute inset-0 w-full h-full object-contain opacity-0 scale-95 drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]" />
          <img ref={img2Ref} src="/Home/2.png" alt="Komodo Active View" className="absolute inset-0 w-full h-full object-contain opacity-0 scale-95 drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]" />
        </div>

        {/* ========================================== */}
        {/* KONTAINER TEKS & TIMELINE ANIMASI GSAP     */}
        {/* ========================================== */}
        <div className="absolute inset-0 container mx-auto px-6 z-20 pointer-events-none flex flex-col justify-between py-12 md:py-16">
          
          {/* 1. TIMELINE -> SCENE 0 */}
          <div 
            ref={timelineRef} 
            className="absolute bottom-[8%] md:bottom-auto md:top-[50%] left-6 right-6 md:left-auto md:right-12 md:-translate-y-1/2 md:w-80 opacity-100 transition-all pointer-events-auto select-text z-30 bg-black/50 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-5 md:p-0 rounded-2xl border border-white/10 md:border-none"
          >
            <div className="relative pl-6 md:pl-8 space-y-4 md:space-y-6">
              <div className="absolute left-3 md:left-4 top-2 bottom-2 w-[1.5px] bg-gradient-to-b from-emerald-500 via-emerald-600/60 to-transparent"></div>

              {/* Item 1 */}
              <div className="relative group">
                <div className="absolute -left-6 md:-left-8 top-0 w-6 h-6 md:w-8 md:h-8 rounded-full border border-emerald-500 bg-[#050810]/90 backdrop-blur-md flex items-center justify-center text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                  <Search className="w-3 h-3 md:w-3.5 md:h-3.5" />
                </div>
                <div>
                  <h4 className="text-yellow-400 font-bold text-xs md:text-base leading-none mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] transition-all duration-300">{t.timeline1Year}</h4>
                  <p className="text-white text-[10px] md:text-sm font-medium leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] transition-all duration-300">{t.timeline1Desc}</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="relative group">
                <div className="absolute -left-6 md:-left-8 top-0 w-6 h-6 md:w-8 md:h-8 rounded-full border border-emerald-500 bg-[#050810]/90 backdrop-blur-md flex items-center justify-center text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                  <ShieldCheck className="w-3 h-3 md:w-3.5 md:h-3.5" />
                </div>
                <div>
                  <h4 className="text-yellow-400 font-bold text-xs md:text-base leading-none mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] transition-all duration-300">{t.timeline2Year}</h4>
                  <p className="text-white text-[10px] md:text-sm font-medium leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] transition-all duration-300">{t.timeline2Desc}</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="relative group">
                <div className="absolute -left-6 md:-left-8 top-0 w-6 h-6 md:w-8 md:h-8 rounded-full border border-emerald-500 bg-[#050810]/90 backdrop-blur-md flex items-center justify-center text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                  <Landmark className="w-3 h-3 md:w-3.5 md:h-3.5" />
                </div>
                <div>
                  <h4 className="text-yellow-400 font-bold text-xs md:text-base leading-none mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] transition-all duration-300">{t.timeline3Year}</h4>
                  <p className="text-white text-[10px] md:text-sm font-medium leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] transition-all duration-300">{t.timeline3Desc}</p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="relative group">
                <div className="absolute -left-6 md:-left-8 top-0 w-6 h-6 md:w-8 md:h-8 rounded-full border border-emerald-500 bg-[#050810]/90 backdrop-blur-md flex items-center justify-center text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                  <Leaf className="w-3 h-3 md:w-3.5 md:h-3.5" />
                </div>
                <div>
                  <h4 className="text-yellow-400 font-bold text-xs md:text-base leading-none mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] transition-all duration-300">{t.timeline4Year}</h4>
                  <p className="text-white text-[10px] md:text-sm font-medium leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] transition-all duration-300">{t.timeline4Desc}</p>
                </div>
              </div>

            </div>
          </div>

          {/* 2. TEKS 1 (GAMBAR 1) -> SCENE 1 */}
          <div 
            ref={text1Ref} 
            className="absolute top-[20%] md:top-28 left-6 right-6 md:left-12 md:right-auto md:w-5/12 opacity-0 translate-y-8 text-left pointer-events-auto select-text z-30"
          >
            <span className="text-emerald-400 font-bold uppercase tracking-[0.25em] text-[10px] md:text-xs mb-1 md:mb-2 block drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] transition-all duration-300">
              {t.text1Sub}
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-white mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] transition-all duration-300">
              {t.text1Title}
            </h2>
            <div className="border-l-2 border-emerald-500 pl-4 bg-black/40 md:bg-black/20 backdrop-blur-md md:backdrop-blur-xs py-2.5 pr-3 rounded-r-xl transition-all duration-300">
              <p className="text-xs md:text-lg text-slate-100 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] font-normal transition-all duration-300">
                {t.text1Desc}
              </p>
            </div>
          </div>

          {/* 3. TEKS 2 (GAMBAR 2) -> SCENE 2 */}
          <div 
            ref={text2Ref} 
            className="absolute bottom-[10%] md:bottom-20 left-6 right-6 md:right-12 md:left-auto md:w-5/12 opacity-0 translate-y-8 text-left md:text-right pointer-events-auto select-text z-30"
          >
            <span className="text-yellow-400 font-bold uppercase tracking-[0.25em] text-[10px] md:text-xs mb-1 md:mb-2 block drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] transition-all duration-300">
              {t.text2Sub}
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] transition-all duration-300">
              {t.text2Title}
            </h2>
            <div className="border-l-2 md:border-l-0 md:border-r-2 border-yellow-500 pl-4 md:pl-0 md:pr-4 bg-black/40 md:bg-black/20 backdrop-blur-md md:backdrop-blur-xs py-2.5 pr-3 rounded-r-xl md:rounded-r-none md:rounded-l-xl transition-all duration-300">
              <p className="text-xs md:text-lg text-slate-100 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] font-normal transition-all duration-300">
                {t.text2Desc}
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}