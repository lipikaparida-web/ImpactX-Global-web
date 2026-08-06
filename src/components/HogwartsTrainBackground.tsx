import React, { useEffect, useRef } from 'react';

/**
 * HogwartsTrainBackground
 * ─────────────────────────────────────────────────────────────
 * Full-viewport fixed canvas that renders the ImpactX Global
 * Express (Hogwarts-style steam locomotive) running perpetually
 * across the bottom quarter of the screen.  Appears behind every
 * section thanks to z-index: 1.
 *
 * Features
 *  • Detailed locomotive silhouette (boiler, cab, wheels, rods)
 *  • Animated steam / smoke puffs from the chimney stack
 *  • Golden ember sparks flying from the firebox
 *  • Warm lantern / headlamp bloom
 *  • Moving carriage cars behind the engine
 *  • Parallax rail tracks
 *  • Subtle ambient fog rolling along the track bed
 */
export const HogwartsTrainBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let W = window.innerWidth;
    let H = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
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

    /* ─── Train state ─── */
    const TRAIN_SCALE = 0.72;   // global size multiplier
    const TRAIN_SPEED = 0.35;   // px per frame
    const TRACK_Y_RATIO = 0.88; // track vertical position (% of screen height)

    // Start off-screen to the right
    let trainX = W + 200;

    /* ─── Smoke particles ─── */
    interface Smoke {
      x: number; y: number;
      vx: number; vy: number;
      r: number; maxR: number;
      alpha: number; life: number; maxLife: number;
    }
    const smokes: Smoke[] = [];

    const spawnSmoke = (ox: number, oy: number) => {
      smokes.push({
        x: ox, y: oy,
        vx: -(Math.random() * 0.8 + 0.4) - TRAIN_SPEED,
        vy: -(Math.random() * 0.9 + 0.3),
        r: 8 + Math.random() * 6,
        maxR: 55 + Math.random() * 70,
        alpha: 0.28 + Math.random() * 0.18,
        life: 0, maxLife: 130 + Math.random() * 80,
      });
    };

    /* ─── Ember sparks ─── */
    interface Spark {
      x: number; y: number;
      vx: number; vy: number;
      life: number; maxLife: number;
      size: number; hue: number;
    }
    const sparks: Spark[] = [];

    const spawnSpark = (ox: number, oy: number) => {
      sparks.push({
        x: ox, y: oy,
        vx: -(Math.random() * 3 + 1) - TRAIN_SPEED,
        vy: -(Math.random() * 2.5) + Math.random() * 1.5,
        life: 0, maxLife: 35 + Math.random() * 25,
        size: 1.5 + Math.random() * 2,
        hue: 30 + Math.random() * 30,
      });
    };

    /* ─── Draw locomotive ─── */
    const drawTrain = (cx: number, trackY: number, frame: number) => {
      const s = TRAIN_SCALE;

      // Wheel rotation angle
      const wheelAngle = (frame * 0.07) % (Math.PI * 2);

      /* ── Rail tracks ── */
      ctx.save();
      ctx.strokeStyle = 'rgba(160,120,60,0.18)';
      ctx.lineWidth = 3 * s;
      // Top rail
      ctx.beginPath();
      ctx.moveTo(0, trackY - 6 * s);
      ctx.lineTo(W, trackY - 6 * s);
      ctx.stroke();
      // Bottom rail
      ctx.beginPath();
      ctx.moveTo(0, trackY + 6 * s);
      ctx.lineTo(W, trackY + 6 * s);
      ctx.stroke();
      // Sleepers (ties)
      ctx.strokeStyle = 'rgba(100,70,35,0.13)';
      ctx.lineWidth = 4 * s;
      const sleeperSpacing = 38;
      const sleeperOffset = ((frame * TRAIN_SPEED) % sleeperSpacing);
      for (let sx = -sleeperOffset; sx < W + sleeperSpacing; sx += sleeperSpacing) {
        ctx.beginPath();
        ctx.moveTo(sx, trackY - 14 * s);
        ctx.lineTo(sx, trackY + 14 * s);
        ctx.stroke();
      }
      ctx.restore();

      /* ── Fog / ground haze ── */
      const fogGrad = ctx.createLinearGradient(0, trackY + 10 * s, 0, trackY + 55 * s);
      fogGrad.addColorStop(0, 'rgba(180,140,80,0.07)');
      fogGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = fogGrad;
      ctx.fillRect(0, trackY + 10 * s, W, 55 * s);

      /* ── Headlamp glow ── */
      const lampX = cx + 185 * s;
      const lampY = trackY - 38 * s;
      const lampPulse = Math.sin(frame * 0.04) * 0.05 + 0.95;
      const lampGrad = ctx.createRadialGradient(lampX, lampY, 2, lampX, lampY, 240 * s * lampPulse);
      lampGrad.addColorStop(0, `rgba(255,240,180,${0.55 * lampPulse})`);
      lampGrad.addColorStop(0.12, `rgba(220,170,80,${0.28 * lampPulse})`);
      lampGrad.addColorStop(0.4, `rgba(180,110,30,${0.09 * lampPulse})`);
      lampGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = lampGrad;
      ctx.beginPath();
      ctx.arc(lampX, lampY, 240 * s, 0, Math.PI * 2);
      ctx.fill();

      /* ── Draw carriages first (behind engine) ── */
      const carriageCount = 3;
      const carriageW = 110 * s;
      const carriageH = 60 * s;
      const carriageGap = 8 * s;
      const engineW = 200 * s;

      for (let c = 0; c < carriageCount; c++) {
        const cX = cx - engineW / 2 - (c + 1) * (carriageW + carriageGap);
        const cY = trackY - carriageH - 4 * s;

        // Carriage body
        const cGrad = ctx.createLinearGradient(cX, cY, cX, cY + carriageH);
        cGrad.addColorStop(0, '#2A1E10');
        cGrad.addColorStop(0.5, '#1C1208');
        cGrad.addColorStop(1, '#100C06');
        ctx.fillStyle = cGrad;
        ctx.beginPath();
        ctx.roundRect(cX, cY, carriageW, carriageH, 4 * s);
        ctx.fill();

        // Gold trim border
        ctx.strokeStyle = 'rgba(200,169,106,0.35)';
        ctx.lineWidth = 1.2 * s;
        ctx.beginPath();
        ctx.roundRect(cX + 2 * s, cY + 2 * s, carriageW - 4 * s, carriageH - 4 * s, 3 * s);
        ctx.stroke();

        // Windows (warm amber glow inside)
        const winCount = 3;
        const winW = 16 * s;
        const winH = 20 * s;
        const winY = cY + 12 * s;
        for (let w = 0; w < winCount; w++) {
          const winX = cX + 14 * s + w * (winW + 9 * s);
          // Window glow
          const winGlow = ctx.createRadialGradient(winX + winW / 2, winY + winH / 2, 0, winX + winW / 2, winY + winH / 2, winW * 1.5);
          winGlow.addColorStop(0, 'rgba(255,210,120,0.22)');
          winGlow.addColorStop(1, 'transparent');
          ctx.fillStyle = winGlow;
          ctx.beginPath();
          ctx.arc(winX + winW / 2, winY + winH / 2, winW * 1.5, 0, Math.PI * 2);
          ctx.fill();
          // Window glass
          ctx.fillStyle = 'rgba(255,200,100,0.55)';
          ctx.beginPath();
          ctx.roundRect(winX, winY, winW, winH, 2 * s);
          ctx.fill();
          ctx.strokeStyle = 'rgba(180,140,60,0.5)';
          ctx.lineWidth = s;
          ctx.stroke();
        }

        // Carriage wheels (2 per carriage)
        [cX + 18 * s, cX + carriageW - 18 * s].forEach((wx) => {
          const wy = trackY - 4 * s;
          ctx.save();
          ctx.translate(wx, wy);
          ctx.rotate(wheelAngle);
          // Outer rim
          ctx.beginPath();
          ctx.arc(0, 0, 10 * s, 0, Math.PI * 2);
          ctx.fillStyle = '#1A1008';
          ctx.fill();
          ctx.strokeStyle = 'rgba(180,140,60,0.5)';
          ctx.lineWidth = 1.5 * s;
          ctx.stroke();
          // Spokes
          for (let sp = 0; sp < 6; sp++) {
            const angle = (sp / 6) * Math.PI * 2;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(angle) * 9 * s, Math.sin(angle) * 9 * s);
            ctx.strokeStyle = 'rgba(160,120,50,0.55)';
            ctx.lineWidth = 1 * s;
            ctx.stroke();
          }
          // Hub
          ctx.beginPath();
          ctx.arc(0, 0, 2.5 * s, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(200,169,106,0.8)';
          ctx.fill();
          ctx.restore();
        });
      }

      /* ── LOCOMOTIVE ENGINE ── */
      ctx.save();

      const eLeft = cx - 100 * s;  // left edge of engine
      const eRight = cx + 190 * s; // right edge (front of engine)

      // ── Tender (coal car behind cab) ──
      const tenderX = eLeft - 65 * s;
      const tenderY = trackY - 48 * s;
      ctx.fillStyle = '#1A1008';
      ctx.beginPath();
      ctx.roundRect(tenderX, tenderY, 62 * s, 44 * s, 3 * s);
      ctx.fill();
      ctx.strokeStyle = 'rgba(160,120,50,0.3)';
      ctx.lineWidth = s;
      ctx.stroke();

      // ── Cab (driver's cabin) ──
      const cabX = eLeft;
      const cabY = trackY - 75 * s;
      const cabW = 70 * s;
      const cabH = 68 * s;
      const cabGrad = ctx.createLinearGradient(cabX, cabY, cabX + cabW, cabY + cabH);
      cabGrad.addColorStop(0, '#2C1F0E');
      cabGrad.addColorStop(1, '#150E06');
      ctx.fillStyle = cabGrad;
      ctx.beginPath();
      ctx.roundRect(cabX, cabY, cabW, cabH, 5 * s);
      ctx.fill();
      ctx.strokeStyle = 'rgba(200,169,106,0.35)';
      ctx.lineWidth = 1.5 * s;
      ctx.stroke();

      // Cab window (round arch)
      ctx.fillStyle = 'rgba(255,210,130,0.45)';
      ctx.beginPath();
      ctx.roundRect(cabX + 8 * s, cabY + 10 * s, 24 * s, 28 * s, 3 * s);
      ctx.fill();
      ctx.strokeStyle = 'rgba(180,140,60,0.5)';
      ctx.lineWidth = s;
      ctx.stroke();

      // Cab roof overhang
      ctx.fillStyle = '#1E140A';
      ctx.beginPath();
      ctx.rect(cabX - 4 * s, cabY - 6 * s, cabW + 8 * s, 10 * s);
      ctx.fill();

      // ── Main Boiler ──
      const boilerY = trackY - 58 * s;
      const boilerR = 22 * s;
      const boilerL = cabX + cabW - 5 * s;
      const boilerRight = cx + 150 * s;

      // Boiler cylinder
      const boilerGrad = ctx.createLinearGradient(0, boilerY - boilerR, 0, boilerY + boilerR);
      boilerGrad.addColorStop(0, '#3A2710');
      boilerGrad.addColorStop(0.45, '#1E1208');
      boilerGrad.addColorStop(1, '#0E0906');
      ctx.fillStyle = boilerGrad;
      ctx.beginPath();
      ctx.moveTo(boilerL, boilerY - boilerR);
      ctx.lineTo(boilerRight, boilerY - boilerR);
      ctx.arc(boilerRight, boilerY, boilerR, -Math.PI / 2, Math.PI / 2);
      ctx.lineTo(boilerL, boilerY + boilerR);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = 'rgba(200,169,106,0.28)';
      ctx.lineWidth = 1.5 * s;
      ctx.stroke();

      // Boiler bands
      for (let b = 0; b < 4; b++) {
        const bx = boilerL + (boilerRight - boilerL) * (0.15 + b * 0.22);
        ctx.beginPath();
        ctx.moveTo(bx, boilerY - boilerR + 2);
        ctx.lineTo(bx, boilerY + boilerR - 2);
        ctx.strokeStyle = 'rgba(160,120,50,0.30)';
        ctx.lineWidth = 2 * s;
        ctx.stroke();
      }

      // ── Smoke stack (chimney) ──
      const stackX = boilerL + 30 * s;
      const stackY = boilerY - boilerR;
      ctx.fillStyle = '#120D07';
      // Stack base
      ctx.beginPath();
      ctx.rect(stackX - 7 * s, stackY - 28 * s, 14 * s, 28 * s);
      ctx.fill();
      // Stack bell top
      ctx.beginPath();
      ctx.ellipse(stackX, stackY - 28 * s, 11 * s, 6 * s, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#1A1208';
      ctx.fill();
      ctx.strokeStyle = 'rgba(180,140,60,0.35)';
      ctx.lineWidth = s;
      ctx.stroke();

      // Emit smoke from stack
      if (frame % 4 === 0) spawnSmoke(stackX, stackY - 32 * s);

      // ── Front buffer plate ──
      const frontPlateX = cx + 148 * s;
      const frontPlateY = boilerY - 10 * s;
      // Buffer beam
      ctx.fillStyle = '#2A1A08';
      ctx.fillRect(frontPlateX - 2 * s, frontPlateY, 12 * s, 36 * s);
      // Buffer blocks
      ctx.fillStyle = '#1A1008';
      ctx.fillRect(frontPlateX - 2 * s, frontPlateY + 4 * s, 12 * s, 10 * s);
      ctx.fillRect(frontPlateX - 2 * s, frontPlateY + 22 * s, 12 * s, 10 * s);
      // Plate face
      ctx.fillStyle = '#3A1A0A';
      ctx.beginPath();
      ctx.arc(frontPlateX + 5 * s, boilerY + 2 * s, 16 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(200,169,106,0.55)';
      ctx.lineWidth = 1.5 * s;
      ctx.stroke();
      // Crest text
      ctx.fillStyle = '#F5E6C8';
      ctx.font = `bold ${Math.floor(6 * s)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('IX', frontPlateX + 5 * s, boilerY + 2 * s);

      // ── Headlamp ──
      ctx.fillStyle = '#FFF5E0';
      ctx.beginPath();
      ctx.arc(frontPlateX + 5 * s, boilerY + 18 * s, 7 * s, 0, Math.PI * 2);
      ctx.fill();
      const hlGlow = ctx.createRadialGradient(frontPlateX + 5 * s, boilerY + 18 * s, 1, frontPlateX + 5 * s, boilerY + 18 * s, 20 * s);
      hlGlow.addColorStop(0, 'rgba(255,240,180,0.7)');
      hlGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = hlGlow;
      ctx.beginPath();
      ctx.arc(frontPlateX + 5 * s, boilerY + 18 * s, 20 * s, 0, Math.PI * 2);
      ctx.fill();

      // ── Driving wheels (large) ──
      const dWheelR = 28 * s;
      const dWheelCenters = [
        { x: boilerL + 55 * s, y: trackY },
        { x: boilerL + 110 * s, y: trackY },
      ];
      dWheelCenters.forEach(({ x: wx, y: wy }) => {
        ctx.save();
        ctx.translate(wx, wy);
        ctx.rotate(wheelAngle);
        // Outer rim
        ctx.beginPath();
        ctx.arc(0, 0, dWheelR, 0, Math.PI * 2);
        ctx.fillStyle = '#18100A';
        ctx.fill();
        ctx.strokeStyle = 'rgba(180,140,60,0.55)';
        ctx.lineWidth = 2.5 * s;
        ctx.stroke();
        // Spokes
        for (let sp = 0; sp < 8; sp++) {
          const angle = (sp / 8) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle) * (dWheelR - 3 * s), Math.sin(angle) * (dWheelR - 3 * s));
          ctx.strokeStyle = 'rgba(160,120,50,0.65)';
          ctx.lineWidth = 1.8 * s;
          ctx.stroke();
        }
        // Hub
        ctx.beginPath();
        ctx.arc(0, 0, 5 * s, 0, Math.PI * 2);
        ctx.fillStyle = '#C8A96A';
        ctx.fill();
        ctx.restore();
      });

      // ── Piston rod connecting rods ──
      ctx.strokeStyle = 'rgba(180,140,60,0.45)';
      ctx.lineWidth = 3 * s;
      const rod1 = dWheelCenters[0];
      const rod2 = dWheelCenters[1];
      const rodY = rod1.y - dWheelR * 0.6 * Math.sin(wheelAngle);
      ctx.beginPath();
      ctx.moveTo(rod1.x + dWheelR * 0.85, rodY);
      ctx.lineTo(rod2.x + dWheelR * 0.85, rodY);
      ctx.stroke();

      // ── Small front pony wheels ──
      const ponyX = boilerL + 18 * s;
      const ponyR = 14 * s;
      ctx.save();
      ctx.translate(ponyX, trackY);
      ctx.rotate(wheelAngle * 1.5);
      ctx.beginPath();
      ctx.arc(0, 0, ponyR, 0, Math.PI * 2);
      ctx.fillStyle = '#18100A';
      ctx.fill();
      ctx.strokeStyle = 'rgba(160,120,50,0.4)';
      ctx.lineWidth = 1.5 * s;
      ctx.stroke();
      for (let sp = 0; sp < 5; sp++) {
        const angle = (sp / 5) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * (ponyR - 2 * s), Math.sin(angle) * (ponyR - 2 * s));
        ctx.strokeStyle = 'rgba(140,100,45,0.5)';
        ctx.lineWidth = 1.2 * s;
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(0, 0, 3 * s, 0, Math.PI * 2);
      ctx.fillStyle = '#C8A96A';
      ctx.fill();
      ctx.restore();

      // Emit sparks from firebox area
      if (frame % 7 === 0) spawnSpark(cabX + cabW * 0.5, trackY - 8 * s);

      ctx.restore();
    };

    /* ─── Main render loop ─── */
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);

      const trackY = H * TRACK_Y_RATIO;

      // Move train left (right-to-left direction)
      trainX -= TRAIN_SPEED;

      // Once completely off-screen to the left, reset to right
      const trainTotalWidth = 200 * TRAIN_SCALE + 3 * (110 * TRAIN_SCALE + 8 * TRAIN_SCALE) + 65 * TRAIN_SCALE;
      if (trainX + trainTotalWidth < -50) {
        trainX = W + 200;
        // Clear particles on reset
        smokes.length = 0;
        sparks.length = 0;
      }

      // Draw the whole train
      drawTrain(trainX, trackY, frame);

      /* ── Smoke particles ── */
      for (let i = smokes.length - 1; i >= 0; i--) {
        const p = smokes[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.r += (p.maxR - p.r) * 0.015;
        const lifeRatio = p.life / p.maxLife;
        const a = lifeRatio < 0.2
          ? (lifeRatio / 0.2) * p.alpha
          : (1 - (lifeRatio - 0.2) / 0.8) * p.alpha;

        if (lifeRatio >= 1) { smokes.splice(i, 1); continue; }

        const sg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        sg.addColorStop(0, `rgba(220,200,165,${a * 0.7})`);
        sg.addColorStop(0.5, `rgba(160,140,110,${a * 0.35})`);
        sg.addColorStop(1, 'transparent');
        ctx.fillStyle = sg;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      /* ── Ember sparks ── */
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.life++;
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vy += 0.08; // gravity
        const lifeRatio = sp.life / sp.maxLife;
        if (lifeRatio >= 1) { sparks.splice(i, 1); continue; }
        const a = (1 - lifeRatio) * 0.85;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size * (1 - lifeRatio * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${sp.hue}, 95%, 65%, ${a})`;
        ctx.shadowColor = `hsla(${sp.hue}, 95%, 65%, 0.8)`;
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
};
