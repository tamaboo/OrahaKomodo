// File: src/components/CustomCursor.tsx
"use client";

import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Fungsi untuk melacak koordinat mouse
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Fungsi untuk mendeteksi apakah mouse sedang berada di atas link/tombol
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Membesar jika menyentuh tag <a>, <button>, atau elemen dengan class 'cursor-pointer'
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // Menambahkan event listener ke window
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    // Membersihkan event listener saat komponen dilepas (unmount)
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* 
        Lingkaran Kursor: 
        Menggunakan fixed positioning dan z-index sangat tinggi agar selalu di atas.
        Hanya tampil di layar Desktop (hidden md:block) agar tidak mengganggu layar sentuh HP.
      */}
      <div
        className={`fixed top-0 left-0 w-8 h-8 border-2 border-emerald-400 rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out hidden md:block ${
          isHovering ? 'scale-150 bg-emerald-400/20' : 'scale-100'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      
      {/* (Opsional) Titik kecil tepat di tengah pointer */}
      <div
        className={`fixed top-0 left-0 w-1.5 h-1.5 bg-emerald-500 rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150 hidden md:block ${
          isHovering ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
}