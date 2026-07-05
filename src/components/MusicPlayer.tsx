"use client";

import React, { useState, useRef } from 'react';
import { Play, Pause, Volume1, Plus, Minus, Music, Minimize2, Maximize2 } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMinimized, setIsMinimized] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const adjustVolume = (direction: 'up' | 'down') => {
    if (audioRef.current) {
      let newVolume = direction === 'up' ? volume + 0.1 : volume - 0.1;
      newVolume = Math.min(Math.max(newVolume, 0), 1);
      setVolume(newVolume);
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className={`fixed bottom-6 left-6 z-[100] transition-all duration-300 ease-in-out flex items-center bg-slate-900/90 backdrop-blur-md border border-slate-700 shadow-xl rounded-full p-1.5 ${isMinimized ? 'w-14 h-14' : 'w-auto'}`}>
      <audio ref={audioRef} src="/Music/backsound.mp3" loop />
      
      {/* TOMBOL TOGGLE UKURAN (Selalu muncul di sudut atas) */}
      <button 
        onClick={() => setIsMinimized(!isMinimized)}
        className="absolute -top-1.5 -right-1.5 bg-slate-700 hover:bg-emerald-500 text-white p-1 rounded-full border border-slate-600 transition-colors shadow-sm z-10"
      >
        {isMinimized ? <Maximize2 size={10} /> : <Minimize2 size={10} />}
      </button>

      {/* ICON MUSIK / PLAY PAUSE */}
      <button 
        onClick={togglePlay}
        className="w-10 h-10 flex items-center justify-center bg-emerald-600 rounded-full text-white hover:bg-emerald-500 transition-all duration-300 shadow-md"
      >
        {isMinimized ? (
            <Music size={18} /> 
        ) : (
            isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />
        )}
      </button>

      {/* KONTROL LAINNYA (Hanya muncul jika tidak minimized) */}
      {!isMinimized && (
        <>
          <div className="flex items-center gap-1 px-3">
            <button onClick={() => adjustVolume('down')} className="text-slate-400 hover:text-white"><Minus size={14} /></button>
            <Volume1 size={16} className="text-emerald-500 mx-1" />
            <button onClick={() => adjustVolume('up')} className="text-slate-400 hover:text-white"><Plus size={14} /></button>
          </div>

          <div className="text-[10px] font-bold text-slate-300 pr-4 min-w-[35px]">
            {Math.round(volume * 100)}%
          </div>
        </>
      )}
    </div>
  );
}