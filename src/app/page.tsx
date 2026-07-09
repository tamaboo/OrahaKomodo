import React from 'react';
import Navbar from '@/components/Navbar';
import SplashScreen from '@/components/SplashScreen';
import Home from '@/views/Home'; 
import Sejarah from '@/views/Sejarah'; 
import Destinasi from '@/views/Destinasi';
import Testimoni from '@/components/Testimoni'; 
import Footer from '@/components/Footer';
import Peta from '@/components/Peta';
import Faq from '@/components/Faq';
import Chatbot from '@/components/Chatbot'; 
import MusicPlayer from '@/components/MusicPlayer';
import PaketWisata from '@/views/PaketWisata';

export default function Page() {
  return (
    <div className="w-full bg-slate-950 text-white font-sans relative">
      {/* 1. Splash Screen - Muncul pertama kali */}
      <SplashScreen />
      {/* 2. Navbar - Navigasi antar section */}
      <Navbar />
      {/* 3. Urutan Konten Section */}
     <main>
    <Home />
    <Sejarah />
    <Destinasi />
    <Peta />
    <PaketWisata />
    <Testimoni/>
    <Faq />
    </main>
      <MusicPlayer />
      <Chatbot />
      <Footer />
    </div>
  );
}