"use client";

import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Compass, Ticket, Briefcase, Shield, MapPin, Fish, Camera, Phone, ShieldCheck, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';

// IMPORT CONTEXT DAN DATA DESTINASI
import { useLanguage } from '@/components/LanguageContext';
import { destinasiData } from '@/data/destinasi';

interface Message {
  sender: 'bot' | 'user';
  text: string;
}

export default function EcoKomodoBot() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // AMBIL STATE BAHASA SECARA GLOBAL
  const { lang } = useLanguage();

  // ==========================================
  // FUNGSI PENGECEK WAKTU UNTUK SAPAAN (GREETING)
  // ==========================================
  const getTimeGreeting = (language: string) => {
    const hour = new Date().getHours();
    if (language === 'id') {
      if (hour >= 4 && hour < 11) return "Selamat Pagi";
      if (hour >= 11 && hour < 15) return "Selamat Siang";
      if (hour >= 15 && hour < 18) return "Selamat Sore";
      return "Selamat Malam";
    } else {
      if (hour >= 4 && hour < 12) return "Good Morning";
      if (hour >= 12 && hour < 17) return "Good Afternoon";
      return "Good Evening";
    }
  };

  // ==========================================
  // DATA BAHASA KHUSUS CHATBOT
  // ==========================================
  const botData = {
    id: {
      title: "EcoKomodo Bot",
      status: "Always online",
      greeting: "Saya asisten AI EcoKomodo. Saya siap membantu Anda merencanakan petualangan impian ke Taman Nasional Komodo.\n\nAda yang bisa saya bantu?",
      inputPlaceholder: "Ketik pertanyaan Anda...",
      trustBadge: "Informasi dari sumber resmi & terpercaya",
      quickActionLabel: "Quick Actions",
      actions: [
        { id: 'booking', label: 'Booking', icon: Compass },
        { id: 'harga', label: 'Harga', icon: Ticket },
        { id: 'packing', label: 'Packing', icon: Briefcase },
        { id: 'keselamatan', label: 'Keselamatan', icon: Shield },
        { id: 'destinasi', label: '10 Destinasi', icon: MapPin },
        { id: 'diving', label: 'Diving', icon: Fish },
        { id: 'fotospot', label: 'Foto Spot', icon: Camera },
        { id: 'kontak', label: 'Kontak', icon: Phone }
      ],
      responses: {
        harga: `Tentu! Berikut adalah daftar resmi harga tiket/trip untuk 10 destinasi unggulan kami:\n\n${destinasiData.map((d, i) => `${i+1}. 🏝️ **${d.nama}**\n   💰 ${d.harga}`).join('\n\n')}\n\n*Catatan: Harga di atas merupakan estimasi per orang dan sudah termasuk akses konservasi.*`,
        kontak: "📍 **Hubungi Kami:**\n\n🏢 **Alamat Kantor:**\nJl. Marina Labuan Bajo No. 8, Manggarai Barat, Nusa Tenggara Timur, Indonesia 86554\n\n📞 **WhatsApp:** +62 812-3456-7890\n✉️ **Email:** info@orahakomodo.id\n🌐 **Website:** www.orahakomodo.id\n\n⏰ **Jam Operasional:** Senin - Minggu (08:00 - 18:00 WITA)",
        destinasi: `🌍 **Daftar 10 Destinasi Eksotis ORAHA:**\n\n${destinasiData.map((d, i) => `${i+1}. **${d.nama}** (${d.lokasi})\n   ⭐ Rating: ${d.rating}/5.0`).join('\n\n')}\n\n💡 *Ketik nama destinasi atau ketik 'Harga' untuk melihat rincian biayanya.*`,
        packing: `🎒 **Daftar Packing Wajib ke Komodo:**\n\n👕 **Pakaian:** Kaos berbahan dingin/breathable, celana pendek pantai, celana panjang trekking, jaket angin ringan.\n👟 **Alas Kaki:** Sepatu trekking/hiking dengan grip kuat & sandal air/pantai.\n🏖️ **Perlengkapan:** Sunscreen SPF 50+, kacamata hitam, topi lebar, handuk cepat kering.\n📱 **Elektronik:** Kamera underwater (GoPro/HP dengan waterproof case), Powerbank, memori cadangan.\n💊 **Obat-obatan:** Antiseptik, plester, obat anti-mabuk laut, dan vitamin.`,
        keselamatan: `🛡️ **Aturan & Tips Keselamatan:**\n\n1. 🐉 **Jarak Aman Satwa:** Selalu patuhi Ranger resmi dan jaga jarak minimal 5 meter dari Komodo liar.\n2. 🚫 **Larangan Mandiri:** Dilarang berjalan sendirian keluar dari jalur trekking savana yang ditentukan.\n3. ☀️ **Cegah Dehidrasi:** Suhu di Padar dan Rinca sangat terik, selalu bawa minimal 1-2 liter air minum.\n4. 🌊 **Keselamatan Laut:** Wajib mengenakan Life Jacket selama kapal berlayar atau saat arus snorkeling kencang.`,
        diving: `🤿 **Informasi Menyelam (Diving):**\n\nTaman Nasional Komodo adalah surga bawah laut kelas dunia! Spot diving terbaik kami ada di **Batu Bolong**, **Manta Point**, dan **Taka Makasar**.\n\nAnda dapat bertemu langsung dengan Pari Manta raksasa, penyu laut, dan terumbu karang warna-warni yang padat.\n\n💰 **Estimasi Paket Diving:** Mulai dari IDR 600.000 / orang (Fun Dive).`,
        fotospot: `📷 **Rekomendasi Spot Foto Paling Ikonik:**\n\n1. 🌅 **Puncak Pulau Padar:** Pemandangan 3 lekukan pantai berpasir Putih, Hitam, dan Pink sekaligus.\n2. 💖 **Pink Beach:** Kontras air laut pirus jernih dengan pasir merah muda alami.\n3. 🦇 **Pulau Kalong:** Siluet ribuan kelelawar terbang saat matahari terbenam (Golden Hour).\n4. 🐉 **Loh Liang & Rinca:** Berfoto dengan latar belakang satwa Komodo (dibantu oleh Ranger).`,
        booking: `📅 **Cara Mudah Melakukan Pemesanan (Booking):**\n\n1. **Melalui Website:** Klik menu **'Paket Wisata'** di navigasi atas untuk melihat jadwal trip terbuka.\n2. **Melalui WhatsApp:** Hubungi tim reservasi kami secara cepat di nomor **+62 812-3456-7890**.\n\n✨ *Kami menyediakan paket Open Trip (harian/2D1N/3D2N) hingga Private Charter Phinisi.*`,
        kondom: `🐉 **Fakta Menarik Satwa Komodo (Varanus komodoensis):**\n\n• Merupakan kadal terbesar di dunia yang tersisa dari zaman purba.\n• Dapat tumbuh hingga panjang 3 meter dengan berat mencapai 100 kg.\n• Memiliki penciuman sangat tajam (hingga jarak 4-9 km menggunakan lidahnya).\n• Hanya dapat ditemukan secara alami di 5 pulau di Nusa Tenggara Timur, Indonesia!`,
        fungsi: "ORAHA adalah portal ekowisata resmi yang dirancang untuk membantu Anda menjelajahi keajaiban Pulau Komodo dengan aman, nyaman, dan tetap menjunjung tinggi prinsip pariwisata berkelanjutan (sustainable tourism).",
        default: "Maaf, saya belum memahami instruksi tersebut. Silakan pilih tombol menu di atas atau coba ketik: **'Harga'**, **'10 Destinasi'**, **'Kontak'**, **'Booking'**, atau **'Diving'**."
      }
    },
    en: {
      title: "EcoKomodo Bot",
      status: "Always online",
      greeting: "I am the EcoKomodo AI assistant. I am ready to help you plan your dream adventure to Komodo National Park.\n\nHow can I help you?",
      inputPlaceholder: "Type your question...",
      trustBadge: "Information from official & trusted sources",
      quickActionLabel: "Quick Actions",
      actions: [
        { id: 'booking', label: 'Booking', icon: Compass },
        { id: 'harga', label: 'Prices', icon: Ticket },
        { id: 'packing', label: 'Packing', icon: Briefcase },
        { id: 'keselamatan', label: 'Safety', icon: Shield },
        { id: 'destinasi', label: '10 Spots', icon: MapPin },
        { id: 'diving', label: 'Diving', icon: Fish },
        { id: 'fotospot', label: 'Photo Spots', icon: Camera },
        { id: 'kontak', label: 'Contact', icon: Phone }
      ],
      responses: {
        harga: `Sure! Here is the official price list for our top 10 destinations:\n\n${destinasiData.map((d, i) => `${i+1}. 🏝️ **${d.nama}**\n   💰 ${d.harga.replace('orang', 'person')}`).join('\n\n')}\n\n*Note: Prices above are estimated per person and include conservation access.*`,
        kontak: "📍 **Contact Us:**\n\n🏢 **Office Address:**\nJl. Marina Labuan Bajo No. 8, West Manggarai, East Nusa Tenggara, Indonesia 86554\n\n📞 **WhatsApp:** +62 812-3456-7890\n✉️ **Email:** info@orahakomodo.id\n🌐 **Website:** www.orahakomodo.id\n\n⏰ **Operating Hours:** Monday - Sunday (08:00 - 18:00 WITA)",
        destinasi: `🌍 **List of 10 Exotic ORAHA Destinations:**\n\n${destinasiData.map((d, i) => `${i+1}. **${d.nama}** (${d.lokasi})\n   ⭐ Rating: ${d.rating}/5.0`).join('\n\n')}\n\n💡 *Type a destination name or type 'Prices' to see the cost details.*`,
        packing: `🎒 **Essential Packing List for Komodo:**\n\n👕 **Clothing:** Breathable light T-shirts, beach shorts, trekking pants, light windbreaker jacket.\n👟 **Footwear:** Hiking/trekking shoes with strong grip & water/beach sandals.\n🏖️ **Gear:** Sunscreen SPF 50+, sunglasses, wide-brim hat, quick-dry towel.\n📱 **Electronics:** Underwater camera (GoPro/phone with waterproof case), Powerbank, spare memory.\n💊 **Medical:** Antiseptic, bandages, seasickness pills, and personal vitamins.`,
        keselamatan: `🛡️ **Safety Rules & Tips:**\n\n1. 🐉 **Safe Distance:** Always follow official Rangers and keep a minimum distance of 5 meters from wild Komodos.\n2. 🚫 **No Wandering:** Walking alone off the designated savanna trekking trails is strictly prohibited.\n3. ☀️ **Prevent Dehydration:** Temperatures in Padar and Rinca are extreme, always carry at least 1-2 liters of drinking water.\n4. 🌊 **Sea Safety:** Mandatory wearing of Life Jackets while sailing or during strong current snorkeling.`,
        diving: `🤿 **Diving Information:**\n\nKomodo National Park is a world-class underwater paradise! Our top diving spots are located at **Batu Bolong**, **Manta Point**, and **Taka Makasar**.\n\nYou can interact directly with giant Manta Rays, sea turtles, and dense colorful coral reefs.\n\n💰 **Diving Package Estimate:** Starts from IDR 600,000 / person (Fun Dive).`,
        fotospot: `📷 **Most Iconic Photo Spot Recommendations:**\n\n1. 🌅 **Padar Island Peak:** Legendary view of 3 crescent beaches with White, Black, and Pink sands simultaneously.\n2. 💖 **Pink Beach:** Stunning contrast of turquoise clear water with natural pink sand.\n3. 🦇 **Kalong Island:** Silhouettes of thousands of fruit bats flying during sunset (Golden Hour).\n4. 🐉 **Loh Liang & Rinca:** Take pictures with wild Komodo dragons in the background (assisted by Rangers).`,
        booking: `📅 **How to Make a Booking Easily:**\n\n1. **Via Website:** Click the **'Tour Packages'** menu in the top navigation to see available trip schedules.\n2. **Via WhatsApp:** Contact our reservation team quickly at **+62 812-3456-7890**.\n\n✨ *We provide Open Trips (daily/2D1N/3D2N) to Private Phinisi Charters.*`,
        kondom: `🐉 **Interesting Facts About Komodo Dragons (Varanus komodoensis):**\n\n• The world's largest living lizard remaining from prehistoric times.\n• Can grow up to 3 meters in length and weigh up to 100 kg.\n• Possesses a very sharp sense of smell (up to 4-9 km away using their forked tongue).\n• Can only be found naturally on 5 islands in East Nusa Tenggara, Indonesia!`,
        fungsi: "ORAHA is the official ecotourism portal designed to help you explore the wonders of Komodo Island safely and comfortably, while upholding sustainable tourism principles.",
        default: "Sorry, I didn't quite catch that. Please choose a menu button above or try typing: **'Prices'**, **'10 Spots'**, **'Contact'**, **'Booking'**, or **'Diving'**."
      }
    }
  };

  const t = botData[lang];
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: `${getTimeGreeting(lang)}! 👋 ${t.greeting}` }
  ]);

  // Reset chat & sapaan waktu ketika bahasa diubah di navbar
  useEffect(() => {
    setMessages([{ sender: 'bot', text: `${getTimeGreeting(lang)}! 👋 ${t.greeting}` }]);
  }, [lang]);

  // Auto-scroll ke pesan terbaru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // ==========================================
  // LOGIKA PENCARIAN KATA KUNCI CHATBOT
  // ==========================================
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInputValue('');

    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let botReply = t.responses.default;

      // 1. CEK KATA SAPAAN / GREETING DARI USER
      if (
        lowerText === 'hai' || lowerText === 'halo' || lowerText === 'hallo' || 
        lowerText === 'hello' || lowerText === 'hi' || lowerText === 'hey' || 
        lowerText.includes('pagi') || lowerText.includes('siang') || 
        lowerText.includes('sore') || lowerText.includes('malam') ||
        lowerText.includes('morning') || lowerText.includes('afternoon') || 
        lowerText.includes('evening')
      ) {
        const currentGreet = getTimeGreeting(lang);
        botReply = lang === 'id'
          ? `${currentGreet}! 👋 Halo, senang bertemu dengan Anda! Ada yang bisa saya bantu terkait wisata di Taman Nasional Komodo? Silakan pilih menu di bawah atau ketik pertanyaan Anda.`
          : `${currentGreet}! 👋 Hello, nice to meet you! How can I assist you with your trip to Komodo National Park? Please choose a quick action below or type your question.`;
      
      // 2. CEK KATA KUNCI LAINNYA
      } else if (lowerText.includes('harga') || lowerText.includes('price') || lowerText.includes('biaya') || lowerText.includes('cost') || lowerText.includes('tiket')) {
        botReply = t.responses.harga;
      } else if (lowerText.includes('kontak') || lowerText.includes('contact') || lowerText.includes('hubungi') || lowerText.includes('whatsapp') || lowerText.includes('wa') || lowerText.includes('alamat')) {
        botReply = t.responses.kontak;
      } else if (lowerText.includes('destinasi') || lowerText.includes('tempat') || lowerText.includes('spot') || lowerText.includes('location') || lowerText.includes('destination') || lowerText.includes('wisata') || lowerText.includes('10')) {
        botReply = t.responses.destinasi;
      } else if (lowerText.includes('fungsi') || lowerText.includes('apa itu') || lowerText.includes('about') || lowerText.includes('oraha') || lowerText.includes('web')) {
        botReply = t.responses.fungsi;
      } else if (lowerText.includes('booking') || lowerText.includes('pesan') || lowerText.includes('reserve') || lowerText.includes('order') || lowerText.includes('daftar')) {
        botReply = t.responses.booking;
      } else if (lowerText.includes('packing') || lowerText.includes('packed') || lowerText.includes('bawa') || lowerText.includes('barang') || lowerText.includes('persiapan')) {
        botReply = t.responses.packing;
      } else if (lowerText.includes('keselamatan') || lowerText.includes('safety') || lowerText.includes('aman') || lowerText.includes('danger') || lowerText.includes('tips')) {
        botReply = t.responses.keselamatan;
      } else if (lowerText.includes('diving') || lowerText.includes('dive') || lowerText.includes('menyelam') || lowerText.includes('underwater') || lowerText.includes('snorkeling') || lowerText.includes('manta')) {
        botReply = t.responses.diving;
      } else if (lowerText.includes('foto') || lowerText.includes('photo') || lowerText.includes('picture') || lowerText.includes('kamera') || lowerText.includes('ig') || lowerText.includes('instagram')) {
        botReply = t.responses.fotospot;
      } else if (lowerText.includes('komodo') || lowerText.includes('dragon') || lowerText.includes('hewan') || lowerText.includes('kadal')) {
        botReply = t.responses.kondom;
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    }, 500);
  };

  return (
    <>
      {/* TOMBOL FLOATING CHAT */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[1000] w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.5)] border border-yellow-400/40 transition-all duration-300 hover:scale-110 cursor-pointer"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} className="animate-pulse" />}
      </button>

      {/* JENDELA CHATBOT (POSISI DITURUNKAN KE bottom-20) */}
      <div className={`fixed bottom-20 right-6 z-[999] w-[350px] md:w-[390px] h-[550px] bg-[#070d14] border border-slate-800/80 rounded-3xl shadow-[0_15px_50px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        
        {/* HEADER DENGAN LOGO YANG TELAH DIPERBAIKI */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800/80 bg-[#09121a] backdrop-blur-md">
          <div className="flex items-center gap-3">
            {/* LINGKARAN LOGO TANPA TERPOTONG BERLEBIH */}
            <div className="relative w-11 h-11 rounded-full border-2 border-yellow-500/80 overflow-hidden bg-[#050810] flex items-center justify-center p-1 shadow-[0_0_12px_rgba(234,179,8,0.25)]">
              <img 
                src="/Home/logo.png" 
                alt="ORAHA Logo" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }} 
              />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#09121a] rounded-full"></div>
            </div>
            <div>
              <h3 className="text-white font-serif font-bold text-sm tracking-wide leading-tight">{t.title}</h3>
              <p className="text-emerald-400 text-[10px] font-semibold tracking-wider uppercase mt-0.5">{t.status}</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-yellow-400 p-1.5 rounded-full hover:bg-slate-800/50 transition-colors cursor-pointer">
            <X size={18} />
          </button>
        </div>

        {/* AREA CHAT HISTORY */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gradient-to-b from-[#070d14] via-[#091018] to-[#070d14] hide-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3.5 text-xs md:text-sm rounded-2xl whitespace-pre-wrap leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-tr-sm shadow-md' 
                  : 'bg-[#0e1621] border border-slate-700/80 text-slate-200 rounded-tl-sm shadow-lg'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* AREA QUICK ACTIONS */}
        <div className="border-t border-slate-800/80 bg-[#09121a]/95">
          <button 
            onClick={() => setShowQuickActions(!showQuickActions)}
            className="w-full flex items-center justify-between py-2.5 px-4 hover:bg-slate-800/30 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2 flex-1">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-yellow-500/40"></div>
              <span className="text-[10px] text-yellow-400 font-bold uppercase tracking-widest">{t.quickActionLabel}</span>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-yellow-500/40"></div>
            </div>
            <div className="ml-2 text-yellow-400">
              {showQuickActions ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </div>
          </button>

          {/* GRID TOMBOL QUICK ACTION */}
          <div className={`overflow-hidden transition-all duration-300 ${showQuickActions ? 'max-h-[200px]' : 'max-h-0'}`}>
            <div className="px-4 pb-3">
              <div className="grid grid-cols-2 gap-2">
                {t.actions.map((action) => (
                  <button 
                    key={action.id}
                    onClick={() => handleSendMessage(action.label)}
                    className="flex items-center gap-2 border border-slate-700/80 bg-[#111c27] hover:bg-emerald-950/60 hover:border-emerald-500/80 text-slate-300 hover:text-white text-[11px] font-medium py-2 px-3 rounded-xl transition-all duration-200 shadow-sm cursor-pointer"
                  >
                    <action.icon size={13} className="text-emerald-400 shrink-0" />
                    <span className="truncate">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AREA INPUT CHAT */}
        <div className="p-3.5 border-t border-slate-800/80 bg-[#060a10]">
          <div className="relative flex items-center">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              placeholder={t.inputPlaceholder}
              className="w-full bg-[#0d1620] border border-slate-700/80 rounded-full py-2.5 pl-4 pr-12 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors shadow-inner"
            />
            <button 
              onClick={() => handleSendMessage(inputValue)}
              className="absolute right-1 w-8 h-8 flex items-center justify-center bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 rounded-full text-white transition-all shadow-md hover:scale-105 cursor-pointer"
            >
              <Send size={13} className="-ml-0.5" />
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-1.5 mt-2.5 text-slate-500">
            <ShieldCheck size={11} className="text-emerald-500/80" />
            <span className="text-[9px] tracking-wide">{t.trustBadge}</span>
          </div>
        </div>

      </div>
    </>
  );
}