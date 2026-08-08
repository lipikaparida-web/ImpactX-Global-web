import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { ImpactXLogo } from './ImpactXLogo';

interface PlatformGatewayProps {
  onEnterWebsite: () => void;
}

export const PlatformGateway: React.FC<PlatformGatewayProps> = ({ onEnterWebsite }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0); // 0 to 1
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Parallax Refs (works with mouse, touch, & gentle auto-drift)
  const currentMousePos = useRef({ x: 0, y: 0 });
  const targetMousePos = useRef({ x: 0, y: 0 });

  // Handle Mouse & Touch Pointer Movements for Parallax
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientY : (e as MouseEvent).clientY;

      if (clientX !== undefined && clientY !== undefined) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        targetMousePos.current = {
          x: (clientX - centerX) / centerX,
          y: (clientY - centerY) / centerY,
        };
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchstart', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchstart', handlePointerMove);
    };
  }, []);

  // Web Audio Synth for Subtle Railway Atmosphere
  useEffect(() => {
    if (!soundEnabled) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.3);
      }
      return;
    }

    try {
      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Generate Brown Noise for Steam/Engine Hum
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 0.12; // Soft subtle ambience
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Lowpass Filter for warm acoustic station reverberation
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 240;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 1.2);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();

      noiseNodeRef.current = whiteNoise;
      gainNodeRef.current = gain;
    } catch (e) {
      console.warn('Audio initialized gracefully:', e);
    }

    return () => {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.2);
      }
    };
  }, [soundEnabled]);

  // Live Atmosphere Canvas Rendering with Multi-Device Resolution & Layout Adapters
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap DPR at 2 for performance on high-DPI mobile devices
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('orientationchange', resizeCanvas, { passive: true });

    // Device profile checks
    const isMobile = width < 768;

    // Steam Particles
    interface SteamParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      maxSize: number;
      alpha: number;
      life: number;
      maxLife: number;
    }

    const steamParticles: SteamParticle[] = [];
    const createSteam = (burst = false) => {
      const trainX = isMobile ? width * 0.65 : width * 0.75;
      const trainY = isMobile ? height * 0.48 : height * 0.54;

      steamParticles.push({
        x: trainX + (Math.random() * 40 - 20),
        y: trainY + (Math.random() * 24 - 12),
        vx: (Math.random() - 0.45) * (burst ? 2.5 : 0.6),
        vy: -(Math.random() * (burst ? 3.5 : 0.9) + 0.25),
        size: Math.random() * (isMobile ? 14 : 20) + 10,
        maxSize: Math.random() * (burst ? 180 : 120) + (isMobile ? 60 : 90),
        alpha: Math.random() * (burst ? 0.65 : 0.22) + 0.08,
        life: 0,
        maxLife: Math.random() * (burst ? 90 : 160) + 80,
      });
    };

    // Pre-populate steam
    const initialSteamCount = isMobile ? 16 : 30;
    for (let i = 0; i < initialSteamCount; i++) createSteam();

    // Warm Dust Particles / Floating Stardust
    const dustCount = isMobile ? 22 : 45;
    const dustMotes = Array.from({ length: dustCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: -(Math.random() * 0.3 + 0.06),
      radius: Math.random() * 1.5 + 0.4,
      alpha: Math.random() * 0.5 + 0.15,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      phase: Math.random() * Math.PI * 2,
    }));

    let frame = 0;

    const render = () => {
      frame++;

      // Gentle auto-drift oscillation for mobile touchscreens where mouse position stays static
      const autoDriftX = Math.sin(frame * 0.008) * 0.15;
      const autoDriftY = Math.cos(frame * 0.006) * 0.1;

      // Smooth mouse/touch lerp
      currentMousePos.current = {
        x: currentMousePos.current.x + (targetMousePos.current.x + autoDriftX - currentMousePos.current.x) * 0.03,
        y: currentMousePos.current.y + (targetMousePos.current.y + autoDriftY - currentMousePos.current.y) * 0.03,
      };

      ctx.clearRect(0, 0, width, height);

      const px = currentMousePos.current.x * (isMobile ? 10 : 18);
      const py = currentMousePos.current.y * (isMobile ? 6 : 10);
      const cameraBreathing = Math.sin(frame * 0.008) * 3;

      // -------------------------------------------------------------
      // 1. Full-screen Station Ambient Background (Deep Dark Academia)
      // -------------------------------------------------------------
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#060504');
      bgGrad.addColorStop(0.4, '#100C09');
      bgGrad.addColorStop(0.75, '#17110C');
      bgGrad.addColorStop(1, '#09090B');

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Station Vaulted Ceiling Arches (Ironwork lines)
      ctx.save();
      ctx.strokeStyle = 'rgba(201, 169, 110, 0.04)';
      ctx.lineWidth = 1.2;
      const archSpacing = width / (isMobile ? 4 : 6);
      const numArches = isMobile ? 5 : 7;
      for (let i = 0; i <= numArches; i++) {
        ctx.beginPath();
        ctx.moveTo(i * archSpacing + px * 0.2, 0);
        ctx.bezierCurveTo(
          i * archSpacing + px * 0.2,
          height * 0.35,
          width * 0.5 + px * 0.2,
          height * 0.5,
          width * 0.5 + px * 0.2,
          height
        );
        ctx.stroke();
      }
      ctx.restore();

      // -------------------------------------------------------------
      // 2. Vintage Steam Locomotive Silhouette & Warm Headlamps
      // -------------------------------------------------------------
      const trainCenterX = (isMobile ? width * 0.65 : width * 0.76) + px * 0.35;
      const trainCenterY = (isMobile ? height * 0.48 : height * 0.56) + py * 0.3 + cameraBreathing;
      const trainScale = isMobile
        ? Math.min(0.75, Math.max(0.45, width / 650))
        : Math.min(1.15, Math.max(0.7, width / 1350));

      ctx.save();
      // Boiler Core
      ctx.fillStyle = '#090705';
      ctx.beginPath();
      ctx.arc(trainCenterX, trainCenterY, 105 * trainScale, 0, Math.PI * 2);
      ctx.fill();

      // Boiler Ring Outline
      ctx.strokeStyle = 'rgba(201, 169, 110, 0.2)';
      ctx.lineWidth = 2.5 * trainScale;
      ctx.stroke();

      // Smokestack Funnel
      ctx.fillRect(
        trainCenterX - 22 * trainScale,
        trainCenterY - 170 * trainScale,
        44 * trainScale,
        75 * trainScale
      );

      // Locomotive Front Plate
      ctx.fillStyle = '#5A1818';
      ctx.beginPath();
      ctx.arc(trainCenterX, trainCenterY - 40 * trainScale, 26 * trainScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(201, 169, 110, 0.5)';
      ctx.lineWidth = 1.8 * trainScale;
      ctx.stroke();

      // Plate Text "EXPRESS"
      ctx.fillStyle = '#F5E6C8';
      ctx.font = `bold ${Math.floor(9 * trainScale)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('EXPRESS', trainCenterX, trainCenterY - 40 * trainScale);

      // Glowing Warm Headlamp (#E6B566)
      const lampX = trainCenterX;
      const lampY = trainCenterY + 28 * trainScale;

      const lampGlow = ctx.createRadialGradient(
        lampX,
        lampY,
        4 * trainScale,
        lampX,
        lampY,
        (isMobile ? 140 : 200) * trainScale
      );
      lampGlow.addColorStop(0, 'rgba(255, 230, 170, 0.9)');
      lampGlow.addColorStop(0.18, 'rgba(230, 181, 102, 0.45)');
      lampGlow.addColorStop(0.5, 'rgba(180, 120, 40, 0.12)');
      lampGlow.addColorStop(1, 'transparent');

      ctx.fillStyle = lampGlow;
      ctx.beginPath();
      ctx.arc(lampX, lampY, (isMobile ? 140 : 200) * trainScale, 0, Math.PI * 2);
      ctx.fill();

      // Lamp Core
      ctx.fillStyle = '#FFF9EA';
      ctx.beginPath();
      ctx.arc(lampX, lampY, 11 * trainScale, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // -------------------------------------------------------------
      // 3. Aged Brick Archway Wall & "PLATFORM 9¾" Plaque (Left Side)
      // -------------------------------------------------------------
      const wallX = (isMobile ? width * 0.12 : width * 0.22) + px * 0.6;

      ctx.save();
      const wallGrad = ctx.createLinearGradient(wallX - 250, 0, wallX + 180, 0);
      wallGrad.addColorStop(0, 'rgba(30, 22, 16, 0.96)');
      wallGrad.addColorStop(0.6, 'rgba(22, 16, 11, 0.88)');
      wallGrad.addColorStop(1, 'rgba(9, 7, 5, 0.25)');

      ctx.fillStyle = wallGrad;
      ctx.fillRect(0, 0, wallX + 120, height);

      // Subtle Brick Lines
      ctx.strokeStyle = 'rgba(140, 105, 70, 0.08)';
      ctx.lineWidth = 1;
      const rowH = 22;
      for (let y = 0; y < height; y += rowH) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(wallX + 80, y);
        ctx.stroke();

        const offset = (Math.floor(y / rowH) % 2) * 35;
        for (let x = offset; x < wallX + 80; x += 70) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + rowH);
          ctx.stroke();
        }
      }

      // "PLATFORM 9¾" Plaque
      const plaqueW = isMobile ? 160 : 210;
      const plaqueH = isMobile ? 48 : 60;
      const plaqueX = wallX - (isMobile ? 60 : 85);
      const plaqueY = height * 0.36 + py * 0.5;

      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(plaqueX + 4, plaqueY + 4, plaqueW, plaqueH);

      // Bronze Plate
      const plaqueGrad = ctx.createLinearGradient(plaqueX, plaqueY, plaqueX, plaqueY + plaqueH);
      plaqueGrad.addColorStop(0, '#36281B');
      plaqueGrad.addColorStop(0.5, '#22180F');
      plaqueGrad.addColorStop(1, '#150F0A');

      ctx.fillStyle = plaqueGrad;
      ctx.fillRect(plaqueX, plaqueY, plaqueW, plaqueH);

      // Gold Frame
      ctx.strokeStyle = '#C9A96E';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(plaqueX + 3, plaqueY + 3, plaqueW - 6, plaqueH - 6);

      // Plaque Text
      ctx.fillStyle = '#F5E6C8';
      ctx.font = `bold ${isMobile ? 12 : 15}px Georgia, "Cormorant Garamond", serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('PLATFORM 9 ¾', plaqueX + plaqueW / 2, plaqueY + plaqueH / 2);

      // Trolley Silhouette
      const cartX = wallX - 35;
      const cartY = height * 0.82 + py * 0.5;

      ctx.fillStyle = '#0B0907';
      ctx.fillRect(cartX - 30, cartY - 50, 60, 30);
      ctx.fillRect(cartX - 22, cartY - 78, 44, 28);

      ctx.strokeStyle = '#322417';
      ctx.lineWidth = 2;
      ctx.strokeRect(cartX - 35, cartY - 55, 70, 55);
      ctx.beginPath();
      ctx.arc(cartX - 25, cartY + 4, 8, 0, Math.PI * 2);
      ctx.arc(cartX + 25, cartY + 4, 8, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();

      // -------------------------------------------------------------
      // 4. Live Drifting Steam
      // -------------------------------------------------------------
      if (frame % (isMobile ? 6 : 4) === 0) createSteam();

      for (let i = steamParticles.length - 1; i >= 0; i--) {
        const p = steamParticles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.size += (p.maxSize - p.size) * 0.012;

        const lifeRatio = p.life / p.maxLife;
        const currentAlpha =
          lifeRatio < 0.2
            ? (lifeRatio / 0.2) * p.alpha
            : (1 - (lifeRatio - 0.2) / 0.8) * p.alpha;

        if (lifeRatio >= 1) {
          steamParticles.splice(i, 1);
          continue;
        }

        ctx.save();
        const steamGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        steamGrad.addColorStop(0, `rgba(235, 215, 185, ${currentAlpha * 0.75})`);
        steamGrad.addColorStop(0.5, `rgba(175, 145, 115, ${currentAlpha * 0.35})`);
        steamGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = steamGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // -------------------------------------------------------------
      // 5. Warm Floating Stardust / Dust Motes
      // -------------------------------------------------------------
      dustMotes.forEach((mote) => {
        mote.x += mote.vx;
        mote.y += mote.vy;
        mote.phase += mote.pulseSpeed;

        if (mote.y < 0) {
          mote.y = height + 10;
          mote.x = Math.random() * width;
        }

        const pulseAlpha = Math.max(0.1, mote.alpha + Math.sin(mote.phase) * 0.2);

        ctx.beginPath();
        ctx.arc(mote.x, mote.y, mote.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(225, 180, 105, ${pulseAlpha})`;
        ctx.fill();
      });

      // -------------------------------------------------------------
      // 6. Lantern Flickering Glow
      // -------------------------------------------------------------
      const lanternX = wallX + (isMobile ? 50 : 75);
      const lanternY = height * 0.27 + py * 0.4;
      const flicker = Math.sin(frame * 0.08) * 0.1 + Math.cos(frame * 0.22) * 0.06 + 0.84;

      const lanternGlow = ctx.createRadialGradient(
        lanternX,
        lanternY,
        2,
        lanternX,
        lanternY,
        (isMobile ? 90 : 130) * flicker
      );
      lanternGlow.addColorStop(0, 'rgba(255, 220, 140, 0.8)');
      lanternGlow.addColorStop(0.3, 'rgba(212, 150, 60, 0.3)');
      lanternGlow.addColorStop(1, 'transparent');

      ctx.fillStyle = lanternGlow;
      ctx.beginPath();
      ctx.arc(lanternX, lanternY, (isMobile ? 90 : 130) * flicker, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('orientationchange', resizeCanvas);
    };
  }, []);

  // Handle Signature Transition Sequence when CTA is clicked
  const handleBeginJourney = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    if (soundEnabled && audioCtxRef.current && gainNodeRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(0.1, audioCtxRef.current.currentTime, 0.4);
    }

    let start: number | null = null;
    const duration = 2200; // 2.2 second cinematic sequence

    const animateTransition = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(1, elapsed / duration);
      setTransitionProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(animateTransition);
      } else {
        onEnterWebsite();
      }
    };

    requestAnimationFrame(animateTransition);
  };

  return (
    <div className="fixed inset-0 z-[70] overflow-hidden bg-[#09090B] font-sans text-[#FFFFFF] selection:bg-[#C9A96E]/30 selection:text-[#C9A96E] flex flex-col justify-between h-[100dvh] min-h-[100dvh] supports-[height:100dvh]:h-[100dvh]">
      
      {/* Canvas Live Atmosphere Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-1000 ease-out"
        style={{
          transform: isTransitioning
            ? `scale(${1 + transitionProgress * 2.2})`
            : `scale(${1 + Math.abs(currentMousePos.current.x) * 0.01})`,
          filter: isTransitioning ? `blur(${transitionProgress * 10}px)` : 'none',
        }}
      />

      {/* Dark Vignette Overlay for Crisp Typography Contrast */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#09090B]/75 via-[#09090B]/60 to-[#09090B]/92 pointer-events-none transition-opacity duration-700"
        style={{ opacity: isTransitioning ? 0.2 : 1 }}
      />

      {/* Classy Dark Obsidian & Gold Portal Threshold Overlay */}
      <div
        className="absolute inset-0 bg-[#09090B] pointer-events-none z-40 transition-opacity ease-out duration-500"
        style={{
          opacity: transitionProgress > 0.3 ? (transitionProgress - 0.3) / 0.7 : 0,
        }}
      >
        {/* Subtle Gold Cosmic Halo in Center of Transition */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-radial from-[#C9A96E]/20 via-[#111118]/50 to-transparent blur-3xl transition-transform duration-700 pointer-events-none"
          style={{
            transform: `translate(-50%, -50%) scale(${0.8 + transitionProgress * 0.5})`,
            opacity: Math.sin(transitionProgress * Math.PI),
          }}
        />
      </div>

      {/* TOP HEADER: Clean Minimal Brand + Sound + Skip */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-10 py-6 sm:py-8 flex items-center justify-between gap-4">
        
        {/* Top Left: ImpactX Global Logo — single clean element, no overwriting */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#111111]/90 border border-white/10 flex items-center justify-center shadow-lg shrink-0">
            <ImpactXLogo className="w-4 h-4 text-[#C9A96E]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#FFFFFF] font-sans-display font-bold text-xs sm:text-sm tracking-tight whitespace-nowrap">
              IMPACTX
            </span>
            <span className="text-[#C9A96E] font-mono text-[9px] sm:text-[10px] tracking-widest uppercase bg-[#C9A96E]/10 px-2 py-0.5 rounded-full border border-[#C9A96E]/20 whitespace-nowrap">
              GLOBAL
            </span>
          </div>
        </div>

        {/* Top Right: Sound Toggle & Skip Intro */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 min-w-[38px] min-h-[38px] flex items-center justify-center rounded-full bg-[#111111]/70 border border-white/10 hover:border-[#C9A96E]/40 text-[#D1CBC0] hover:text-[#FFFFFF] transition-all cursor-pointer active:scale-95"
            title={soundEnabled ? 'Mute Ambience' : 'Enable Ambience'}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-[#C9A96E] animate-pulse" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </button>

          <button
            onClick={onEnterWebsite}
            disabled={isTransitioning}
            className="text-xs font-mono text-[#D1CBC0] hover:text-[#FFFFFF] transition-colors cursor-pointer min-h-[44px] px-3 py-2 flex items-center justify-center active:scale-95 whitespace-nowrap"
          >
            Skip Intro →
          </button>
        </div>

      </header>

      {/* CENTERED EDITORIAL HERO CONTENT: Spacious, Responsive, Ultra-Readable */}
      <main className="relative z-20 max-w-2xl mx-auto px-5 sm:px-6 text-center my-auto py-6 sm:py-12 flex flex-col items-center">

        {/* Top eyebrow label */}
        <p
          className="text-[11px] sm:text-xs font-mono text-[#C9A96E] uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-3 sm:mb-4 font-medium transition-all duration-700"
          style={{ opacity: isTransitioning ? 1 - transitionProgress : 1 }}
        >
          The Gateway to ImpactX Global
        </p>

        {/* Main Title: Platform 9¾ — large, dominant, serif italic */}
        <h1
          className="font-serif italic text-4xl sm:text-7xl md:text-8xl tracking-tight leading-[1.0] mb-3 sm:mb-4 transition-all duration-700"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            background: 'linear-gradient(135deg, #F5E6C8 0%, #C9A96E 50%, #E6B566 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            transform: `translateY(${isTransitioning ? -transitionProgress * 30 : 0}px)`,
            opacity: isTransitioning ? 1 - transitionProgress : 1,
          }}
        >
          Platform 9¾
        </h1>

        {/* ImpactX Global Express subtitle — different font, highlighted, glowing */}
        <div
          className="flex items-center justify-center gap-2 mb-5 sm:mb-6 transition-all duration-700"
          style={{ opacity: isTransitioning ? 1 - transitionProgress : 1 }}
        >
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#C9A96E]/60" />
          <p
            className="font-sans-display font-semibold text-sm sm:text-lg tracking-[0.12em] uppercase"
            style={{
              background: 'linear-gradient(90deg, #C9A96E, #F5E6C8, #C9A96E)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
              filter: 'drop-shadow(0 0 12px rgba(201,169,110,0.45))',
            }}
          >
            ImpactX Global Express
          </p>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#C9A96E]/60" />
        </div>

        {/* Body Description */}
        <p
          className="text-sm sm:text-base text-[#D1CBC0] leading-loose max-w-md sm:max-w-lg mx-auto mb-6 sm:mb-8 font-sans font-normal transition-all duration-700"
          style={{ opacity: isTransitioning ? 1 - transitionProgress : 1 }}
        >
          Leave the ordinary behind and step into a world where ideas become projects, curiosity becomes innovation, and students become future leaders.
        </p>

        {/* Tagline Statement */}
        <div
          className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono text-[#FFFFFF]/75 mb-8 sm:mb-10 tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all duration-700"
          style={{ opacity: isTransitioning ? 1 - transitionProgress : 1 }}
        >
          <span>Learn</span>
          <span className="text-[#C9A96E]">•</span>
          <span>Build</span>
          <span className="text-[#C9A96E]">•</span>
          <span>Lead</span>
          <span className="text-[#C9A96E]">•</span>
          <span className="text-[#C9A96E]">Create Impact</span>
        </div>

        {/* Primary CTA — Board Platform 9¾ */}
        <div className="flex flex-col items-center w-full sm:w-auto">
          <button
            onClick={handleBeginJourney}
            disabled={isTransitioning}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full text-sm font-semibold text-[#FFFFFF] bg-[#111111]/90 backdrop-blur-md border border-[#C9A96E]/40 hover:border-[#C9A96E]/80 hover:bg-[#1A1815] transition-all duration-300 shadow-[0_0_25px_rgba(201,169,110,0.15)] hover:shadow-[0_0_40px_rgba(201,169,110,0.35)] hover:scale-[1.02] active:scale-95 cursor-pointer min-h-[48px]"
          >
            <span>{isTransitioning ? 'Crossing Threshold...' : 'Board Platform 9¾'}</span>
            <ArrowRight className="w-4 h-4 text-[#C9A96E] transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-6 py-4 sm:py-6 text-center text-[10px] sm:text-[11px] font-mono text-[#D1CBC0]/40">
        <span>ImpactX Global Ecosystem</span>
      </footer>

    </div>
  );
};
