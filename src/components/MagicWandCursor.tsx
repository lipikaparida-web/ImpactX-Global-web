import React, { useEffect, useRef } from 'react';

/**
 * MagicWandCursor (High-Performance Edition)
 * ─────────────────────────────────────────────────────────────
 * • Zero-latency 1:1 hardware-accelerated pointer tracking (no React re-renders on move).
 * • Throttled magical particle emitter with auto-sleeping canvas loop when idle.
 * • Lightweight click spell-bursts & floating incantations without GPU stalls.
 * • Touch-device auto-disable.
 */

const MAGIC_COLORS = [
  '#C8A96A', '#F5C56B', '#E6B566', '#FFD700',
  '#FFF0A0', '#C5A059', '#A86532',
  '#B0CCFF', '#8AABFF', '#C8E0FF',
];

const SPELL_INCANTATIONS = [
  'LUMOS MAXIMA ✨',
  'EXPECTO INNOVATUM ⚡',
  'IMPACTUS GLOBAL ★',
  'ALOHOMORA ✦',
  'REVELIO 🔮',
  'IGNIS CREATIO ✨',
  'WINGARDIUM ✧',
  'ACCIO IMPACT ⚡',
];

const SYMBOLS = ['✦', '✧', '★', '✨', '⚡', '◆', '◇'];

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  color: string;
  alpha: number;
  decay: number;
  rot: number; rotSpeed: number;
  sym?: string;
}

interface FloatText {
  x: number; y: number;
  text: string;
  alpha: number;
  vy: number;
}

const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export const MagicWandCursor: React.FC = () => {
  const isTouch = isTouchDevice();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const particles = useRef<Particle[]>([]);
  const floatTexts = useRef<FloatText[]>([]);
  const isLoopRunning = useRef(false);
  const lastSpawnTime = useRef(0);
  const lastPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (isTouch) return;

    document.body.style.cursor = 'none';

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number | null = null;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Wake up canvas animation loop if not running
    const startRenderLoop = () => {
      if (isLoopRunning.current) return;
      isLoopRunning.current = true;
      render();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update & Render Particles
      const activeParticles: Particle[] = [];
      const len = particles.current.length;

      for (let i = 0; i < len; i++) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.03; // subtle float
        p.vx *= 0.97;
        p.alpha -= p.decay;
        p.rot += p.rotSpeed;

        if (p.alpha > 0.02) {
          activeParticles.push(p);

          ctx.save();
          ctx.globalAlpha = p.alpha;

          if (p.sym) {
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.font = `${Math.floor(p.r)}px serif`;
            ctx.fillStyle = p.color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(p.sym, 0, 0);
          } else {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
          }

          ctx.restore();
        }
      }
      particles.current = activeParticles;

      // Update & Render Floating Incantation Texts
      const activeTexts: FloatText[] = [];
      const textLen = floatTexts.current.length;

      for (let i = 0; i < textLen; i++) {
        const ft = floatTexts.current[i];
        ft.y += ft.vy;
        ft.alpha -= 0.015;

        if (ft.alpha > 0.02) {
          activeTexts.push(ft);

          ctx.save();
          ctx.globalAlpha = ft.alpha;
          ctx.font = 'bold 13px "Cormorant Garamond", Georgia, serif';
          ctx.fillStyle = '#F5C56B';
          ctx.textAlign = 'center';
          ctx.fillText(ft.text, ft.x, ft.y);
          ctx.restore();
        }
      }
      floatTexts.current = activeTexts;

      // Auto-sleep if no particles or text active
      if (particles.current.length === 0 && floatTexts.current.length === 0) {
        isLoopRunning.current = false;
        animId = null;
        return;
      }

      animId = requestAnimationFrame(render);
    };

    // Spawn trail particles with strict throttling
    const spawnTrail = (x: number, y: number, dx: number, dy: number) => {
      const now = performance.now();
      if (now - lastSpawnTime.current < 28) return; // limit to ~35 emits/sec
      lastSpawnTime.current = now;

      // Max active particles cap
      if (particles.current.length > 35) return;

      const isSym = Math.random() < 0.2;
      const color = MAGIC_COLORS[Math.floor(Math.random() * MAGIC_COLORS.length)];

      particles.current.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 1.5 - dx * 0.05,
        vy: (Math.random() - 0.5) * 1.5 - dy * 0.05 - 0.3,
        r: isSym ? 10 : Math.random() * 2.5 + 0.8,
        color,
        alpha: 0.85,
        decay: Math.random() * 0.035 + 0.025,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.1,
        sym: isSym ? SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)] : undefined,
      });

      startRenderLoop();
    };

    // Spawn click burst
    const spawnBurst = (x: number, y: number) => {
      const count = 18; // lean and impactful
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        const spd = Math.random() * 5 + 2;
        const isSym = Math.random() < 0.35;
        const color = MAGIC_COLORS[Math.floor(Math.random() * MAGIC_COLORS.length)];

        particles.current.push({
          x, y,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          r: isSym ? 12 : Math.random() * 3.5 + 1.2,
          color,
          alpha: 1,
          decay: Math.random() * 0.03 + 0.015,
          rot: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.2,
          sym: isSym ? SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)] : undefined,
        });
      }

      // Floating incantation text
      floatTexts.current.push({
        x, y: y - 20,
        text: SPELL_INCANTATIONS[Math.floor(Math.random() * SPELL_INCANTATIONS.length)],
        alpha: 1,
        vy: -0.7,
      });

      startRenderLoop();
    };

    // Pointer move: direct hardware-accelerated DOM transform (0ms latency, zero re-renders)
    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x - 2}px, ${y - 2}px, 0)`;
        if (cursorRef.current.style.opacity !== '1') {
          cursorRef.current.style.opacity = '1';
        }
      }

      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;
      const distSq = dx * dx + dy * dy;

      if (distSq > 36) { // only spawn if mouse moved > 6px
        spawnTrail(x, y, dx, dy);
        lastPos.current = { x, y };
      }

      // Check interactive hover
      const t = e.target as HTMLElement | null;
      if (t) {
        const isInteractive =
          t.tagName === 'BUTTON' || t.tagName === 'A' ||
          t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' ||
          t.closest('button') !== null || t.closest('a') !== null ||
          t.classList.contains('cursor-pointer');

        if (svgRef.current) {
          svgRef.current.style.transform = isInteractive ? 'scale(1.12) rotate(-5deg)' : 'scale(1)';
        }
        if (auraRef.current) {
          auraRef.current.style.width = isInteractive ? '40px' : '26px';
          auraRef.current.style.height = isInteractive ? '40px' : '26px';
        }
      }
    };

    const onDown = (e: MouseEvent) => {
      spawnBurst(e.clientX, e.clientY);
      if (svgRef.current) {
        svgRef.current.style.transform = 'scale(0.88) rotate(12deg)';
      }
      if (auraRef.current) {
        auraRef.current.style.width = '48px';
        auraRef.current.style.height = '48px';
      }
    };

    const onUp = () => {
      if (svgRef.current) {
        svgRef.current.style.transform = 'scale(1)';
      }
      if (auraRef.current) {
        auraRef.current.style.width = '26px';
        auraRef.current.style.height = '26px';
      }
    };

    const onMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown, { passive: true });
    window.addEventListener('mouseup', onUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });

    return () => {
      document.body.style.cursor = 'auto';
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9998, width: '100vw', height: '100vh' }}
      />

      {/* Magic Wand SVG cursor — direct transform, 0ms lag */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          zIndex: 9999,
          opacity: 0,
          transform: 'translate3d(-100px, -100px, 0)',
          willChange: 'transform',
        }}
      >
        {/* Wand tip aura glow */}
        <div
          ref={auraRef}
          className="absolute transition-all duration-150"
          style={{
            top: '-8px', left: '-8px',
            width: '26px', height: '26px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,220,120,0.4) 0%, rgba(200,169,106,0.1) 55%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Wand SVG — tip at (2, 2) */}
        <svg
          ref={svgRef}
          width="36"
          height="36"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transition: 'transform 120ms ease-out',
            transformOrigin: '2px 2px',
            filter: 'drop-shadow(0 0 4px rgba(200,169,106,0.75))',
          }}
        >
          {/* Main wand shaft — dark ebony wood */}
          <line x1="2" y1="2" x2="34" y2="34" stroke="#1A0F08" strokeWidth="4.5" strokeLinecap="round" />

          {/* Gold inlay shimmer stripe */}
          <line x1="2" y1="2" x2="34" y2="34" stroke="#C8A96A" strokeWidth="1.5" strokeDasharray="3 4" strokeLinecap="round" opacity="0.8" />

          {/* Brass decorative rings */}
          <circle cx="12" cy="12" r="2.5" fill="#E6B566" opacity="0.9" />
          <circle cx="20" cy="20" r="1.8" fill="#C8A96A" opacity="0.8" />
          <circle cx="28" cy="28" r="1.5" fill="#A86532" opacity="0.7" />

          {/* Handle */}
          <line x1="28" y1="28" x2="36" y2="36" stroke="#0D0905" strokeWidth="6.5" strokeLinecap="round" />
          <circle cx="36" cy="36" r="2.8" fill="#C8A96A" opacity="0.9" />
          <circle cx="36" cy="36" r="1.4" fill="#FFD700" opacity="0.8" />

          {/* Wand tip glowing core */}
          <circle cx="2" cy="2" r="3.5" fill="#FFFFFF" />
          <circle cx="2" cy="2" r="5.5" fill="rgba(200,169,106,0.4)" />

          {/* Tip sparkle rays */}
          <g stroke="#FFD700" strokeWidth="1.1" strokeLinecap="round" opacity="0.9">
            <line x1="2" y1="-2" x2="2" y2="-5" />
            <line x1="2" y1="6" x2="2" y2="9" />
            <line x1="-2" y1="2" x2="-5" y2="2" />
            <line x1="6" y1="2" x2="9" y2="2" />
          </g>
        </svg>
      </div>
    </>
  );
};
