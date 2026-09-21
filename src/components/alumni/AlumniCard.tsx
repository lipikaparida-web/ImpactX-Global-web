import React, { useRef, useState, useCallback } from 'react';
import { AlumniCardConfig } from '../../types';
import { DOMAIN_DISPLAY_NAMES } from '../../data/alumniData';

// ─── Theme Palettes ────────────────────────────────────────────────────────────
const THEMES: Record<string, {
  cardBg: string;
  cardBg2: string;
  shimmer: string;
  chip: string;
  stripe: string;
  accentText: string;
  subText: string;
  borderColor: string;
  holoBg: string;
}> = {
  obsidian: {
    cardBg:   '#0D0C10',
    cardBg2:  '#1A1620',
    shimmer:  'linear-gradient(135deg, rgba(200,169,106,0.12) 0%, rgba(200,169,106,0.03) 40%, rgba(200,169,106,0.12) 80%)',
    chip:     '#C8A96A',
    stripe:   '#C8A96A',
    accentText: '#C8A96A',
    subText:  '#9A9090',
    borderColor: 'rgba(200,169,106,0.45)',
    holoBg:   'conic-gradient(from 180deg at 50% 50%, rgba(200,169,106,0.06) 0deg, transparent 60deg, rgba(200,169,106,0.06) 120deg, transparent 180deg, rgba(200,169,106,0.06) 240deg, transparent 300deg, rgba(200,169,106,0.06) 360deg)',
  },
  midnight: {
    cardBg:   '#05091A',
    cardBg2:  '#0D1830',
    shimmer:  'linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0.04) 40%, rgba(99,102,241,0.18) 80%)',
    chip:     '#818CF8',
    stripe:   '#818CF8',
    accentText: '#A5B4FC',
    subText:  '#6875A8',
    borderColor: 'rgba(99,102,241,0.45)',
    holoBg:   'conic-gradient(from 180deg at 50% 50%, rgba(99,102,241,0.08) 0deg, transparent 60deg, rgba(99,102,241,0.08) 120deg, transparent 180deg, rgba(99,102,241,0.08) 240deg, transparent 300deg, rgba(99,102,241,0.08) 360deg)',
  },
  forest: {
    cardBg:   '#061210',
    cardBg2:  '#0D211D',
    shimmer:  'linear-gradient(135deg, rgba(16,185,129,0.18) 0%, rgba(16,185,129,0.04) 40%, rgba(16,185,129,0.18) 80%)',
    chip:     '#34D399',
    stripe:   '#34D399',
    accentText: '#6EE7B7',
    subText:  '#4A8070',
    borderColor: 'rgba(16,185,129,0.45)',
    holoBg:   'conic-gradient(from 180deg at 50% 50%, rgba(16,185,129,0.08) 0deg, transparent 60deg, rgba(16,185,129,0.08) 120deg, transparent 180deg, rgba(16,185,129,0.08) 240deg, transparent 300deg, rgba(16,185,129,0.08) 360deg)',
  },
};

// ─── EMV Chip SVG ─────────────────────────────────────────────────────────────
const ChipSVG: React.FC<{ color: string }> = ({ color }) => (
  <svg width="44" height="34" viewBox="0 0 44 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="43" height="33" rx="5.5" fill={color + '22'} stroke={color} strokeWidth="1"/>
    <rect x="14" y="0.5" width="1" height="33" fill={color + '55'}/>
    <rect x="29" y="0.5" width="1" height="33" fill={color + '55'}/>
    <rect x="0.5" y="11" width="43" height="1" fill={color + '55'}/>
    <rect x="0.5" y="22" width="43" height="1" fill={color + '55'}/>
    <rect x="14" y="11" width="16" height="12" rx="2" fill={color + '33'} stroke={color} strokeWidth="0.8"/>
    <line x1="14" y1="17" x2="30" y2="17" stroke={color} strokeWidth="0.8"/>
    <line x1="22" y1="11" x2="22" y2="23" stroke={color} strokeWidth="0.8"/>
  </svg>
);

// ─── Contactless Wave SVG ─────────────────────────────────────────────────────
const ContactlessSVG: React.FC<{ color: string }> = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 12a3 3 0 003-3" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6.5 14.5A6.5 6.5 0 0012 9" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4 17A10 10 0 0012 9" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// ─── ImpactX Crest / Seal ─────────────────────────────────────────────────────
const ImpactXSeal: React.FC<{ color: string; size?: number }> = ({ color, size = 52 }) => (
  <svg width={size} height={size} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="26" cy="26" r="25" stroke={color} strokeWidth="1.2" strokeDasharray="3 2"/>
    <circle cx="26" cy="26" r="20" stroke={color} strokeWidth="0.6" opacity="0.5"/>
    <text x="26" y="22" textAnchor="middle" fill={color} fontSize="7" fontWeight="700" fontFamily="monospace" letterSpacing="1">IMPACT</text>
    <text x="26" y="32" textAnchor="middle" fill={color} fontSize="7" fontWeight="700" fontFamily="monospace" letterSpacing="1">X GLOBAL</text>
    <line x1="14" y1="26" x2="38" y2="26" stroke={color} strokeWidth="0.5" opacity="0.4"/>
  </svg>
);

// ─── QR Code placeholder ──────────────────────────────────────────────────────
const QRCodePlaceholder: React.FC<{ color: string; credentialId: string }> = ({ color, credentialId }) => (
  <div style={{
    width: 64, height: 64,
    border: `1.5px solid ${color}55`,
    borderRadius: 6,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: `${color}08`,
    flexShrink: 0,
  }}>
    {/* Simple QR-like grid visual */}
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      {/* Corners */}
      {[[2,2],[30,2],[2,30]].map(([x,y], i) => (
        <g key={i}>
          <rect x={x} y={y} width="16" height="16" rx="2" stroke={color} strokeWidth="1.5" fill="none"/>
          <rect x={x+4} y={y+4} width="8" height="8" rx="1" fill={color + '99'}/>
        </g>
      ))}
      {/* Data modules */}
      {[2,6,10,14,18].map(x => [2,6,10,14,18].map(y => (
        Math.random() > 0.5 ? (
          <rect key={`${x}-${y}`} x={x+20} y={y+20} width="3" height="3" rx="0.5" fill={color + '77'}/>
        ) : null
      )))}
    </svg>
    <span style={{ fontSize: 7, color: color + '88', fontFamily: 'monospace', marginTop: 2, textAlign: 'center', lineHeight: 1.2 }}>
      {credentialId.slice(-6)}
    </span>
  </div>
);

// ─── Props ────────────────────────────────────────────────────────────────────
interface AlumniCardProps {
  config: AlumniCardConfig;
  /** If true, shows the back face of the card */
  showBack?: boolean;
  /** Disables the 3D tilt effect (used during export capture) */
  disableTilt?: boolean;
  /** Ref forwarded to the card's render container (for html2canvas export) */
  exportRef?: React.RefObject<HTMLDivElement | null>;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export const AlumniCard: React.FC<AlumniCardProps> = ({
  config,
  showBack = false,
  disableTilt = false,
  exportRef,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, shine: 0 });

  const t = THEMES[config.theme] ?? THEMES.obsidian;
  const domainDisplay = DOMAIN_DISPLAY_NAMES[config.domainId] ?? config.domainName;

  // 3D tilt handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (disableTilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    const shine = (e.clientX - rect.left) / rect.width;
    setTilt({ x: x * 18, y: y * 18, shine });
  }, [disableTilt]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0, shine: 0.5 });
  }, []);

  // Shared card dimensions
  const CARD_W = 856;
  const CARD_H = 540;

  return (
    <div
      style={{
        perspective: 1200,
        width: CARD_W,
        maxWidth: '100%',
        userSelect: 'none',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={exportRef as React.RefObject<HTMLDivElement> ?? cardRef}
        id="alumni-card-render"
        style={{
          width: CARD_W,
          height: CARD_H,
          maxWidth: '100%',
          borderRadius: 24,
          position: 'relative',
          transform: disableTilt ? 'none' : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.08s ease-out',
          transformStyle: 'preserve-3d',
          boxShadow: `0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px ${t.borderColor}`,
          overflow: 'hidden',
          background: `linear-gradient(145deg, ${t.cardBg} 0%, ${t.cardBg2} 100%)`,
        }}
      >
        {/* ── Shimmer layer ─────────────────────────────────────────────── */}
        <div style={{
          position: 'absolute', inset: 0,
          background: t.shimmer,
          opacity: 0.9,
          pointerEvents: 'none',
          borderRadius: 'inherit',
        }} />

        {/* ── Holographic conic overlay ──────────────────────────────────── */}
        <div style={{
          position: 'absolute', inset: 0,
          background: t.holoBg,
          opacity: 0.7,
          pointerEvents: 'none',
          borderRadius: 'inherit',
        }} />

        {/* ── Mouse-follow shine ─────────────────────────────────────────── */}
        {!disableTilt && (
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(circle at ${tilt.shine * 100}% 50%, ${t.chip}18 0%, transparent 65%)`,
            pointerEvents: 'none',
            borderRadius: 'inherit',
            transition: 'background 0.05s',
          }} />
        )}

        {/* ── Border glow ────────────────────────────────────────────────── */}
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: 'inherit',
          border: `1px solid ${t.borderColor}`,
          boxShadow: `inset 0 1px 0 ${t.chip}33, inset 0 -1px 0 ${t.chip}15`,
          pointerEvents: 'none',
        }} />

        {/* ═══════════════════════════════════════════════════════════════════
            FRONT FACE
        ═══════════════════════════════════════════════════════════════════ */}
        {!showBack && (
          <div style={{
            position: 'absolute', inset: 0,
            padding: '36px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            {/* Top row: chip + contactless + logo */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <ChipSVG color={t.chip} />
                <ContactlessSVG color={t.chip} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  color: t.accentText,
                  textTransform: 'uppercase',
                }}>IMPACTX GLOBAL</span>
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: 9,
                  color: t.subText,
                  letterSpacing: '0.12em',
                }}>ALUMNI CREDENTIAL</span>
              </div>
            </div>

            {/* Middle row: photo + name + domain */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
              {/* Photo */}
              <div style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                border: `3px solid ${t.chip}`,
                boxShadow: `0 0 0 4px ${t.chip}22, 0 0 20px ${t.chip}33`,
                flexShrink: 0,
                overflow: 'hidden',
                background: `${t.cardBg2}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {config.photoUrl ? (
                  <img
                    src={config.photoUrl}
                    alt={config.name}
                    crossOrigin="anonymous"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                    <circle cx="22" cy="18" r="10" fill={t.chip + '44'}/>
                    <path d="M4 42 C4 30 40 30 40 42" fill={t.chip + '44'}/>
                  </svg>
                )}
              </div>

              {/* Name + info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Graduation year + batch */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{
                    fontFamily: 'monospace',
                    fontSize: 10,
                    color: t.subText,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}>{config.batchCode} • CLASS OF {config.cohortYear}</span>
                </div>

                {/* Name */}
                <div style={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  textShadow: `0 0 24px ${t.chip}44`,
                  fontFamily: 'Georgia, serif',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {config.name || 'Your Name'}
                </div>

                {/* Domain badge */}
                <div style={{
                  marginTop: 10,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 12px',
                  borderRadius: 20,
                  background: `${t.chip}18`,
                  border: `1px solid ${t.chip}40`,
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: t.chip }} />
                  <span style={{
                    fontFamily: 'monospace',
                    fontSize: 10,
                    color: t.accentText,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}>{domainDisplay}</span>
                </div>

                {/* University */}
                {config.university && (
                  <div style={{
                    marginTop: 6,
                    fontFamily: 'monospace',
                    fontSize: 10,
                    color: t.subText,
                    letterSpacing: '0.06em',
                  }}>
                    {config.university}
                  </div>
                )}
              </div>

              {/* Seal */}
              <div style={{ flexShrink: 0, opacity: 0.8 }}>
                <ImpactXSeal color={t.chip} size={58} />
              </div>
            </div>

            {/* Bottom row: credential ID + card number style */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <div style={{
                  fontFamily: 'monospace',
                  fontSize: 9,
                  color: t.subText,
                  letterSpacing: '0.1em',
                  marginBottom: 4,
                  textTransform: 'uppercase',
                }}>Credential ID</div>
                <div style={{
                  fontFamily: 'monospace',
                  fontSize: 13,
                  color: t.accentText,
                  letterSpacing: '0.22em',
                  fontWeight: 700,
                  textShadow: `0 0 12px ${t.chip}55`,
                }}>{config.credentialId}</div>
              </div>
              {/* Simulated card number panels */}
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                {['••••', '••••', '••••', config.credentialId.slice(-4) || '0000'].map((g, i) => (
                  <span key={i} style={{
                    fontFamily: 'monospace',
                    fontSize: 14,
                    color: i === 3 ? t.accentText : t.subText + 'AA',
                    letterSpacing: '0.14em',
                  }}>{g}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            BACK FACE
        ═══════════════════════════════════════════════════════════════════ */}
        {showBack && (
          <div style={{ position: 'absolute', inset: 0 }}>
            {/* Magnetic stripe */}
            <div style={{
              position: 'absolute',
              top: 52,
              left: 0,
              right: 0,
              height: 52,
              background: `linear-gradient(180deg, #0A0A0A 0%, #111 50%, #0A0A0A 100%)`,
              boxShadow: `0 2px 8px rgba(0,0,0,0.5)`,
            }} />

            <div style={{ padding: '36px 40px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {/* Top spacer for stripe */}
              <div style={{ height: 60 }} />

              {/* Signature strip + QR */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                {/* Signature strip */}
                <div style={{
                  flex: 1,
                  height: 52,
                  background: `repeating-linear-gradient(90deg, #F5F5F5 0px, #E8E8E8 1px, #FFFFFF 2px, #EFEFEF 4px)`,
                  borderRadius: 4,
                  padding: '8px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: 4,
                }}>
                  <span style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: '#1A1A1A', fontStyle: 'italic' }}>
                    {config.name || 'Alumni'}
                  </span>
                  <span style={{ fontFamily: 'monospace', fontSize: 8, color: '#666', letterSpacing: '0.1em' }}>AUTHORIZED SIGNATURE</span>
                </div>

                {/* CVV */}
                <div style={{
                  width: 48, height: 52,
                  background: '#FFFFFF',
                  borderRadius: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 700, color: '#1A1A1A' }}>IX{config.credentialId.slice(-3)}</span>
                  <span style={{ fontFamily: 'monospace', fontSize: 7, color: '#666' }}>CVV</span>
                </div>

                {/* QR Code */}
                <QRCodePlaceholder color={t.chip} credentialId={config.credentialId} />
              </div>

              {/* Motto */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'monospace',
                  fontSize: 10,
                  color: t.subText,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: 4,
                }}>
                  "Impact over Certificates • Execution over Theory"
                </div>
                <div style={{
                  fontFamily: 'monospace',
                  fontSize: 9,
                  color: t.accentText + '88',
                  letterSpacing: '0.1em',
                }}>
                  impactx.global/alumni/{config.slug || config.name?.toLowerCase().replace(/\s+/g, '-')}
                </div>
              </div>

              {/* Bottom bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontFamily: 'monospace', fontSize: 9, color: t.subText, letterSpacing: '0.08em', marginBottom: 2 }}>ISSUED BY</div>
                  <div style={{ fontFamily: 'monospace', fontSize: 11, color: t.accentText, letterSpacing: '0.12em', fontWeight: 700 }}>IMPACTX GLOBAL NETWORK</div>
                </div>
                <ImpactXSeal color={t.chip} size={44} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
