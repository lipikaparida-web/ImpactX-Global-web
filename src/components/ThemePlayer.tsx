import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

type NoteName = 'A#4' | 'B4' | 'C5' | 'C#5' | 'D5' | 'D#5' | 'E5' | 'F5' | 'F#5' | 'G5' | 'G#5' | 'A5' | 'A#5' | 'B5' | 'C6' | 'C#6' | 'D6' | 'Rest';

const FREQUENCIES: Record<NoteName, number> = {
  'A#4': 466.16,
  'B4': 493.88,
  'C5': 523.25,
  'C#5': 554.37,
  'D5': 587.33,
  'D#5': 622.25,
  'E5': 659.25,
  'F5': 698.46,
  'F#5': 739.99,
  'G5': 783.99,
  'G#5': 830.61,
  'A5': 880.00,
  'A#5': 932.33,
  'B5': 987.77,
  'C6': 1046.50,
  'C#6': 1108.73,
  'D6': 1174.66,
  'Rest': 0
};

// [Note, Duration Multiplier]
const MELODY: [NoteName, number][] = [
  ['B4', 1],
  ['E5', 3], ['G5', 1], ['F#5', 2],
  ['E5', 4], ['B5', 2],
  ['A5', 6],
  ['F#5', 6],
  ['E5', 3], ['G5', 1], ['F#5', 2],
  ['D#5', 4], ['F5', 2],
  ['B4', 6],
  ['Rest', 2],
  ['B4', 1],
  ['E5', 3], ['G5', 1], ['F#5', 2],
  ['E5', 4], ['B5', 2],
  ['D6', 4], ['C#6', 2],
  ['C6', 4], ['G#5', 2],
  ['C6', 3], ['B5', 1], ['A#5', 2],
  ['A#4', 4], ['G5', 2],
  ['E5', 6],
  ['Rest', 4]
];

export const ThemePlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
      isPlayingRef.current = false;
    };
  }, []);

  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const playNote = (ctx: AudioContext, frequency: number, duration: number, startTime: number) => {
    if (frequency === 0) return; // Rest

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(frequency, startTime);

    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(1, startTime + 0.05);
    gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  };

  const playMelody = async () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    isPlayingRef.current = true;
    setIsPlaying(true);

    const baseNoteLength = 0.25;
    let currentTime = ctx.currentTime + 0.1;
    let noteIndex = 0;

    const scheduleNotes = () => {
      if (!isPlayingRef.current) return;

      while (currentTime < ctx.currentTime + 0.5) {
        const [note, durationMult] = MELODY[noteIndex];
        const duration = durationMult * baseNoteLength;
        
        playNote(ctx, FREQUENCIES[note], duration, currentTime);
        
        currentTime += duration;
        noteIndex++;
        
        if (noteIndex >= MELODY.length) {
          noteIndex = 0;
        }
      }

      timeoutIdRef.current = setTimeout(scheduleNotes, 100);
    };

    scheduleNotes();
  };

  const stopMelody = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopMelody();
    } else {
      playMelody();
    }
  };

  return (
    <button
      onClick={togglePlay}
      className={`fixed bottom-6 right-6 z-[9999] p-4 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(200,169,106,0.3)]
        ${isPlaying 
          ? 'bg-gradient-to-br from-[#1a130f] to-[#3a2818] border border-[#c8a96a] shadow-[0_0_30px_rgba(200,169,106,0.6)] scale-105' 
          : 'bg-gradient-to-br from-[#0a0806] to-[#1a130f] border border-[#c8a96a]/30 hover:border-[#c8a96a]/70 hover:scale-105'
        }
      `}
      title={isPlaying ? "Mute Theme" : "Play Magical Theme"}
    >
      <div className="relative">
        {isPlaying ? (
          <Volume2 className="w-6 h-6 text-[#c8a96a] animate-pulse" />
        ) : (
          <VolumeX className="w-6 h-6 text-[#c8a96a]/70" />
        )}
        
        {/* Magical particles when playing */}
        {isPlaying && (
          <>
            <div className="absolute -top-2 -right-2 w-2 h-2 bg-[#ffd700] rounded-full animate-ping opacity-75"></div>
            <div className="absolute -bottom-1 -left-2 w-1.5 h-1.5 bg-[#f5c56b] rounded-full animate-ping opacity-60" style={{ animationDelay: '0.3s' }}></div>
          </>
        )}
      </div>
    </button>
  );
};
