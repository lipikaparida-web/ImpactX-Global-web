import React, { useEffect, useRef } from 'react';

export const AcademyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;
    let scrollY = window.scrollY;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientY : (e as MouseEvent).clientY;
      if (clientX !== undefined && clientY !== undefined) {
        targetMouseX = clientX;
        targetMouseY = clientY;
      }
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

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

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('orientationchange', resizeCanvas, { passive: true });

    const isMobile = width < 768;

    // 1. Star Field
    const numStars = Math.min(isMobile ? 180 : 350, Math.floor((width * height) / 4500));
    const stars = Array.from({ length: numStars }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.8,
      radius: Math.random() * 1.3 + 0.2,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.015 + 0.003,
      direction: Math.random() > 0.5 ? 1 : -1,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    // 2. Slow Drifting Clouds
    const numClouds = isMobile ? 5 : 8;
    const clouds = Array.from({ length: numClouds }, (_, i) => ({
      x: (i * (width / numClouds)) + (Math.random() * 100 - 50),
      y: Math.random() * (height * 0.4) + height * 0.05,
      radius: Math.random() * 120 + 80,
      speedX: Math.random() * 0.12 + 0.04,
      opacity: Math.random() * 0.12 + 0.05,
    }));

    // 3. Upward Floating Stardust & Fireflies
    const numParticles = isMobile ? 22 : 45;
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.6,
      speedY: -(Math.random() * 0.3 + 0.08),
      speedX: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.7 + 0.1,
      isAmber: Math.random() > 0.65,
    }));

    let time = 0;

    const render = () => {
      time += 0.015;

      // Smooth mouse/touch inertia
      mouseX += (targetMouseX - mouseX) * 0.025;
      mouseY += (targetMouseY - mouseY) * 0.025;

      const mouseParallaxX = (mouseX / width - 0.5) * (isMobile ? 12 : 25);
      const mouseParallaxY = (mouseY / height - 0.5) * (isMobile ? 6 : 12);
      const scrollParallaxY = scrollY * 0.12;

      ctx.clearRect(0, 0, width, height);

      // A. Deep Midnight Sky Gradient
      const skyGradient = ctx.createLinearGradient(0, 0, 0, height);
      skyGradient.addColorStop(0, '#03050C');
      skyGradient.addColorStop(0.35, '#080E20');
      skyGradient.addColorStop(0.7, '#0E1732');
      skyGradient.addColorStop(1, '#060912');

      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, width, height);

      // B. Twinkling Stars
      stars.forEach((star) => {
        star.twinklePhase += star.speed;
        const currentAlpha = Math.max(
          0.1,
          Math.min(0.95, star.alpha + Math.sin(star.twinklePhase) * 0.35)
        );

        const starX = (star.x + mouseParallaxX * 0.15 + width) % width;
        const starY = star.y - scrollParallaxY * 0.2 + mouseParallaxY * 0.1;

        if (starY > 0 && starY < height) {
          ctx.beginPath();
          ctx.arc(starX, starY, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(235, 242, 255, ${currentAlpha})`;
          ctx.fill();
        }
      });

      // C. Large Glowing Moon
      const moonX = width * (isMobile ? 0.8 : 0.72) + mouseParallaxX * 0.4;
      const moonY = height * (isMobile ? 0.18 : 0.22) - scrollParallaxY * 0.15 + mouseParallaxY * 0.2;
      const moonRadius = isMobile ? 32 : 46;

      const moonPulse = Math.sin(time * 0.8) * 12;
      const moonGlow = ctx.createRadialGradient(
        moonX,
        moonY,
        moonRadius * 0.5,
        moonX,
        moonY,
        (isMobile ? 220 : 380) + moonPulse
      );
      moonGlow.addColorStop(0, 'rgba(185, 215, 255, 0.20)');
      moonGlow.addColorStop(0.25, 'rgba(125, 165, 245, 0.08)');
      moonGlow.addColorStop(0.65, 'rgba(25, 40, 75, 0.03)');
      moonGlow.addColorStop(1, 'transparent');

      ctx.fillStyle = moonGlow;
      ctx.fillRect(0, 0, width, height);

      // Moon Disk
      ctx.save();
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(238, 244, 255, 0.88)';
      ctx.shadowColor = 'rgba(185, 220, 255, 0.6)';
      ctx.shadowBlur = 25;
      ctx.fill();

      // Moon Craters
      ctx.fillStyle = 'rgba(175, 195, 225, 0.25)';
      ctx.beginPath();
      ctx.arc(moonX - moonRadius * 0.26, moonY - moonRadius * 0.22, moonRadius * 0.22, 0, Math.PI * 2);
      ctx.arc(moonX + moonRadius * 0.3, moonY + moonRadius * 0.17, moonRadius * 0.3, 0, Math.PI * 2);
      ctx.arc(moonX - moonRadius * 0.1, moonY + moonRadius * 0.35, moonRadius * 0.17, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // D. Slow Drifting Clouds
      clouds.forEach((cloud) => {
        cloud.x += cloud.speedX;
        if (cloud.x - cloud.radius > width) {
          cloud.x = -cloud.radius;
        }

        const cloudY = cloud.y - scrollParallaxY * 0.1;

        ctx.save();
        ctx.beginPath();
        const cloudGradient = ctx.createRadialGradient(
          cloud.x,
          cloudY,
          cloud.radius * 0.2,
          cloud.x,
          cloudY,
          cloud.radius
        );
        cloudGradient.addColorStop(0, `rgba(180, 205, 245, ${cloud.opacity * 1.5})`);
        cloudGradient.addColorStop(0.5, `rgba(40, 60, 100, ${cloud.opacity})`);
        cloudGradient.addColorStop(1, 'transparent');

        ctx.fillStyle = cloudGradient;
        ctx.arc(cloud.x, cloudY, cloud.radius, 0, Math.PI * 2);
        ctx.arc(cloud.x + 40, cloudY - 15, cloud.radius * 0.7, 0, Math.PI * 2);
        ctx.arc(cloud.x - 30, cloudY + 8, cloud.radius * 0.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // E. Distant Academy Castle Silhouette & Cliff Base
      const horizonY = height * 0.84 - scrollParallaxY * 0.35 + mouseParallaxY * 0.3;
      const castleCenterX = width * 0.5 + mouseParallaxX * 0.6;
      const castleScale = isMobile
        ? Math.min(0.8, Math.max(0.55, width / 700))
        : Math.min(1.1, Math.max(0.75, width / 1400));

      ctx.save();

      // Distant Mountains
      ctx.fillStyle = '#060914';
      ctx.beginPath();
      ctx.moveTo(0, horizonY + 20);
      ctx.lineTo(width * 0.2, horizonY - 40 * castleScale);
      ctx.lineTo(width * 0.4, horizonY + 10);
      ctx.lineTo(width * 0.65, horizonY - 60 * castleScale);
      ctx.lineTo(width * 0.85, horizonY - 25 * castleScale);
      ctx.lineTo(width, horizonY + 20);
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.fill();

      // Cliff Rocks Base
      ctx.fillStyle = '#05070F';
      ctx.beginPath();
      ctx.moveTo(castleCenterX - 420 * castleScale, horizonY + 120);
      ctx.lineTo(castleCenterX - 380 * castleScale, horizonY + 20 * castleScale);
      ctx.lineTo(castleCenterX - 320 * castleScale, horizonY - 10 * castleScale);
      ctx.lineTo(castleCenterX + 320 * castleScale, horizonY - 10 * castleScale);
      ctx.lineTo(castleCenterX + 380 * castleScale, horizonY + 20 * castleScale);
      ctx.lineTo(castleCenterX + 420 * castleScale, horizonY + 120);
      ctx.fill();

      // Main Gothic Castle Silhouette
      ctx.fillStyle = '#070912';
      ctx.beginPath();

      const cx = castleCenterX;
      const hy = horizonY - 10 * castleScale;
      const s = castleScale;

      // Viaduct Bridge
      ctx.rect(cx - 360 * s, hy - 25 * s, 140 * s, 25 * s);

      // Left Spire
      ctx.rect(cx - 280 * s, hy - 70 * s, 60 * s, 70 * s);
      ctx.moveTo(cx - 290 * s, hy - 70 * s);
      ctx.lineTo(cx - 250 * s, hy - 160 * s);
      ctx.lineTo(cx - 210 * s, hy - 70 * s);

      // Great Library Dome
      ctx.arc(cx - 120 * s, hy - 80 * s, 40 * s, Math.PI, 0);
      ctx.rect(cx - 160 * s, hy - 80 * s, 80 * s, 80 * s);

      // Central Pinnacle Spire
      ctx.rect(cx - 45 * s, hy - 140 * s, 90 * s, 140 * s);
      ctx.moveTo(cx - 60 * s, hy - 140 * s);
      ctx.lineTo(cx, hy - 260 * s);
      ctx.lineTo(cx + 60 * s, hy - 140 * s);

      // Observatory Sphere
      ctx.arc(cx, hy - 180 * s, 16 * s, 0, Math.PI * 2);

      // Right Wing & Clocktower
      ctx.rect(cx + 50 * s, hy - 90 * s, 110 * s, 90 * s);
      ctx.moveTo(cx + 100 * s, hy - 90 * s);
      ctx.lineTo(cx + 120 * s, hy - 200 * s);
      ctx.lineTo(cx + 140 * s, hy - 90 * s);

      // Guard Towers
      ctx.rect(cx + 180 * s, hy - 50 * s, 120 * s, 50 * s);
      ctx.moveTo(cx + 250 * s, hy - 50 * s);
      ctx.lineTo(cx + 265 * s, hy - 120 * s);
      ctx.lineTo(cx + 280 * s, hy - 50 * s);

      ctx.fill();

      // Warm Windows
      ctx.fillStyle = '#E6B566';
      ctx.shadowColor = '#F5C56B';
      ctx.shadowBlur = 8;

      const windowFlicker = Math.sin(time * 3) * 0.15 + 0.85;

      const windowList = [
        { x: cx - 12 * s, y: hy - 210 * s, w: 6 * s, h: 14 * s },
        { x: cx + 6 * s, y: hy - 210 * s, w: 6 * s, h: 14 * s },
        { x: cx - 20 * s, y: hy - 110 * s, w: 7 * s, h: 12 * s },
        { x: cx + 13 * s, y: hy - 110 * s, w: 7 * s, h: 12 * s },
        { x: cx - 145 * s, y: hy - 95 * s, w: 7 * s, h: 12 * s },
        { x: cx - 125 * s, y: hy - 95 * s, w: 7 * s, h: 12 * s },
        { x: cx + 114 * s, y: hy - 150 * s, w: 12 * s, h: 12 * s },
        { x: cx + 75 * s, y: hy - 65 * s, w: 6 * s, h: 10 * s },
      ];

      windowList.forEach((win) => {
        ctx.globalAlpha = windowFlicker * (0.75 + Math.random() * 0.15);
        ctx.fillRect(win.x, win.y, win.w, win.h);
      });
      ctx.globalAlpha = 1.0;
      ctx.restore();

      // F. Upward Floating Stardust & Fireflies
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        if (p.isAmber) {
          ctx.fillStyle = `rgba(230, 181, 102, ${p.alpha * 0.75})`;
        } else {
          ctx.fillStyle = `rgba(185, 215, 255, ${p.alpha * 0.65})`;
        }
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('orientationchange', resizeCanvas);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#07070B]/40 via-[#07070B]/60 to-[#07070B]/80 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
};
