import React, { useEffect, useRef, useState } from 'react';

export const LiveExpressBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const parallaxBgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // 1. Slow Moving Clouds in High Sky
    const numClouds = 8;
    const clouds = Array.from({ length: numClouds }, (_, i) => ({
      x: (i * width) / numClouds + (Math.random() * 100 - 50),
      y: height * 0.08 + Math.random() * (height * 0.22),
      radiusX: 120 + Math.random() * 160,
      radiusY: 35 + Math.random() * 30,
      speedX: 0.08 + Math.random() * 0.06,
      alpha: 0.08 + Math.random() * 0.06,
    }));

    // 2. Slow Drifting Locomotive Steam Smoke
    const numSmokePuffs = 28;
    const smokePuffs = Array.from({ length: numSmokePuffs }, (_, i) => ({
      x: width * 0.38 + (i * 20) + (Math.random() * 15 - 7.5),
      y: height * 0.42 - (i * 10) + (Math.random() * 12 - 6),
      radius: 28 + i * 4.5 + Math.random() * 12,
      alpha: Math.max(0.02, 0.32 - (i * 0.01)),
      speedX: -(Math.random() * 0.2 + 0.08),
      speedY: -(Math.random() * 0.15 + 0.06),
      growRate: 0.05 + Math.random() * 0.025,
    }));

    // 3. Tiny Floating Atmospheric Dust Particles
    const numParticles = 45;
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.0 + 0.5,
      speedY: -(Math.random() * 0.25 + 0.05),
      speedX: (Math.random() - 0.5) * 0.15,
      alpha: Math.random() * 0.6 + 0.15,
      color: Math.random() > 0.5 ? '#C8A96A' : Math.random() > 0.3 ? '#D4AF37' : '#9E9EA7',
    }));

    // 4. Rolling Mountain & Viaduct Fog Layers
    const numFog = 7;
    const fogs = Array.from({ length: numFog }, (_, i) => ({
      x: (i * width) / numFog,
      y: height * 0.62 + (i * 22),
      width: width * 0.8,
      height: 130 + Math.random() * 70,
      speedX: (i % 2 === 0 ? 1 : -1) * (0.12 + Math.random() * 0.08),
      alpha: 0.10 + Math.random() * 0.07,
    }));

    let time = 0;

    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      const currentScroll = window.scrollY;
      const scrollParallax = currentScroll * 0.12;

      // A. High Clouds Drifting Across Sky
      clouds.forEach((cloud) => {
        cloud.x += cloud.speedX;
        if (cloud.x - cloud.radiusX > width) cloud.x = -cloud.radiusX;

        const cloudY = cloud.y - scrollParallax * 0.04;

        ctx.save();
        ctx.beginPath();
        ctx.ellipse(cloud.x, cloudY, cloud.radiusX, cloud.radiusY, 0, 0, Math.PI * 2);
        const cloudGrad = ctx.createRadialGradient(
          cloud.x,
          cloudY,
          5,
          cloud.x,
          cloudY,
          cloud.radiusX
        );
        cloudGrad.addColorStop(0, `rgba(247, 244, 238, ${cloud.alpha * 1.3})`);
        cloudGrad.addColorStop(0.6, `rgba(182, 176, 168, ${cloud.alpha * 0.6})`);
        cloudGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = cloudGrad;
        ctx.fill();
        ctx.restore();
      });

      // B. Rolling Fog Along Viaduct Base
      fogs.forEach((fog) => {
        fog.x += fog.speedX;
        if (fog.x > width) fog.x = -fog.width;
        if (fog.x < -fog.width) fog.x = width;

        const fogY = fog.y - scrollParallax * 0.08;

        ctx.save();
        const fogGrad = ctx.createRadialGradient(
          fog.x + fog.width / 2,
          fogY,
          10,
          fog.x + fog.width / 2,
          fogY,
          fog.width / 2
        );
        fogGrad.addColorStop(0, `rgba(158, 158, 167, ${fog.alpha})`);
        fogGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = fogGrad;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      });

      // C. Locomotive Steam Smoke Puffs
      smokePuffs.forEach((smoke) => {
        smoke.x += smoke.speedX;
        smoke.y += smoke.speedY;
        smoke.radius += smoke.growRate;
        smoke.alpha -= 0.0004;

        if (smoke.alpha <= 0 || smoke.x < -100 || smoke.y < -100) {
          smoke.x = width * 0.38 + Math.random() * 12;
          smoke.y = height * 0.44 - scrollParallax * 0.15;
          smoke.radius = 24 + Math.random() * 10;
          smoke.alpha = 0.30;
        }

        const smokeY = smoke.y - scrollParallax * 0.15;

        ctx.save();
        ctx.beginPath();
        const grad = ctx.createRadialGradient(
          smoke.x,
          smokeY,
          smoke.radius * 0.1,
          smoke.x,
          smokeY,
          smoke.radius
        );
        grad.addColorStop(0, `rgba(212, 175, 55, ${smoke.alpha * 0.4})`);
        grad.addColorStop(0.4, `rgba(158, 158, 167, ${smoke.alpha * 0.9})`);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.arc(smoke.x, smokeY, smoke.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // D. Realistic Locomotive Headlight Warm Light Bloom
      const headlightX = width * 0.24;
      const headlightY = height * 0.52 - scrollParallax * 0.12;
      const headlightPulse = Math.sin(time * 1.5) * 0.06 + 0.94;

      ctx.save();
      const beamGrad = ctx.createRadialGradient(
        headlightX,
        headlightY,
        4,
        headlightX - 80,
        headlightY + 20,
        260
      );
      beamGrad.addColorStop(0, `rgba(247, 244, 238, ${0.80 * headlightPulse})`);
      beamGrad.addColorStop(0.25, `rgba(200, 169, 106, ${0.35 * headlightPulse})`);
      beamGrad.addColorStop(0.55, `rgba(74, 30, 40, ${0.15 * headlightPulse})`);
      beamGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.arc(headlightX, headlightY, 240 * headlightPulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // E. Floating Atmospheric Dust & Golden Particles
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        const particleY = p.y - scrollParallax * 0.18;

        ctx.beginPath();
        ctx.arc(p.x, particleY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (Math.sin(time * 1.8 + p.x) * 0.25 + 0.75);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 3;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      if (parallaxBgRef.current) {
        parallaxBgRef.current.style.transform = `scale(1.04) translateY(${currentScroll * 0.15}px)`;
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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0D0D0F]">
      
      {/* 1. Uncropped Cinematic Landscape Artwork with Smooth Parallax */}
      <div
        ref={parallaxBgRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=2400&auto=format&fit=crop')`,
          transform: `scale(1.04) translateY(0px)`,
          filter: 'brightness(0.85) contrast(1.10) saturate(1.10)',
        }}
      >
        {/* Subtle Bronze & Deep Burgundy Environmental Lighting */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0D0D0F]/70 via-[#4A1E28]/10 to-transparent pointer-events-none" />
      </div>

      {/* 2. Environmental Motion Canvas (Fog, Clouds, Steam, Light Bloom, Dust) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-10" />

      {/* 3. Cinematic Atmospheric Readability Vignette */}
      {/* Top to Bottom Gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#0D0D0F]/45 via-[#0D0D0F]/35 to-[#0D0D0F]/75 pointer-events-none z-20"
        aria-hidden="true"
      />

      {/* Asymmetric Left Gradient for Editorial Readability */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#0D0D0F]/80 via-[#0D0D0F]/50 via-45% to-transparent pointer-events-none z-20"
        aria-hidden="true"
      />

      {/* Smooth Seamless Transition between Canvas and Next Sections */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0D0D0F] via-[#0D0D0F]/80 to-transparent pointer-events-none z-20"
        aria-hidden="true"
      />
    </div>
  );
};
