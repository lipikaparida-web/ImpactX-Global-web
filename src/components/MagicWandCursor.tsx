import React, { useEffect, useRef, useState } from 'react';

/**
 * MagicWandCursor
 * ─────────────────────────────────────────────────────────────
 * Replaces the default OS cursor with a detailed magic wand SVG.
 * On every mouse move: dense golden stardust + blue magical sparks trail.
 * On click: dramatic full radial spell burst + incantation text floats up.
 * On hover over buttons/links: wand tip glows brighter, cursor enlarges.
 */

const MAGIC_COLORS = [
  '#C8A96A', '#F5C56B', '#E6B566', '#FFD700',
  '#FFF0A0', '#C5A059', '#A86532',
  '#B0CCFF', '#8AABFF', '#C8E0FF', // blue stardust
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

const SYMBOLS = ['✦', '✧', '★', '✨', '⚡', '◆', '◇', '❋'];

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  color: string;
  alpha: number;
  decay: number;
  rot: number; rotSpeed: number;
  sym?: string;
  glow: boolean;
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
  const [isTouch] = useState(isTouchDevice());

  if (isTouch) return null;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [hovered, setHovered] = useState(false);
  const [clicking, setClicking] = useState(false);

  const particles = useRef<Particle[]>([]);
  const floatTexts = useRef<FloatText[]>([]);
  const lastPos = useRef({ x: -200, y: -200 });
  const pid = useRef(0);

  // ── Spawn trail particles ──────────────────────────────────
  const spawnTrail = (x: number, y: number, dx: number, dy: number) => {
    const speed = Math.sqrt(dx * dx + dy * dy);
    const count = Math.min(10, Math.floor(speed / 3.5) + 2);

    for (let i = 0; i < count; i++) {
      pid.current++;
      const isGold = Math.random() > 0.32;
      const isSym = Math.random() < 0.18;
      const color = MAGIC_COLORS[Math.floor(Math.random() * MAGIC_COLORS.length)];

      particles.current.push({
        x: x + (Math.random() - 0.5) * 12,
        y: y + (Math.random() - 0.5) * 12,
        vx: (Math.random() - 0.5) * 2.2 - dx * 0.08,
        vy: (Math.random() - 0.5) * 2.2 - dy * 0.08 - 0.6,
        r: isSym ? Math.random() * 11 + 7 : Math.random() * 3.8 + 0.8,
        color,
        alpha: isGold ? 0.9 : 0.7,
        decay: Math.random() * 0.028 + 0.014,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.15,
        sym: isSym ? SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)] : undefined,
        glow: isGold,
      });
    }
  };

  // ── Spawn click burst ──────────────────────────────────────
  const spawnBurst = (x: number, y: number) => {
    const count = 48;
    for (let i = 0; i < count; i++) {
      pid.current++;
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const spd = Math.random() * 9 + 3;
      const isSym = Math.random() < 0.45;
      const color = MAGIC_COLORS[Math.floor(Math.random() * MAGIC_COLORS.length)];

      particles.current.push({
        x, y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        r: isSym ? Math.random() * 14 + 8 : Math.random() * 5 + 1.5,
        color,
        alpha: 1,
        decay: Math.random() * 0.022 + 0.008,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.25,
        sym: isSym ? SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)] : undefined,
        glow: true,
      });
    }

    // Floating incantation text
    floatTexts.current.push({
      x, y: y - 22,
      text: SPELL_INCANTATIONS[Math.floor(Math.random() * SPELL_INCANTATIONS.length)],
      alpha: 1,
      vy: -0.9,
    });
  };

  // ── Event listeners ────────────────────────────────────────
  useEffect(() => {
    document.body.style.cursor = 'none';

    const onMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      setPos({ x, y });

      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;
      lastPos.current = { x, y };
      spawnTrail(x, y, dx, dy);

      const t = e.target as HTMLElement | null;
      if (t) {
        const clickable =
          t.tagName === 'BUTTON' || t.tagName === 'A' ||
          t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' ||
          t.closest('button') !== null || t.closest('a') !== null ||
          t.classList.contains('cursor-pointer');
        setHovered(clickable);
      }
    };

    const onDown = (e: MouseEvent) => {
      setClicking(true);
      spawnBurst(e.clientX, e.clientY);
    };

    const onUp = () => setClicking(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  // ── Canvas render loop ─────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Particles
      particles.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.035; // anti-gravity float
        p.vx *= 0.968;
        p.alpha -= p.decay;
        p.rot += p.rotSpeed;
      });

      particles.current = particles.current.filter(p => p.alpha > 0);

      particles.current.forEach(p => {
        if (p.alpha <= 0) return;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);

        if (p.glow) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = p.sym ? 14 : 8;
        }

        if (p.sym) {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.font = `${p.r}px serif`;
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
      });

      // Floating texts
      floatTexts.current.forEach(ft => {
        ft.y += ft.vy;
        ft.alpha -= 0.014;
      });
      floatTexts.current = floatTexts.current.filter(ft => ft.alpha > 0);
      floatTexts.current.forEach(ft => {
        if (ft.alpha <= 0) return;
        ctx.save();
        ctx.globalAlpha = Math.max(0, ft.alpha);
        ctx.font = 'bold 13px "Cormorant Garamond", Georgia, serif';
        ctx.fillStyle = '#F5C56B';
        ctx.shadowColor = '#C8A96A';
        ctx.shadowBlur = 14;
        ctx.textAlign = 'center';
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Wand tip is at (2, 2) — top-left of the SVG
  const wandOffset = { x: -2, y: -2 };

  return (
    <>
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9998, width: '100vw', height: '100vh' }}
      />

      {/* Magic Wand SVG cursor */}
      <div
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          zIndex: 9999,
          transform: `translate3d(${pos.x + wandOffset.x}px, ${pos.y + wandOffset.y}px, 0)`,
          willChange: 'transform',
          transition: 'transform 40ms linear',
        }}
      >
        {/* Wand tip aura glow */}
        <div
          className="absolute transition-all duration-200"
          style={{
            top: '-10px', left: '-10px',
            width: clicking ? '52px' : hovered ? '44px' : '28px',
            height: clicking ? '52px' : hovered ? '44px' : '28px',
            borderRadius: '50%',
            background: clicking
              ? 'radial-gradient(circle, rgba(255,215,0,0.7) 0%, rgba(200,169,106,0.4) 40%, transparent 70%)'
              : hovered
              ? 'radial-gradient(circle, rgba(255,215,0,0.5) 0%, rgba(200,169,106,0.25) 45%, transparent 70%)'
              : 'radial-gradient(circle, rgba(255,220,120,0.35) 0%, rgba(200,169,106,0.1) 50%, transparent 70%)',
            filter: `blur(${clicking ? 5 : hovered ? 3 : 1.5}px)`,
            pointerEvents: 'none',
          }}
        />

        {/* Wand SVG — tip at (2, 2), handle at bottom-right */}
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: clicking ? 'scale(0.9) rotate(12deg)' : hovered ? 'scale(1.12) rotate(-5deg)' : 'scale(1)',
            transition: 'transform 150ms ease',
            transformOrigin: '2px 2px',
            filter: `drop-shadow(0 0 ${hovered || clicking ? 8 : 4}px rgba(200,169,106,0.8))`,
          }}
        >
          {/* Main wand shaft — dark ebony wood */}
          <line x1="2" y1="2" x2="34" y2="34" stroke="#1A0F08" strokeWidth="4.5" strokeLinecap="round" />

          {/* Gold inlay / shimmer stripe */}
          <line x1="2" y1="2" x2="34" y2="34" stroke="#C8A96A" strokeWidth="1.5" strokeDasharray="3 4" strokeLinecap="round" opacity="0.7" />

          {/* Brass decorative rings */}
          <circle cx="12" cy="12" r="2.8" fill="#E6B566" opacity="0.9" />
          <circle cx="20" cy="20" r="2" fill="#C8A96A" opacity="0.8" />
          <circle cx="28" cy="28" r="1.6" fill="#A86532" opacity="0.7" />

          {/* Handle — thick dark leather wrap */}
          <line x1="28" y1="28" x2="36" y2="36" stroke="#0D0905" strokeWidth="7" strokeLinecap="round" />
          {/* Handle end cap */}
          <circle cx="36" cy="36" r="3" fill="#C8A96A" opacity="0.9" />
          <circle cx="36" cy="36" r="1.5" fill="#FFD700" opacity="0.8" />

          {/* Wand tip — glowing crystal core */}
          <circle cx="2" cy="2" r="4.5" fill="rgba(255,255,255,0.95)" />
          <circle cx="2" cy="2" r="6.5" fill="rgba(200,169,106,0.5)" />
          <circle cx="2" cy="2" r="8.5" fill="rgba(200,169,106,0.18)" />

          {/* Tip sparkle rays */}
          <g stroke="#FFD700" strokeWidth="1.2" strokeLinecap="round" opacity="0.9">
            <line x1="2" y1="-3" x2="2" y2="-6" />
            <line x1="2" y1="7" x2="2" y2="10" />
            <line x1="-3" y1="2" x2="-6" y2="2" />
            <line x1="7" y1="2" x2="10" y2="2" />
            <line x1="-1.5" y1="-1.5" x2="-3.5" y2="-3.5" />
            <line x1="5.5" y1="5.5" x2="7.5" y2="7.5" />
          </g>
        </svg>

        {/* Tiny pulsing orb at wand tip */}
        <div
          className="absolute"
          style={{
            top: '-3px', left: '-3px',
            width: '8px', height: '8px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #fff 0%, #FFD700 40%, transparent 70%)',
            boxShadow: `0 0 ${clicking ? 20 : hovered ? 14 : 8}px ${clicking ? 12 : hovered ? 8 : 4}px rgba(200,169,106,0.7)`,
            animation: 'pulse 1.2s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.4); opacity: 0.6; }
        }
      `}</style>
    </>
  );
};
