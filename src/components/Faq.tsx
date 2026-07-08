"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/components/LanguageContext';
import { dict } from '@/data/dictionary';

export default function Faq() {
  const { lang } = useLanguage();
  const t = dict[lang]?.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!t) return null;

  return (
    <section className="relative py-24 px-6 md:px-12 overflow-hidden">
      {/* BACKGROUND IMAGE DENGAN FILTER BRIGHTNESS */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/Faq/bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(1.4)' // Nilai > 1.0 akan membuat gambar lebih terang
        }}
      ></div>
      
      {/* OVERLAY DITURUNKAN OPACITY-NYA AGAR GAMBAR LEBIH TERANG */}
      <div className="absolute inset-0 bg-[#050810]/40 z-0"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t.title1} <span className="text-emerald-500">{t.title2}</span>
            </h2>
            <p className="text-slate-200 text-lg drop-shadow-md">
              {t.desc}
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {t.data.map((faq: any, index: number) => {
            const isOpen = openIndex === index;
            return (
              <ScrollReveal key={index} delay={index * 100}>
                <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'bg-slate-900/90 border-emerald-500' : 'bg-slate-900/60 border-slate-700/50 hover:bg-slate-900/80'
                }`}>
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left"
                  >
                    <span className={`font-bold text-lg pr-4 transition-colors ${isOpen ? 'text-emerald-400' : 'text-white'}`}>
                      {faq.question}
                    </span>
                    <ChevronDown 
                      className={`text-emerald-500 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
                      size={24} 
                    />
                  </button>

                  <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-slate-200 leading-relaxed font-medium">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}