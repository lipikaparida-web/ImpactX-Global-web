import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, MapPin, Globe as GlobeIcon, ArrowRight, ShieldCheck } from 'lucide-react';

export interface CountryNode {
  id: string;
  name: string;
  flag: string;
  status: 'headquarters' | 'launching_soon';
  statusText: string;
  caption: string;
  lat: number;
  lng: number;
  color: string;
}

export const GLOBAL_COUNTRIES: CountryNode[] = [
  {
    id: 'india',
    name: 'India',
    flag: '🇮🇳',
    status: 'headquarters',
    statusText: 'Global Headquarters',
    caption: 'Where ImpactX Global began. Driving innovation worldwide.',
    lat: 20.5937,
    lng: 78.9629,
    color: '#C9A96E', // Warm Gold
  },
  {
    id: 'usa',
    name: 'United States',
    flag: '🇺🇸',
    status: 'launching_soon',
    statusText: 'Launching Soon • Applications Open',
    caption: 'North America tech chapter & mentorship network.',
    lat: 37.0902,
    lng: -95.7129,
    color: '#E6B566',
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    status: 'launching_soon',
    statusText: 'Launching Soon • Applications Open',
    caption: 'European research & academic partnership hub.',
    lat: 55.3781,
    lng: -3.4360,
    color: '#E6B566',
  },
  {
    id: 'italy',
    name: 'Italy',
    flag: '🇮🇹',
    status: 'launching_soon',
    statusText: 'Launching Soon • Applications Open',
    caption: 'Southern Europe design & sustainability initiative.',
    lat: 41.8719,
    lng: 12.5674,
    color: '#E6B566',
  },
  {
    id: 'russia',
    name: 'Russia',
    flag: '🇷🇺',
    status: 'launching_soon',
    statusText: 'Launching Soon • Applications Open',
    caption: 'Eurasian engineering & algorithmic systems chapter.',
    lat: 61.5240,
    lng: 105.3188,
    color: '#E6B566',
  },
];

// World Landmass Dot Grid Data (Simplified continents lat/lng)
const CONTINENT_DOTS: [number, number][] = [
  // North America
  [60, -110], [55, -100], [50, -120], [45, -90], [40, -100], [35, -80], [30, -100], [25, -105], [58, -135], [48, -70], [38, -120],
  // South America
  [10, -70], [5, -60], [0, -50], [-10, -55], [-20, -45], [-30, -60], [-40, -70], [-15, -70],
  // Europe
  [60, 10], [55, 20], [50, 0], [45, 15], [40, -5], [50, 30], [65, 25], [58, -5], [42, 12],
  // Africa
  [30, 10], [25, 20], [15, 0], [10, 30], [0, 20], [-10, 25], [-20, 30], [-30, 20], [5, 40], [15, -15],
  // Asia
  [65, 80], [60, 100], [55, 60], [50, 85], [45, 115], [40, 75], [35, 105], [30, 120], [20, 78], [25, 90], [15, 100], [10, 105], [35, 140], [50, 130],
  // Australia / NZ
  [-20, 135], [-25, 120], [-30, 145], [-35, 138], [-42, 170], [-38, 175],
  // Middle East
  [25, 45], [30, 35], [20, 50], [33, 44]
];

interface InteractiveGlobeProps {
  onSelectCountry?: (country: CountryNode) => void;
  onOpenApply?: () => void;
}

export const InteractiveGlobe: React.FC<InteractiveGlobeProps> = ({ onSelectCountry, onOpenApply }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeCountry, setActiveCountry] = useState<CountryNode>(GLOBAL_COUNTRIES[0]); // India by default
  const [isHovered, setIsHovered] = useState(false);
  const rotationYRef = useRef<number>(-1.2); // Center around India / Asia initially
  const rotationXRef = useRef<number>(0.35); // Slight tilt down
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  // Rotate smoothly towards selected country if clicked via pills
  const focusCountry = (country: CountryNode) => {
    setActiveCountry(country);
    if (onSelectCountry) onSelectCountry(country);
    // Convert target longitude to Y rotation
    const targetRotY = -((country.lng * Math.PI) / 180) + Math.PI / 2;
    const targetRotX = (country.lat * Math.PI) / 180 * 0.4;

    let frames = 0;
    const animateFocus = () => {
      rotationYRef.current += (targetRotY - rotationYRef.current) * 0.08;
      rotationXRef.current += (targetRotX - rotationXRef.current) * 0.08;
      frames++;
      if (frames < 30) {
        requestAnimationFrame(animateFocus);
      }
    };
    animateFocus();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particleTime = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const dpr = window.devicePixelRatio || 1;

      // Handle retina canvas sizing
      if (canvas.width !== canvas.clientWidth * dpr || canvas.height !== canvas.clientHeight * dpr) {
        canvas.width = canvas.clientWidth * dpr;
        canvas.height = canvas.clientHeight * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      const cx = displayWidth / 2;
      const cy = displayHeight / 2;
      const radius = Math.min(displayWidth, displayHeight) * 0.38;

      ctx.clearRect(0, 0, displayWidth, displayHeight);

      // Auto-rotation when not dragging
      if (!isDraggingRef.current && !isHovered) {
        rotationYRef.current += 0.0025; // Gentle slow rotation
      }

      particleTime += 0.015;

      const rotY = rotationYRef.current;
      const rotX = rotationXRef.current;

      // 3D Projection helper
      const project = (lat: number, lng: number, alt: number = 0) => {
        const phi = (lat * Math.PI) / 180;
        const theta = (lng * Math.PI) / 180;
        const r = radius + alt;

        // Spherical to 3D Cartesian coordinates
        const x3d = r * Math.cos(phi) * Math.sin(theta + rotY);
        const y3d = -r * Math.sin(phi) * Math.cos(rotX) + r * Math.cos(phi) * Math.cos(theta + rotY) * Math.sin(rotX);
        const z3d = r * Math.cos(phi) * Math.cos(theta + rotY) * Math.cos(rotX) + r * Math.sin(phi) * Math.sin(rotX);

        return {
          x: cx + x3d,
          y: cy + y3d,
          z: z3d,
          visible: z3d > -radius * 0.15, // Visible on front hemisphere
        };
      };

      // 1. Draw Globe Atmosphere Glow Behind
      const atmosGradient = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 1.35);
      atmosGradient.addColorStop(0, 'rgba(201, 169, 110, 0.12)');
      atmosGradient.addColorStop(0.5, 'rgba(91, 140, 255, 0.05)');
      atmosGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = atmosGradient;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // 2. Base Dark Globe Sphere
      const sphereGrad = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.3, radius * 0.1, cx, cy, radius);
      sphereGrad.addColorStop(0, '#161622');
      sphereGrad.addColorStop(0.7, '#0D0D14');
      sphereGrad.addColorStop(1, '#060609');

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.shadowColor = 'rgba(201, 169, 110, 0.25)';
      ctx.shadowBlur = 30;
      ctx.fill();
      ctx.shadowBlur = 0; // Reset shadow

      // 3. Globe Latitude / Longitude Wireframe Grid Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;

      // Parallels (Latitudes)
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let first = true;
        for (let lng = -180; lng <= 180; lng += 10) {
          const pt = project(lat, lng);
          if (pt.visible) {
            if (first) {
              ctx.moveTo(pt.x, pt.y);
              first = false;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // Meridians (Longitudes)
      for (let lng = -180; lng < 180; lng += 45) {
        ctx.beginPath();
        let first = true;
        for (let lat = -80; lat <= 80; lat += 10) {
          const pt = project(lat, lng);
          if (pt.visible) {
            if (first) {
              ctx.moveTo(pt.x, pt.y);
              first = false;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // 4. Render Continent Landmass Dots
      CONTINENT_DOTS.forEach(([lat, lng]) => {
        const pt = project(lat, lng);
        if (pt.visible) {
          const depthAlpha = Math.max(0.1, (pt.z + radius) / (2 * radius));
          ctx.fillStyle = `rgba(200, 205, 220, ${0.25 * depthAlpha})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.8 * depthAlpha, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 5. Render Connections / Curved Glowing Routes originating from India
      const indiaNode = GLOBAL_COUNTRIES.find((c) => c.id === 'india')!;
      const indiaPt = project(indiaNode.lat, indiaNode.lng);

      GLOBAL_COUNTRIES.filter((c) => c.id !== 'india').forEach((country) => {
        const targetPt = project(country.lat, country.lng);

        // Render curve if either end or mid point is on visible hemisphere
        if (indiaPt.visible || targetPt.visible) {
          // Calculate curved trajectory
          const steps = 30;
          const curvePts: { x: number; y: number; z: number; visible: boolean }[] = [];

          for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const currentLat = indiaNode.lat + (country.lat - indiaNode.lat) * t;
            const currentLng = indiaNode.lng + (country.lng - indiaNode.lng) * t;
            // Arc elevation (altitude above globe)
            const alt = Math.sin(t * Math.PI) * radius * 0.28;
            curvePts.push(project(currentLat, currentLng, alt));
          }

          // Draw Glowing Arc Line
          ctx.beginPath();
          let started = false;
          curvePts.forEach((pt) => {
            if (pt.visible) {
              if (!started) {
                ctx.moveTo(pt.x, pt.y);
                started = true;
              } else {
                ctx.lineTo(pt.x, pt.y);
              }
            } else {
              started = false;
            }
          });

          const isSelectedTarget = activeCountry.id === country.id;
          ctx.strokeStyle = isSelectedTarget
            ? 'rgba(201, 169, 110, 0.75)'
            : 'rgba(201, 169, 110, 0.35)';
          ctx.lineWidth = isSelectedTarget ? 2 : 1.2;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]); // Reset line dash

          // Draw Moving Pulse Particle from India -> Country
          const particleT = (particleTime + (country.lat * 0.1)) % 1;
          const pIdx = Math.floor(particleT * steps);
          const pPt = curvePts[pIdx];

          if (pPt && pPt.visible) {
            ctx.shadowColor = '#C9A96E';
            ctx.shadowBlur = 12;
            ctx.fillStyle = '#FFF5E0';
            ctx.beginPath();
            ctx.arc(pPt.x, pPt.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      });

      // 6. Render Country Markers / Pins
      GLOBAL_COUNTRIES.forEach((country) => {
        const pt = project(country.lat, country.lng);

        if (pt.visible) {
          const isIndia = country.id === 'india';
          const isActive = activeCountry.id === country.id;

          // India HQ Pulse Effect
          if (isIndia) {
            const pulseRadius = 12 + Math.sin(particleTime * 3) * 6;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, pulseRadius, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(201, 169, 110, 0.45)';
            ctx.lineWidth = 1.5;
            ctx.stroke();
          } else {
            // Soft amber pulse for future launching countries
            const pulseRadius = 8 + Math.sin(particleTime * 2.5) * 3;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, pulseRadius, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(230, 181, 102, 0.25)';
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          // Pin Core Outer Ring
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, isIndia ? 7 : 5, 0, Math.PI * 2);
          ctx.fillStyle = isIndia ? '#C9A96E' : '#E6B566';
          ctx.shadowColor = country.color;
          ctx.shadowBlur = isActive ? 20 : 10;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Inner Center Light Dot
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, isIndia ? 3 : 2, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();

          // Text Label for Country on Globe
          ctx.font = isActive ? '600 11px monospace' : '500 10px monospace';
          ctx.fillStyle = isActive ? '#F5F5F5' : '#A6A6B2';
          ctx.fillText(`${country.flag} ${country.name}`, pt.x + 10, pt.y + 3);
        }
      });

      // Outer Rim Specular Highlight Ring
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeCountry, isHovered]);

  // Mouse / Touch Drag interaction to rotate the globe manually
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    rotationYRef.current += deltaX * 0.005;
    rotationXRef.current = Math.max(-0.8, Math.min(0.8, rotationXRef.current + deltaY * 0.005));

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* 3D Canvas Container */}
      <div 
        className="relative w-full max-w-[580px] h-[360px] sm:h-[420px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseUp();
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full rounded-full"
        />

        {/* Active Hover / Floating Country Status Card */}
        {activeCountry && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#111118]/95 border border-[#C9A96E]/30 backdrop-blur-xl p-3.5 sm:p-4 rounded-2xl shadow-2xl max-w-xs sm:max-w-sm w-[90%] transition-all duration-300 pointer-events-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl">{activeCountry.flag}</span>
                <div>
                  <h4 className="font-sans-display font-bold text-sm text-[#F5F5F5] flex items-center gap-1.5">
                    {activeCountry.name}
                  </h4>
                  <span className={`text-[10px] font-mono tracking-wide px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                    activeCountry.status === 'headquarters'
                      ? 'bg-[#C9A96E]/20 text-[#F5E6C8] border border-[#C9A96E]/40 font-semibold'
                      : 'bg-[#E6B566]/10 text-[#E6B566] border border-[#E6B566]/20'
                  }`}>
                    {activeCountry.statusText}
                  </span>
                </div>
              </div>
              {activeCountry.status === 'headquarters' ? (
                <ShieldCheck className="w-5 h-5 text-[#C9A96E] shrink-0" />
              ) : (
                <Sparkles className="w-4 h-4 text-[#E6B566] shrink-0" />
              )}
            </div>
            <p className="text-xs text-[#A6A6B2] mt-2 leading-relaxed">
              "{activeCountry.caption}"
            </p>
          </div>
        )}
      </div>

      {/* Country Selection Pills Below Globe */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 px-2">
        {GLOBAL_COUNTRIES.map((c) => {
          const isSelected = activeCountry.id === c.id;
          return (
            <button
              key={c.id}
              onClick={() => focusCountry(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                isSelected
                  ? 'bg-[#C9A96E]/20 text-[#F5F5F5] border border-[#C9A96E] shadow-[0_0_12px_rgba(201,169,110,0.25)]'
                  : 'bg-[#111118]/60 text-[#A6A6B2] border border-white/[0.08] hover:border-white/20 hover:text-white'
              }`}
            >
              <span>{c.flag}</span>
              <span>{c.name}</span>
              {c.status === 'headquarters' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse ml-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
