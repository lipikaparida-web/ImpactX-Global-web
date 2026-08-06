import React, { useEffect, useRef, useState } from 'react';

/**
 * HogwartsCastleBackground
 * ─────────────────────────────────────────────────────────────
 * Full-screen fixed canvas that renders a rich, immersive
 * Hogwarts-style castle scene — entirely drawn in Canvas 2D.
 *
 * Layers (back → front):
 *  1. Deep midnight sky gradient (indigo-navy)
 *  2. Crescent moon with soft silver halo
 *  3. Twinkling star field (300+ stars)
 *  4. Rolling aurora / nebula wisps
 *  5. Slow-drifting cloud banks
 *  6. Distant misty mountains / forest silhouette
 *  7. Lake with shimmering moon reflection
 *  8. Gothic castle — fully detailed (towers, spires, buttresses,
 *     viaduct, windows, battlements) — STATIC, richly lit
 *  9. Castle warm window glow (flickering)
 * 10. Golden magic dust particles rising from castle
 * 11. Blue stardust fireflies drifting upward
 * 12. Tiny orbital sparkles that float everywhere
 * 13. Page-edge vignettes for contrast
 */
export const HogwartsCastleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let W = window.innerWidth;
    let H = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Mouse / touch parallax
    let mx = W / 2, my = H / 2;
    let tmx = W / 2, tmy = H / 2;
    const onMouseMove = (e: MouseEvent) => { tmx = e.clientX; tmy = e.clientY; };
    const onTouchMove = (e: TouchEvent) => { if (e.touches[0]) { tmx = e.touches[0].clientX; tmy = e.touches[0].clientY; } };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const isMobile = W < 768;

    // ── STARS ──────────────────────────────────────────────────
    const starCount = isMobile ? 220 : 420;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * W,
      y: Math.random() * H * 0.78,
      r: Math.random() * 1.4 + 0.15,
      baseAlpha: Math.random() * 0.7 + 0.25,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.018 + 0.005,
      color: Math.random() > 0.12
        ? 'rgba(215,230,255,'
        : Math.random() > 0.5 ? 'rgba(255,240,200,' : 'rgba(200,240,255,',
    }));

    // ── CLOUDS ─────────────────────────────────────────────────
    const numClouds = isMobile ? 5 : 9;
    const clouds = Array.from({ length: numClouds }, (_, i) => ({
      x: (i * W / numClouds) + Math.random() * 120 - 60,
      y: H * 0.05 + Math.random() * H * 0.35,
      rx: 100 + Math.random() * 180,
      ry: 30 + Math.random() * 40,
      speedX: 0.06 + Math.random() * 0.08,
      alpha: 0.06 + Math.random() * 0.09,
      purple: Math.random() > 0.5,
    }));

    // ── MAGIC DUST PARTICLES ───────────────────────────────────
    interface Mote {
      x: number; y: number;
      vx: number; vy: number;
      r: number; alpha: number;
      color: string; phase: number;
      isGold: boolean;
    }
    const MOTE_COUNT = isMobile ? 55 : 110;
    const motes: Mote[] = Array.from({ length: MOTE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.35 + 0.06),
      r: Math.random() * 2.2 + 0.4,
      alpha: Math.random() * 0.7 + 0.15,
      phase: Math.random() * Math.PI * 2,
      color: '',
      isGold: Math.random() > 0.45,
    }));
    motes.forEach(m => {
      m.color = m.isGold
        ? `rgba(${200 + Math.random() * 55 | 0},${155 + Math.random() * 55 | 0},${50 + Math.random() * 60 | 0},`
        : `rgba(${160 + Math.random() * 60 | 0},${200 + Math.random() * 55 | 0},${230 + Math.random() * 25 | 0},`;
    });

    // ── AURORA WISPS ───────────────────────────────────────────
    const wisps = Array.from({ length: 5 }, (_, i) => ({
      x: W * (0.15 + i * 0.18),
      y: H * (0.08 + Math.random() * 0.18),
      width: 140 + Math.random() * 200,
      phase: Math.random() * Math.PI * 2,
      speed: 0.008 + Math.random() * 0.006,
      alpha: 0.04 + Math.random() * 0.06,
      hue: 200 + Math.random() * 80, // blue-purple
    }));

    let time = 0;
    let scrollYLocal = window.scrollY;
    const onScroll2 = () => { scrollYLocal = window.scrollY; };
    window.addEventListener('scroll', onScroll2, { passive: true });

    // ── DRAW CASTLE ────────────────────────────────────────────
    // Detailed Hogwarts-style gothic silhouette
    const drawCastle = (
      horizonY: number,
      cx: number,
      s: number,
      t: number
    ) => {
      const hy = horizonY;

      // ── Lake / Water Reflection ──────────────────────────────
      // Base lake area
      const lakeGrad = ctx.createLinearGradient(0, hy + 5, 0, H + 100);
      lakeGrad.addColorStop(0, 'rgba(8,10,22,0.95)');
      lakeGrad.addColorStop(0.3, 'rgba(5,8,20,0.98)');
      lakeGrad.addColorStop(1, 'rgba(3,5,14,1)');
      ctx.fillStyle = lakeGrad;
      ctx.fillRect(0, hy + 5, W, H - hy);

      // Lake shimmer lines
      ctx.strokeStyle = 'rgba(150,170,220,0.06)';
      ctx.lineWidth = 1;
      for (let li = 0; li < 18; li++) {
        const ly = hy + 10 + li * 14;
        const shimmerAmt = Math.sin(t * 0.8 + li * 0.4) * 12;
        ctx.beginPath();
        ctx.moveTo(W * 0.1 + shimmerAmt, ly);
        ctx.lineTo(W * 0.9 - shimmerAmt * 0.5, ly);
        ctx.stroke();
      }

      // Moon reflection on lake
      const mReflectX = cx;
      const mReflectY = hy + 55;
      const reflGrad = ctx.createRadialGradient(mReflectX, mReflectY, 5, mReflectX, mReflectY, 100);
      reflGrad.addColorStop(0, 'rgba(200,220,255,0.18)');
      reflGrad.addColorStop(0.4, 'rgba(140,170,230,0.08)');
      reflGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = reflGrad;
      ctx.fillRect(0, hy, W, H - hy);

      // Castle reflection (wavy, dark)
      ctx.save();
      ctx.globalAlpha = 0.22;
      ctx.transform(1, 0, 0, -0.35, 0, hy * 1.35);
      drawCastleSilhouette(cx, hy - 5, s, t, 'rgba(5,8,20,0.9)');
      ctx.restore();

      // ── Mountains / Forest ───────────────────────────────────
      // Far mountains
      ctx.fillStyle = '#060A18';
      ctx.beginPath();
      ctx.moveTo(0, hy + 10);
      for (let xi = 0; xi <= W; xi += W / 8) {
        const peakH = 55 + Math.sin(xi * 0.005) * 40 + Math.cos(xi * 0.009 + 1) * 30;
        ctx.lineTo(xi, hy - peakH * s);
      }
      ctx.lineTo(W, hy + 10);
      ctx.closePath();
      ctx.fill();

      // Near tree line
      ctx.fillStyle = '#03060E';
      ctx.beginPath();
      ctx.moveTo(0, hy + 10);
      for (let tx = 0; tx <= W; tx += 12) {
        const treeH = 18 + Math.sin(tx * 0.08 + 2) * 14 + Math.sin(tx * 0.03) * 10;
        ctx.lineTo(tx, hy - treeH * s);
        ctx.lineTo(tx + 6, hy - treeH * s * 0.7);
      }
      ctx.lineTo(W, hy + 10);
      ctx.closePath();
      ctx.fill();

      // ── Castle Rocky Cliff Base ──────────────────────────────
      const cliffGrad = ctx.createLinearGradient(cx, hy - 20, cx, hy + 35);
      cliffGrad.addColorStop(0, '#0B0E1A');
      cliffGrad.addColorStop(1, '#05070F');
      ctx.fillStyle = cliffGrad;
      ctx.beginPath();
      ctx.moveTo(cx - 450 * s, hy + 35);
      ctx.bezierCurveTo(cx - 380 * s, hy - 5, cx - 260 * s, hy - 15, cx - 180 * s, hy - 20);
      ctx.lineTo(cx + 180 * s, hy - 20);
      ctx.bezierCurveTo(cx + 260 * s, hy - 15, cx + 380 * s, hy - 5, cx + 450 * s, hy + 35);
      ctx.closePath();
      ctx.fill();

      // ── Main Castle Silhouette ───────────────────────────────
      drawCastleSilhouette(cx, hy, s, t, '#080B16');

      // ── Castle Warm Window Lights ────────────────────────────
      const flickerBase = 0.82 + Math.sin(t * 2.1) * 0.09 + Math.sin(t * 5.3) * 0.05;

      const windows = [
        // Main central tower windows
        { x: cx - 8 * s, y: hy - 220 * s, w: 7 * s, h: 15 * s },
        { x: cx + 4 * s, y: hy - 220 * s, w: 7 * s, h: 15 * s },
        { x: cx - 12 * s, y: hy - 160 * s, w: 8 * s, h: 13 * s },
        { x: cx + 5 * s, y: hy - 160 * s, w: 8 * s, h: 13 * s },
        { x: cx - 16 * s, y: hy - 100 * s, w: 8 * s, h: 12 * s },
        { x: cx + 9 * s, y: hy - 100 * s, w: 8 * s, h: 12 * s },
        // Left tower
        { x: cx - 242 * s, y: hy - 135 * s, w: 8 * s, h: 13 * s },
        { x: cx - 225 * s, y: hy - 135 * s, w: 8 * s, h: 13 * s },
        { x: cx - 242 * s, y: hy - 85 * s, w: 8 * s, h: 11 * s },
        { x: cx - 225 * s, y: hy - 85 * s, w: 8 * s, h: 11 * s },
        // Right clocktower
        { x: cx + 108 * s, y: hy - 175 * s, w: 14 * s, h: 14 * s }, // clock face glow
        { x: cx + 88 * s, y: hy - 110 * s, w: 8 * s, h: 12 * s },
        { x: cx + 115 * s, y: hy - 110 * s, w: 8 * s, h: 12 * s },
        { x: cx + 88 * s, y: hy - 68 * s, w: 8 * s, h: 11 * s },
        // Far right guard tower
        { x: cx + 245 * s, y: hy - 80 * s, w: 9 * s, h: 13 * s },
        { x: cx + 265 * s, y: hy - 80 * s, w: 9 * s, h: 13 * s },
        { x: cx + 245 * s, y: hy - 45 * s, w: 9 * s, h: 11 * s },
        // Left dome building
        { x: cx - 138 * s, y: hy - 90 * s, w: 7 * s, h: 11 * s },
        { x: cx - 120 * s, y: hy - 90 * s, w: 7 * s, h: 11 * s },
        { x: cx - 148 * s, y: hy - 55 * s, w: 7 * s, h: 10 * s },
        { x: cx - 125 * s, y: hy - 55 * s, w: 7 * s, h: 10 * s },
      ];

      windows.forEach((w, i) => {
        const individualFlicker = flickerBase + Math.sin(t * 3.1 + i * 1.3) * 0.08;
        const amber = `rgba(240,170,60,${(0.6 + Math.random() * 0.15) * individualFlicker})`;
        ctx.fillStyle = amber;
        ctx.shadowColor = 'rgba(255,180,60,0.8)';
        ctx.shadowBlur = 12;
        ctx.fillRect(w.x, w.y, w.w, w.h);
        // Outer glow
        const wgGrad = ctx.createRadialGradient(w.x + w.w / 2, w.y + w.h / 2, 1, w.x + w.w / 2, w.y + w.h / 2, 22 * s);
        wgGrad.addColorStop(0, `rgba(255,180,60,${0.18 * individualFlicker})`);
        wgGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = wgGrad;
        ctx.fillRect(w.x - 20 * s, w.y - 20 * s, w.w + 40 * s, w.h + 40 * s);
      });
      ctx.shadowBlur = 0;
    };

    // Draws the castle body silhouette in any fill color
    const drawCastleSilhouette = (cx: number, hy: number, s: number, _t: number, color: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();

      // ─ Viaduct bridge (far left) ─
      ctx.rect(cx - 440 * s, hy - 28 * s, 170 * s, 28 * s);
      // Bridge arches (subtractive would need clip, so just draw supports)
      for (let ba = 0; ba < 4; ba++) {
        const bx = cx - 430 * s + ba * 42 * s;
        ctx.rect(bx, hy - 28 * s, 8 * s, 28 * s);
      }

      // ─ Far-left outer wall ─
      ctx.rect(cx - 440 * s, hy - 45 * s, 90 * s, 45 * s);
      // Battlements
      for (let b = 0; b < 5; b++) {
        ctx.rect(cx - 440 * s + b * 18 * s, hy - 55 * s, 10 * s, 12 * s);
      }

      // ─ Left side tall tower ─
      ctx.rect(cx - 270 * s, hy - 145 * s, 70 * s, 145 * s);
      // Left tower conical spire
      ctx.moveTo(cx - 280 * s, hy - 145 * s);
      ctx.lineTo(cx - 235 * s, hy - 255 * s);
      ctx.lineTo(cx - 190 * s, hy - 145 * s);
      ctx.closePath();
      // Left tower battlements
      for (let b = 0; b < 4; b++) {
        ctx.rect(cx - 272 * s + b * 18 * s, hy - 155 * s, 10 * s, 12 * s);
      }

      // ─ Left dome hall ─
      ctx.beginPath();
      ctx.arc(cx - 130 * s, hy - 90 * s, 52 * s, Math.PI, 0);
      ctx.rect(cx - 182 * s, hy - 90 * s, 104 * s, 90 * s);
      ctx.fill();

      ctx.beginPath();

      // ─ Central great hall (wide, dominant) ─
      ctx.rect(cx - 80 * s, hy - 110 * s, 160 * s, 110 * s);
      // Battlements
      for (let b = 0; b < 8; b++) {
        ctx.rect(cx - 80 * s + b * 20 * s, hy - 120 * s, 12 * s, 12 * s);
      }

      // ─ MAIN CENTRAL SPIRE (tallest) ─
      ctx.rect(cx - 36 * s, hy - 180 * s, 72 * s, 180 * s);
      // Sub-spire on main tower
      ctx.moveTo(cx - 50 * s, hy - 180 * s);
      ctx.lineTo(cx, hy - 335 * s);
      ctx.lineTo(cx + 50 * s, hy - 180 * s);
      ctx.closePath();
      // Circular observatory window cut at ~185*s
      ctx.arc(cx, hy - 200 * s, 14 * s, 0, Math.PI * 2);

      // ─ Astronomy tower (slightly right of center) ─
      ctx.rect(cx + 40 * s, hy - 150 * s, 50 * s, 150 * s);
      // Astronomy tower spire
      ctx.moveTo(cx + 35 * s, hy - 150 * s);
      ctx.lineTo(cx + 65 * s, hy - 250 * s);
      ctx.lineTo(cx + 95 * s, hy - 150 * s);
      ctx.closePath();
      // Open platform rim
      for (let b = 0; b < 4; b++) {
        ctx.rect(cx + 36 * s + b * 13 * s, hy - 158 * s, 8 * s, 10 * s);
      }

      // ─ Clock Tower ─
      ctx.rect(cx + 85 * s, hy - 130 * s, 55 * s, 130 * s);
      ctx.moveTo(cx + 80 * s, hy - 130 * s);
      ctx.lineTo(cx + 112 * s, hy - 210 * s);
      ctx.lineTo(cx + 145 * s, hy - 130 * s);
      ctx.closePath();
      // Clock circle
      ctx.arc(cx + 112 * s, hy - 158 * s, 18 * s, 0, Math.PI * 2);

      // ─ Right wing (lower, long) ─
      ctx.rect(cx + 140 * s, hy - 75 * s, 170 * s, 75 * s);
      // Right battlements
      for (let b = 0; b < 8; b++) {
        ctx.rect(cx + 140 * s + b * 21 * s, hy - 85 * s, 12 * s, 12 * s);
      }

      // ─ Right guard tower ─
      ctx.rect(cx + 240 * s, hy - 100 * s, 70 * s, 100 * s);
      ctx.moveTo(cx + 235 * s, hy - 100 * s);
      ctx.lineTo(cx + 275 * s, hy - 185 * s);
      ctx.lineTo(cx + 315 * s, hy - 100 * s);
      ctx.closePath();
      for (let b = 0; b < 4; b++) {
        ctx.rect(cx + 238 * s + b * 17 * s, hy - 110 * s, 10 * s, 12 * s);
      }

      // ─ Far right outer wall ─
      ctx.rect(cx + 310 * s, hy - 55 * s, 80 * s, 55 * s);
      for (let b = 0; b < 4; b++) {
        ctx.rect(cx + 310 * s + b * 19 * s, hy - 65 * s, 11 * s, 12 * s);
      }

      ctx.fill();

      // ─ Buttresses ─
      ctx.fillStyle = color;
      [[cx - 80 * s, cx - 50 * s], [cx + 50 * s, cx + 80 * s]].forEach(([x1, x2]) => {
        ctx.beginPath();
        ctx.moveTo(x1, hy - 40 * s);
        ctx.lineTo(x2, hy);
        ctx.lineTo(x2 + 6 * s, hy);
        ctx.lineTo(x1 + 6 * s, hy - 40 * s);
        ctx.fill();
      });
    };

    // ── MAIN RENDER LOOP ───────────────────────────────────────
    const render = () => {
      time += 0.012;
      animId = requestAnimationFrame(render);

      // Smooth mouse parallax
      mx += (tmx - mx) * 0.022;
      my += (tmy - my) * 0.022;
      const px = ((mx / W) - 0.5) * (isMobile ? 14 : 28);
      const py = ((my / H) - 0.5) * (isMobile ? 7 : 14);
      const scrollPar = scrollYLocal * 0.1;

      ctx.clearRect(0, 0, W, H);

      // 1. Deep midnight sky
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, '#03040C');
      sky.addColorStop(0.22, '#060919');
      sky.addColorStop(0.5, '#0A102A');
      sky.addColorStop(0.78, '#0D1430');
      sky.addColorStop(1, '#060810');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      // 2. Aurora wisps
      wisps.forEach(w => {
        w.phase += w.speed;
        const wy = w.y + Math.sin(w.phase) * 18 - scrollPar * 0.04;
        const auroraGrad = ctx.createRadialGradient(w.x, wy, 5, w.x, wy, w.width);
        auroraGrad.addColorStop(0, `hsla(${w.hue},80%,65%,${w.alpha * 1.4})`);
        auroraGrad.addColorStop(0.5, `hsla(${w.hue + 30},60%,55%,${w.alpha * 0.6})`);
        auroraGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = auroraGrad;
        ctx.fillRect(0, 0, W, H);
      });

      // 3. Stars
      stars.forEach(star => {
        star.phase += star.speed;
        const a = Math.max(0.05, Math.min(0.95, star.baseAlpha + Math.sin(star.phase) * 0.3));
        const sx = (star.x + px * 0.18 + W) % W;
        const sy = star.y - scrollPar * 0.18 + py * 0.12;
        if (sy < 0 || sy > H * 0.82) return;
        ctx.beginPath();
        ctx.arc(sx, sy, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${a})`;
        if (star.r > 1.0) {
          ctx.shadowColor = `${star.color}0.6)`;
          ctx.shadowBlur = 4;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 4. Crescent Moon
      const moonX = W * (isMobile ? 0.78 : 0.74) + px * 0.35;
      const moonY = H * (isMobile ? 0.14 : 0.17) - scrollPar * 0.12 + py * 0.18;
      const moonR = isMobile ? 30 : 44;
      const moonPulse = Math.sin(time * 0.6) * 8;

      // Moon halo
      const moonHalo = ctx.createRadialGradient(moonX, moonY, moonR, moonX, moonY, moonR * 7 + moonPulse);
      moonHalo.addColorStop(0, 'rgba(180,210,255,0.18)');
      moonHalo.addColorStop(0.3, 'rgba(120,160,240,0.07)');
      moonHalo.addColorStop(0.7, 'rgba(40,60,120,0.02)');
      moonHalo.addColorStop(1, 'transparent');
      ctx.fillStyle = moonHalo;
      ctx.fillRect(0, 0, W, H);

      // Moon disk
      ctx.save();
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(235,242,255,0.90)';
      ctx.shadowColor = 'rgba(180,210,255,0.7)';
      ctx.shadowBlur = 20;
      ctx.fill();
      // Surface texture
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = 'rgba(160,185,220,1)';
      ctx.beginPath();
      ctx.arc(moonX - moonR * 0.22, moonY - moonR * 0.18, moonR * 0.2, 0, Math.PI * 2);
      ctx.arc(moonX - moonR * 0.4, moonY + moonR * 0.3, moonR * 0.14, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();

      // 5. Clouds
      clouds.forEach(cloud => {
        cloud.x += cloud.speedX;
        if (cloud.x - cloud.rx > W) cloud.x = -cloud.rx;
        const cy = cloud.y - scrollPar * 0.08 + py * 0.08;
        ctx.save();
        const cg = ctx.createRadialGradient(cloud.x, cy, cloud.ry * 0.2, cloud.x, cy, cloud.rx);
        const c1 = cloud.purple
          ? `rgba(120,90,180,${cloud.alpha * 1.6})`
          : `rgba(80,100,155,${cloud.alpha * 1.5})`;
        cg.addColorStop(0, c1);
        cg.addColorStop(1, 'transparent');
        ctx.fillStyle = cg;
        ctx.beginPath();
        ctx.ellipse(cloud.x, cy, cloud.rx, cloud.ry, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 6. Castle scene
      const horizonY = H * (isMobile ? 0.79 : 0.80) - scrollPar * 0.28 + py * 0.25;
      const castleCX = W * 0.5 + px * 0.45;
      const castleS = isMobile
        ? Math.min(0.75, Math.max(0.45, W / 720))
        : Math.min(1.1, Math.max(0.72, W / 1450));

      drawCastle(horizonY, castleCX, castleS, time);

      // 7. Magic dust motes
      motes.forEach(m => {
        m.x += m.vx + Math.sin(time * 0.6 + m.phase) * 0.1;
        m.y += m.vy;
        m.phase += 0.022;
        if (m.y < -10) { m.y = H + 10; m.x = Math.random() * W; }
        const ma = m.alpha * (0.7 + Math.sin(m.phase) * 0.3);
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `${m.color}${ma})`;
        if (m.isGold) { ctx.shadowColor = `${m.color}0.8)`; ctx.shadowBlur = 5; }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 8. Extra sparkle crosses at random positions
      if (Math.floor(time * 30) % 3 === 0) {
        const sx = Math.random() * W;
        const sy = Math.random() * H * 0.75;
        const sc = Math.random() > 0.5 ? 'rgba(200,169,106,0.6)' : 'rgba(180,210,255,0.5)';
        const sl = 4 + Math.random() * 6;
        ctx.save();
        ctx.strokeStyle = sc;
        ctx.lineWidth = 1;
        ctx.shadowColor = sc;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.moveTo(sx - sl, sy); ctx.lineTo(sx + sl, sy);
        ctx.moveTo(sx, sy - sl); ctx.lineTo(sx, sy + sl);
        ctx.stroke();
        ctx.restore();
      }

      // 9. Vignettes
      // Top vignette
      const topVig = ctx.createLinearGradient(0, 0, 0, H * 0.22);
      topVig.addColorStop(0, 'rgba(3,4,12,0.72)');
      topVig.addColorStop(1, 'transparent');
      ctx.fillStyle = topVig;
      ctx.fillRect(0, 0, W, H * 0.22);

      // Bottom vignette
      const botVig = ctx.createLinearGradient(0, H * 0.75, 0, H);
      botVig.addColorStop(0, 'transparent');
      botVig.addColorStop(1, 'rgba(3,4,12,0.95)');
      ctx.fillStyle = botVig;
      ctx.fillRect(0, H * 0.75, W, H * 0.25);

      // Side vignettes
      const leftVig = ctx.createLinearGradient(0, 0, W * 0.18, 0);
      leftVig.addColorStop(0, 'rgba(3,4,12,0.55)');
      leftVig.addColorStop(1, 'transparent');
      ctx.fillStyle = leftVig;
      ctx.fillRect(0, 0, W * 0.18, H);

      const rightVig = ctx.createLinearGradient(W, 0, W * 0.82, 0);
      rightVig.addColorStop(0, 'rgba(3,4,12,0.55)');
      rightVig.addColorStop(1, 'transparent');
      ctx.fillStyle = rightVig;
      ctx.fillRect(W * 0.82, 0, W * 0.18, H);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('scroll', onScroll2);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
