"use client";

import React, { useState, useRef } from 'react';
import { ArrowRight, ArrowLeft, X, Calendar, CreditCard, Wallet, QrCode, Building2, ChevronLeft, CheckCircle2, Copy } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

// Data Trip dengan Terjemahan (English & Indonesia)
const trips = [
  { id: 1, title: '1 Day Trip', enTitle: '1 Day Trip', route: 'Labuan Bajo - Rinca - Padar - Pink Beach', enRoute: 'Labuan Bajo - Rinca - Padar - Pink Beach', price: 750000, type: 'normal', bgImage: '/Paket/1.jpg' },
  { id: 2, title: '2 Day 1 Night', enTitle: '2 Day 1 Night', route: 'Komodo - Manta Point - Taka Makassar - Padar', enRoute: 'Komodo - Manta Point - Taka Makassar - Padar', price: 1650000, type: 'normal', bgImage: '/Paket/2.jpg' },
  { id: 3, title: '3 Day 2 Night', enTitle: '3 Day 2 Night', route: 'Komodo - Rinca - Padar - Manta Point - Pink Beach', enRoute: 'Komodo - Rinca - Padar - Manta Point - Pink Beach', price: 2750000, type: 'popular', bgImage: '/Paket/3.jpg' },
  { id: 4, title: '4 Day 3 Night', enTitle: '4 Day 3 Night', route: 'Full Explorer + Sunset BBQ & Snorkeling Plus', enRoute: 'Full Explorer + Sunset BBQ & Snorkeling Plus', price: 3999000, promoPrice: 2999000, type: 'promo', bgImage: '/Paket/4.jpg' },
  { id: 5, title: 'Private Trip', enTitle: 'Private Trip', route: 'Custom Trip Sesuai Keinginan Anda', enRoute: 'Custom Trip Tailored to Your Wishes', price: 0, type: 'custom', bgImage: '/Paket/5.jpg' },
];

export default function PaketWisata() {
  const { lang } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [pax, setPax] = useState(1);
  const [bookingDate, setBookingDate] = useState<string>('');
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); 
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Kamus Bahasa Lokal untuk Komponen Ini
  const translations = {
    id: {
      badge: "Paket Wisata",
      title1: "Pilih",
      title2: "Petualanganmu",
      desc: "Temukan pengalaman tak terlupakan menjelajahi keindahan alam liar Komodo dan sekitarnya.",
      popular: "Populer",
      promo: "Spesial Promo",
      perPax: "/ org",
      contactUs: "Hubungi Kami",
      seeDetail: "Lihat Detail",
      modalBooking: "Detail Booking",
      modalCustom: "Custom Route",
      modalReguler: "Reguler Trip",
      selectDate: "Pilih Tanggal",
      dateRequired: "* Wajib memilih tanggal keberangkatan terlebih dahulu",
      paxCount: "Jumlah Penumpang",
      paxUnit: "Orang",
      pricePerPax: "Harga per orang",
      totalPayment: "Total Pembayaran",
      toPayment: "Lanjut ke Pembayaran",
      toWA: "Hubungi WhatsApp",
      payMethod: "Metode Pembayaran",
      payDesc: "Selesaikan pembayaran untuk mengamankan tiket Anda.",
      back: "Kembali",
      bill: "Total Tagihan",
      payNow: "Bayar Sekarang",
      changeMethod: "Ganti Metode Pembayaran",
      finishPay: "Selesaikan Pembayaran",
      payLimit: "Batas waktu pembayaran:",
      hour: "jam",
      minute: "menit",
      method: "Metode",
      copyVA: "Nomor Virtual Account BCA",
      copied: "Nomor berhasil disalin!",
      vaInst: "Gunakan m-BCA, KlikBCA, atau ATM BCA untuk melakukan transfer.",
      walletNum: "Nomor E-Wallet (GoPay/OVO/DANA)",
      walletInst: "Lakukan transfer ke nomor atas nama ORAHA ECOTOURISM.",
      scanQR: "Scan QRIS Di Bawah Ini",
      qrInst: "Mendukung GoPay, OVO, DANA, ShopeePay, dan Mobile Banking.",
      iHavePaid: "Saya Sudah Bayar",
      paySuccess: "Pembayaran Berhasil!",
      paySuccessDesc: "Terima kasih telah memesan petualangan bersama ORAHA. E-Ticket dan detail perjalanan telah dikirim.",
      tripPackage: "Paket Trip:",
      date: "Tanggal:",
      passenger: "Penumpang:",
      totalPaid: "Total Dibayar:",
      close: "Selesai & Tutup"
    },
    en: {
      badge: "Tour Packages",
      title1: "Choose Your",
      title2: "Adventure",
      desc: "Discover unforgettable experiences exploring the wild beauty of Komodo and its surroundings.",
      popular: "Popular",
      promo: "Special Promo",
      perPax: "/ pax",
      contactUs: "Contact Us",
      seeDetail: "See Details",
      modalBooking: "Booking Details",
      modalCustom: "Custom Route",
      modalReguler: "Regular Trip",
      selectDate: "Select Date",
      dateRequired: "* Departure date is required",
      paxCount: "Number of Passengers",
      paxUnit: "Pax",
      pricePerPax: "Price per person",
      totalPayment: "Total Payment",
      toPayment: "Proceed to Payment",
      toWA: "Contact WhatsApp",
      payMethod: "Payment Method",
      payDesc: "Complete your payment to secure your ticket.",
      back: "Back",
      bill: "Total Bill",
      payNow: "Pay Now",
      changeMethod: "Change Payment Method",
      finishPay: "Complete Payment",
      payLimit: "Payment time limit:",
      hour: "hours",
      minute: "minutes",
      method: "Method",
      copyVA: "BCA Virtual Account Number",
      copied: "Number successfully copied!",
      vaInst: "Use m-BCA, KlikBCA, or BCA ATM to transfer.",
      walletNum: "E-Wallet Number (GoPay/OVO/DANA)",
      walletInst: "Transfer to the number under the name ORAHA ECOTOURISM.",
      scanQR: "Scan QRIS Below",
      qrInst: "Supports GoPay, OVO, DANA, ShopeePay, and Mobile Banking.",
      iHavePaid: "I Have Paid",
      paySuccess: "Payment Successful!",
      paySuccessDesc: "Thank you for booking an adventure with ORAHA. E-Ticket and trip details have been sent.",
      tripPackage: "Trip Package:",
      date: "Date:",
      passenger: "Passengers:",
      totalPaid: "Total Paid:",
      close: "Finish & Close"
    }
  };

  const txt = translations[lang as 'id' | 'en'] || translations.id;

  // Format Rupiah
  const formatRp = (angka: number) => {
    if (angka === 0) return txt.contactUs;
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  // Fungsi Geser Kartu
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; 
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Reset Modal saat ditutup
  const closeModal = () => {
    setSelectedTrip(null);
    setPax(1);
    setBookingDate('');
    setStep(1);
    setPaymentMethod('');
    setCopied(false);
  };

  // Salin ke Clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Hitung Total
  const totalPembayaran = selectedTrip ? (selectedTrip.promoPrice || selectedTrip.price) * pax : 0;

  return (
    <>
      <section className="relative w-full py-24 bg-[#050810] overflow-hidden">
        
        {/* BACKGROUND IMAGE YANG SUDAH DIPERBAIKI POSISI DAN KECERAHANNYA */}
        <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/Paket/bg.png" 
          alt="Background Paket" 
          // MENGGUNAKAN object-top agar bagian atas (bingkai emas) TIDAK TERPOTONG
          // MENAMBAHKAN brightness-125 agar gambar jauh lebih terang dan menyala
          className="w-full h-full object-cover object-top brightness-125 opacity-100" 
        />
        {/* Overlay dikurangi dari 40% menjadi 10% agar visual pulau di belakangnya terlihat jelas */}
        <div className="absolute inset-0 bg-[#050810]/10"></div>
      </div>
        <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col xl:flex-row gap-8 items-center xl:items-stretch">
            
            {/* BAGIAN KIRI: JUDUL */}
            <div className="w-full xl:w-[320px] flex flex-col justify-center text-center xl:text-left z-10">
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-3 block drop-shadow-md">
                {txt.badge}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight drop-shadow-lg">
                {txt.title1}<br className="hidden xl:block"/> {txt.title2}
              </h2>
              <p className="text-slate-200 text-sm mb-4 hidden xl:block drop-shadow-md">
                {txt.desc}
              </p>
            </div>

            {/* BAGIAN KANAN: CAROUSEL KARTU TRIP */}
            <div className="relative w-full flex-1 min-w-0 group">
              
              <button 
                onClick={() => scroll('left')} 
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-5 z-20 w-12 h-12 bg-slate-800 rounded-full border border-slate-600 hidden md:flex items-center justify-center text-white hover:bg-emerald-600 hover:border-emerald-500 shadow-xl transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
              >
                <ArrowLeft size={20} />
              </button>

              <div 
                ref={scrollContainerRef} 
                className="flex flex-nowrap items-stretch gap-6 overflow-x-auto py-10 px-4 hide-scrollbar snap-x"
              >
                {trips.map((trip) => (
                  <div 
                    key={trip.id} 
                    className="flex-none w-[280px] snap-start relative flex flex-col transition-all duration-300 hover:-translate-y-2"
                  >
                    {/* Inner Container untuk Background & Border (Ini yang pakai overflow-hidden) */}
                    <div className={`absolute inset-0 rounded-3xl overflow-hidden border ${
                      trip.type === 'popular' ? 'border-emerald-500 shadow-[0_10px_30px_rgba(16,185,129,0.25)]' 
                      : trip.type === 'promo' ? 'border-rose-500 shadow-[0_10px_30px_rgba(244,63,94,0.25)]'
                      : 'border-slate-700'
                    }`}>
                      <div 
                        className="absolute inset-0 z-0"
                        style={{
                          backgroundImage: `url(${trip.bgImage})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      ></div>
                      {/* Overlay Gradient Kartu */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1121] via-[#0b1121]/70 to-transparent z-1"></div>
                    </div>

                    {/* BADGES (Diletakkan di luar overflow-hidden agar menonjol keluar kartu) */}
                    {trip.type === 'popular' && (
                      <div className="absolute -top-3 left-6 z-20 bg-emerald-500 text-white text-[11px] font-extrabold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-emerald-500/40">
                        {txt.popular}
                      </div>
                    )}
                    {trip.type === 'promo' && (
                      <div className="absolute -top-3 left-6 z-20 bg-rose-500 text-white text-[11px] font-extrabold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-rose-500/40 animate-pulse">
                        {txt.promo}
                      </div>
                    )}

                    {/* Content Container Di Dalam Kartu */}
                    <div className="relative z-10 flex flex-col h-full p-6">
                      <div className="flex-1 mt-4">
                        <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-md">
                          {lang === 'en' ? trip.enTitle : trip.title}
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed mb-6 drop-shadow-md">
                          {lang === 'en' ? trip.enRoute : trip.route}
                        </p>
                      </div>

                      <div className="mt-auto border-t border-slate-700/60 pt-5">
                        {trip.type === 'promo' ? (
                          <div className="mb-4">
                            <p className="text-slate-400 text-xs line-through mb-1">{formatRp(trip.price)}</p>
                            <p className="text-white font-bold text-xl drop-shadow-md">
                              {formatRp(trip.promoPrice!)} <span className="text-xs text-slate-300 font-normal">{txt.perPax}</span>
                            </p>
                          </div>
                        ) : (
                          <div className="mb-4">
                            <p className="text-white font-bold text-xl drop-shadow-md">
                              {formatRp(trip.price)} {trip.price > 0 && <span className="text-xs text-slate-300 font-normal">{txt.perPax}</span>}
                            </p>
                          </div>
                        )}

                        <button 
                          onClick={() => setSelectedTrip(trip)}
                          className="flex items-center justify-between text-sm text-white bg-slate-900/60 backdrop-blur-sm border border-slate-600 px-5 py-3 rounded-xl hover:bg-emerald-600 hover:border-emerald-600 transition-all w-full group/btn cursor-pointer"
                        >
                          {txt.seeDetail}
                          <ArrowRight size={16} className="text-emerald-400 group-hover/btn:text-white transition-colors" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => scroll('right')} 
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-5 z-20 w-12 h-12 bg-slate-800 rounded-full border border-slate-600 hidden md:flex items-center justify-center text-white hover:bg-emerald-600 hover:border-emerald-500 shadow-xl transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
              >
                <ArrowRight size={20} />
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* MODAL PEMBAYARAN & BOOKING (SUDAH FULL TERJEMAHAN)       */}
      {/* ======================================================== */}
      {selectedTrip && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-[#050810]/95 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0b1121] rounded-3xl p-6 md:p-8 max-w-md w-full relative border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] scale-in-center max-h-[90vh] overflow-y-auto hide-scrollbar">
            
            <button 
              onClick={closeModal} 
              className="absolute top-5 right-5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-full p-2 transition-colors z-10 cursor-pointer"
            >
              <X size={20}/>
            </button>

            {/* STEP 1: FORM BOOKING */}
            {step === 1 && (
              <>
                <h3 className="text-2xl font-bold text-white mb-1">{txt.modalBooking}</h3>
                <p className="text-slate-400 text-sm mb-6 pb-4 border-b border-slate-800">
                  {lang === 'en' ? selectedTrip.enTitle : selectedTrip.title} • {selectedTrip.type === 'custom' ? txt.modalCustom : txt.modalReguler}
                </p>

                <div className="space-y-5 mb-8">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">{txt.selectDate} <span className="text-rose-500">*</span></label>
                    <div className="relative">
                      <input 
                        type="date" 
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-[#1e293b]/50 border border-slate-700 focus:border-emerald-500 rounded-xl px-4 py-3.5 text-white outline-none transition-colors cursor-pointer" 
                      />
                      <Calendar size={18} className="absolute right-4 top-4 text-slate-400 pointer-events-none" />
                    </div>
                    {!bookingDate && <p className="text-rose-400 text-xs mt-1.5">{txt.dateRequired}</p>}
                  </div>

                  {selectedTrip.price > 0 && (
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">{txt.paxCount}</label>
                      <div className="relative flex items-center bg-[#1e293b]/50 border border-slate-700 rounded-xl overflow-hidden">
                        <button onClick={() => setPax(Math.max(1, pax - 1))} className="px-5 py-3.5 hover:bg-slate-700 text-white font-bold text-lg cursor-pointer">-</button>
                        <input type="text" readOnly value={`${pax} ${txt.paxUnit}`} className="w-full bg-transparent text-center text-white font-bold outline-none" />
                        <button onClick={() => setPax(pax + 1)} className="px-5 py-3.5 hover:bg-slate-700 text-white font-bold text-lg cursor-pointer">+</button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400 text-sm">{txt.pricePerPax}</span>
                    <span className="text-white font-medium">
                      {selectedTrip.price > 0 ? formatRp(selectedTrip.promoPrice || selectedTrip.price) : '-'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-800">
                    <span className="text-emerald-500 font-bold">{txt.totalPayment}</span>
                    <span className="text-emerald-500 font-bold text-xl">
                      {selectedTrip.price > 0 ? formatRp(totalPembayaran) : txt.contactUs}
                    </span>
                  </div>
                </div>

                <button 
                  disabled={selectedTrip.price > 0 && !bookingDate}
                  onClick={() => selectedTrip.price > 0 ? setStep(2) : alert('Membuka WhatsApp...')}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:border disabled:border-slate-700 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-all shadow-lg shadow-emerald-900/20 cursor-pointer disabled:cursor-not-allowed"
                >
                  {selectedTrip.price > 0 ? txt.toPayment : txt.toWA}
                  {selectedTrip.price > 0 && <ArrowRight size={18} />}
                </button>
              </>
            )}

            {/* STEP 2: METODE PEMBAYARAN */}
            {step === 2 && (
              <div className="animate-in slide-in-from-right-4 duration-300">
                <button 
                  onClick={() => setStep(1)} 
                  className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors cursor-pointer"
                >
                  <ChevronLeft size={16} /> {txt.back}
                </button>

                <h3 className="text-xl font-bold text-white mb-2">{txt.payMethod}</h3>
                <p className="text-slate-400 text-sm mb-6">{txt.payDesc}</p>

                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 flex justify-between items-center mb-6">
                  <span className="text-slate-300">{txt.bill}</span>
                  <span className="text-white font-bold text-lg">{formatRp(totalPembayaran)}</span>
                </div>

                <div className="space-y-3 mb-8">
                  <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'va' ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-700 bg-[#1e293b]/50 hover:border-slate-500'}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400"><Building2 size={16}/></div>
                      <span className="text-white font-medium">BCA Virtual Account</span>
                    </div>
                    <input type="radio" name="payment" className="w-4 h-4 accent-emerald-500" checked={paymentMethod === 'va'} onChange={() => setPaymentMethod('va')} />
                  </label>

                  <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'gopay' ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-700 bg-[#1e293b]/50 hover:border-slate-500'}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400"><Wallet size={16}/></div>
                      <span className="text-white font-medium">GoPay / e-Wallet</span>
                    </div>
                    <input type="radio" name="payment" className="w-4 h-4 accent-emerald-500" checked={paymentMethod === 'gopay'} onChange={() => setPaymentMethod('gopay')} />
                  </label>

                  <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'qris' ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-700 bg-[#1e293b]/50 hover:border-slate-500'}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400"><QrCode size={16}/></div>
                      <span className="text-white font-medium">QRIS (All Payment)</span>
                    </div>
                    <input type="radio" name="payment" className="w-4 h-4 accent-emerald-500" checked={paymentMethod === 'qris'} onChange={() => setPaymentMethod('qris')} />
                  </label>
                </div>

                <button 
                  disabled={!paymentMethod}
                  onClick={() => setStep(3)}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  <CreditCard size={20} /> {txt.payNow}
                </button>
              </div>
            )}

            {/* STEP 3: INSTRUKSI PEMBAYARAN */}
            {step === 3 && (
              <div className="animate-in slide-in-from-right-4 duration-300">
                <button 
                  onClick={() => setStep(2)} 
                  className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors cursor-pointer"
                >
                  <ChevronLeft size={16} /> {txt.changeMethod}
                </button>

                <h3 className="text-xl font-bold text-white mb-1">{txt.finishPay}</h3>
                <p className="text-slate-400 text-xs mb-6">{txt.payLimit} <span className="text-rose-400 font-bold">23 {txt.hour} 59 {txt.minute}</span></p>

                <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 mb-6 space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                    <span className="text-slate-400 text-sm">{txt.method}</span>
                    <span className="text-white font-bold uppercase">{paymentMethod === 'va' ? 'BCA Virtual Account' : paymentMethod === 'gopay' ? 'GoPay / E-Wallet' : 'QRIS'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">{txt.bill}</span>
                    <span className="text-emerald-400 font-bold text-lg">{formatRp(totalPembayaran)}</span>
                  </div>
                </div>

                {paymentMethod === 'va' && (
                  <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700 mb-6 text-center">
                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">{txt.copyVA}</p>
                    <div className="flex items-center justify-center gap-3 bg-slate-900 py-3 px-4 rounded-xl border border-slate-800 mb-3">
                      <span className="text-xl md:text-2xl font-mono font-bold text-white tracking-wider">8077 7012 3456 7890</span>
                      <button onClick={() => handleCopy('8077701234567890')} className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer p-1">
                        <Copy size={18} />
                      </button>
                    </div>
                    {copied && <p className="text-emerald-400 text-xs font-medium">{txt.copied}</p>}
                    <p className="text-slate-400 text-xs mt-3">{txt.vaInst}</p>
                  </div>
                )}

                {paymentMethod === 'gopay' && (
                  <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700 mb-6 text-center">
                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">{txt.walletNum}</p>
                    <div className="flex items-center justify-center gap-3 bg-slate-900 py-3 px-4 rounded-xl border border-slate-800 mb-3">
                      <span className="text-xl md:text-2xl font-mono font-bold text-white tracking-wider">+62 821 7654 3210</span>
                      <button onClick={() => handleCopy('6282176543210')} className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer p-1">
                        <Copy size={18} />
                      </button>
                    </div>
                    {copied && <p className="text-emerald-400 text-xs font-medium">{txt.copied}</p>}
                    <p className="text-slate-400 text-xs mt-3">{txt.walletInst}</p>
                  </div>
                )}

                {paymentMethod === 'qris' && (
                  <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700 mb-6 flex flex-col items-center text-center">
                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-4">{txt.scanQR}</p>
                    <div className="bg-white w-40 h-40 mx-auto rounded-lg p-3 mb-3">
                      <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                        <path d="M0,0 v30 h30 v-30 z M5,5 h20 v20 h-20 z M10,10 v10 h10 v-10 z" />
                        <path d="M70,0 v30 h30 v-30 z M75,5 h20 v20 h-20 z M80,10 v10 h10 v-10 z" />
                        <path d="M0,70 v30 h30 v-30 z M5,75 h20 v20 h-20 z M10,80 v10 h10 v-10 z" />
                        <rect x="35" y="5" width="10" height="10" /><rect x="50" y="5" width="10" height="10" />
                        <rect x="35" y="20" width="10" height="10" /><rect x="55" y="20" width="10" height="10" />
                        <rect x="5" y="35" width="10" height="10" /><rect x="20" y="35" width="10" height="10" />
                        <rect x="35" y="35" width="30" height="30" />
                        <rect x="70" y="35" width="10" height="10" /><rect x="85" y="35" width="10" height="10" />
                        <rect x="5" y="50" width="10" height="10" /><rect x="20" y="50" width="10" height="10" />
                        <rect x="70" y="50" width="10" height="10" /><rect x="85" y="50" width="10" height="10" />
                        <rect x="35" y="70" width="10" height="10" /><rect x="50" y="70" width="10" height="10" />
                        <rect x="70" y="70" width="30" height="30" />
                      </svg>
                    </div>
                    <p className="text-slate-400 text-xs">{txt.qrInst}</p>
                  </div>
                )}

                <button 
                  onClick={() => setStep(4)}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-all shadow-lg shadow-emerald-900/30 cursor-pointer"
                >
                  <CheckCircle2 size={20} /> {txt.iHavePaid}
                </button>
              </div>
            )}

            {/* STEP 4: KONFIRMASI PEMBAYARAN */}
            {step === 4 && (
              <div className="animate-in zoom-in-95 duration-300 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 size={32} className="text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{txt.paySuccess}</h3>
                  <p className="text-slate-400 text-sm">{txt.paySuccessDesc}</p>
                </div>

                <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 mb-6 text-left space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-slate-400 text-sm">{txt.tripPackage}</span>
                    <span className="text-white font-bold text-right">{lang === 'en' ? selectedTrip.enTitle : selectedTrip.title}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-slate-400 text-sm">{txt.date}</span>
                    <span className="text-white font-bold">{bookingDate}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-slate-400 text-sm">{txt.passenger}</span>
                    <span className="text-white font-bold">{pax} {txt.paxUnit}</span>
                  </div>
                  <div className="border-t border-slate-800 pt-3 flex justify-between items-start">
                    <span className="text-emerald-400 font-bold">{txt.totalPaid}</span>
                    <span className="text-emerald-400 font-bold text-lg">{formatRp(totalPembayaran)}</span>
                  </div>
                </div>

                <button 
                  onClick={closeModal}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all cursor-pointer"
                >
                  {txt.close}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}