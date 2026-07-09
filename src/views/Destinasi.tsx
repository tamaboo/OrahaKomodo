"use client";

import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

import { destinasiData } from '@/data/destinasi'; 
import DetailDestinasiModal from '@/components/DetailDestinasiModal';

// 1. IMPORT CONTEXT BAHASA DAN DICTIONARY
import { useLanguage } from '@/components/LanguageContext';
import { dict } from '@/data/dictionary';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Destinasi() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const [selectedDest, setSelectedDest] = useState<any>(null);

  // 2. PANGGIL STATE BAHASA AKTIF & DICTIONARY
  const { lang } = useLanguage();
  const t = dict[lang].destinasi;

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.fromTo(headerRef.current, 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } }
        );

        gsap.fromTo(carouselRef.current, 
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
        );
        ScrollTrigger.refresh();
      }, sectionRef);
      return () => ctx.revert();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedDest) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedDest]);

  return (
    <>
      <section ref={sectionRef} id="destinasi" className="relative w-full pt-40 pb-20 md:py-28 bg-[#050810] overflow-hidden">
        
        {/* BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/Destinasi/bg.png" 
            alt="Background Destinasi" 
            className="w-full h-full object-cover object-top md:object-center opacity-45 transition-transform duration-1000 ease-out" 
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          
          {/* JUDUL (TERHUBUNG KE DICTIONARY) */}
          <div ref={headerRef} className="text-center max-w-5xl mx-auto mb-10 md:mb-16 space-y-3 md:space-y-4 opacity-0 px-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] leading-tight">
              {t.title1}<br /> {t.title2}
            </h2>
            <p className="text-slate-200 text-[10px] sm:text-xs md:text-base uppercase tracking-[0.15em] md:tracking-widest font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-xs sm:max-w-md md:max-w-none mx-auto leading-relaxed md:leading-normal">
              {t.subtitle}
            </p>
          </div>

          {/* CAROUSEL */}
          <div ref={carouselRef} className="w-full opacity-0">
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              loop={true}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 2.5, slideShadows: true }}
              modules={[EffectCoverflow, Autoplay]}
              className="w-full py-10"
            >
              {destinasiData.map((dest) => (
                <SwiperSlide key={dest.id} style={{ width: '320px', height: '450px' }} className="rounded-3xl">
                  
                  <div 
                    onClick={() => setSelectedDest(dest)}
                    className="group relative w-full h-full rounded-3xl overflow-hidden border border-slate-800/80 bg-[#050810] cursor-pointer transition-all duration-500 ease-out hover:-translate-y-3 hover:border-emerald-500/50 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)]"
                  >
                    
                    <img 
                      src={dest.img} 
                      alt={dest.nama} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110" 
                    />
                    
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500"></div>
                    
                    {/* LABEL POPULER */}
                    <div className="absolute top-4 left-4 bg-emerald-800/90 backdrop-blur-sm border border-emerald-600/30 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                      {t.popular}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-full">
                      <div className="transform translate-y-24 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                        
                        <div className="flex items-center gap-1 text-emerald-500 mb-2">
                          <MapPin size={14} />
                          <span className="text-[10px] font-bold uppercase tracking-widest">{dest.lokasi}</span>
                        </div>
                        <h3 className="text-2xl font-serif text-white mb-2">{dest.nama}</h3>
                        
                        <div className="max-h-0 opacity-0 group-hover:max-h-[200px] group-hover:opacity-100 transition-all duration-500 ease-in-out">
                          
                          {/* DESKRIPSI DINAMIS BERDASARKAN BAHASA */}
                          <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed mt-2 mb-4">
                            {lang === 'id' ? dest.desc_id : dest.desc_en}
                          </p>

                          <div className="flex items-center gap-1 text-yellow-500 mb-4">
                            <Star size={14} fill="currentColor" />
                            <span className="text-xs font-bold text-white">{dest.rating}</span>
                            <span className="text-xs text-slate-400">(280)</span>
                          </div>

                          <div className="flex items-end justify-between border-t border-slate-700/60 pt-4">
                            <div>
                              <p className="text-[10px] text-slate-400 mb-1">{t.startFrom}</p>
                              <p className="text-white font-bold text-sm">
                                {dest.harga.split(' /')[0]} <span className="text-xs text-slate-400 font-normal">{t.perPerson}</span>
                              </p>
                            </div>
                            
                            <button 
                              suppressHydrationWarning // <--- TAMBAHKAN INI DI SINI
                              onClick={(e) => {
                                e.stopPropagation(); 
                                setSelectedDest(dest);
                              }}
                              className="w-10 h-10 rounded-full bg-emerald-600/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                            >
                              <ArrowRight size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* MODAL (PASTIKAN DI DALAM MODAL JUGA MEMAKAI useLanguage() UNTUK DESKRIPSINYA) */}
      <DetailDestinasiModal 
        dest={selectedDest} 
        onClose={() => setSelectedDest(null)} 
      />
    </>
  );
}