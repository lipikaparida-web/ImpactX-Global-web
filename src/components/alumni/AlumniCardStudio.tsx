import React, { useState, useRef, useCallback } from 'react';
import {
  X, Download, RotateCcw, Image, FileImage, FileText,
  Upload, CheckCircle2, Loader2, Palette,
} from 'lucide-react';
import { AlumniCard } from './AlumniCard';
import { AlumniCardConfig, AlumniCardTheme, CardDownloadFormat } from '../../types';
import { DOMAIN_DISPLAY_NAMES } from '../../data/alumniData';
import { exportCardAsPNG, exportCardAsJPG, exportCardAsPDF } from '../../utils/cardExportUtils';

const ALL_DOMAINS = Object.entries(DOMAIN_DISPLAY_NAMES).map(([id, name]) => ({ id, name }));

const THEMES: { id: AlumniCardTheme; label: string; color: string }[] = [
  { id: 'obsidian', label: 'Obsidian Gold', color: '#C8A96A' },
  { id: 'midnight', label: 'Midnight Indigo', color: '#818CF8' },
  { id: 'forest', label: 'Forest Emerald', color: '#34D399' },
];

interface AlumniCardStudioProps {
  isOpen: boolean;
  onClose: () => void;
  /** Pre-fill values from the logged-in alumni's profile */
  prefill?: Partial<AlumniCardConfig>;
}

export const AlumniCardStudio: React.FC<AlumniCardStudioProps> = ({
  isOpen,
  onClose,
  prefill,
}) => {
  const exportRef = useRef<HTMLDivElement>(null);

  const [config, setConfig] = useState<AlumniCardConfig>({
    theme: prefill?.theme ?? 'obsidian',
    photoUrl: prefill?.photoUrl ?? '',
    name: prefill?.name ?? '',
    domainName: prefill?.domainName ?? ALL_DOMAINS[0].name,
    domainId: prefill?.domainId ?? 'web-dev',
    batchCode: prefill?.batchCode ?? 'Batch 01',
    cohortYear: prefill?.cohortYear ?? new Date().getFullYear().toString(),
    credentialId: prefill?.credentialId ?? 'IX-ALUM-0000-0000',
    cohortName: prefill?.cohortName ?? '',
    university: prefill?.university ?? '',
  });

  const [showBack, setShowBack] = useState(false);
  const [downloading, setDownloading] = useState<CardDownloadFormat | null>(null);
  const [downloadDone, setDownloadDone] = useState<CardDownloadFormat | null>(null);

  // Photo upload handler
  const handlePhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setConfig((prev) => ({ ...prev, photoUrl: ev.target?.result as string }));
    };
    reader.readAsDataURL(file);
  }, []);

  const set = useCallback(<K extends keyof AlumniCardConfig>(key: K, value: AlumniCardConfig[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleDomainChange = useCallback((domainId: string) => {
    const domain = ALL_DOMAINS.find((d) => d.id === domainId);
    setConfig((prev) => ({
      ...prev,
      domainId,
      domainName: domain?.name ?? '',
    }));
  }, []);

  const handleDownload = useCallback(async (format: CardDownloadFormat) => {
    const el = document.getElementById('alumni-card-render');
    if (!el) return;
    setDownloading(format);
    try {
      if (format === 'png') await exportCardAsPNG(el as HTMLElement, config.name || 'impactx-alumni');
      if (format === 'jpg') await exportCardAsJPG(el as HTMLElement, config.name || 'impactx-alumni');
      if (format === 'pdf') await exportCardAsPDF(el as HTMLElement, config.name || 'impactx-alumni');
      setDownloadDone(format);
      setTimeout(() => setDownloadDone(null), 2500);
    } finally {
      setDownloading(null);
    }
  }, [config.name]);

  if (!isOpen) return null;

  const BATCHES = Array.from({ length: 12 }, (_, i) => `Batch ${String(i + 1).padStart(2, '0')}`);
  const YEARS = ['2022', '2023', '2024', '2025', '2026'];

  return (
    <div
      id="alumni-card-studio-modal"
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(20px)',
        padding: '16px',
        overflowY: 'auto',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        width: '100%',
        maxWidth: 1100,
        background: 'linear-gradient(145deg, #0D0C10 0%, #141118 100%)',
        border: '1px solid rgba(200,169,106,0.2)',
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: '0 40px 120px rgba(0,0,0,0.8)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 28px',
          borderBottom: '1px solid rgba(200,169,106,0.1)',
        }}>
          <div>
            <div style={{
              fontFamily: 'monospace', fontSize: 10, color: '#C8A96A',
              letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4,
            }}>Alumni Credential Studio</div>
            <h2 style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700, margin: 0 }}>
              Customize & Download Your Alumni Card
            </h2>
          </div>
          <button
            id="alumni-studio-close-btn"
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10, padding: 8, cursor: 'pointer', color: '#9A9090',
              display: 'flex', alignItems: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FFFFFF'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#9A9090'; }}
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Body: Editor (left) + Preview (right) ───────────────────────── */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 0,
          flex: 1,
          overflow: 'auto',
        }}>
          {/* ── LEFT PANEL: Editor ──────────────────────────────────────────── */}
          <div style={{
            flex: '0 0 280px',
            minWidth: 240,
            borderRight: '1px solid rgba(200,169,106,0.1)',
            padding: '24px 24px',
            overflowY: 'auto',
            maxHeight: 640,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}>

            {/* Photo Upload */}
            <div>
              <label style={{ display: 'block', fontFamily: 'monospace', fontSize: 9, color: '#C8A96A', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
                Your Photo
              </label>
              <label
                htmlFor="alumni-photo-upload"
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: 8, padding: '16px 12px',
                  border: '1.5px dashed rgba(200,169,106,0.3)',
                  borderRadius: 12, cursor: 'pointer',
                  background: config.photoUrl ? 'transparent' : 'rgba(200,169,106,0.04)',
                  transition: 'border-color 0.2s',
                  position: 'relative', overflow: 'hidden',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,169,106,0.6)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,169,106,0.3)'; }}
              >
                {config.photoUrl ? (
                  <img src={config.photoUrl} alt="Preview" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '2px solid #C8A96A' }} />
                ) : (
                  <Upload size={22} color="#C8A96A" />
                )}
                <span style={{ fontFamily: 'monospace', fontSize: 9, color: '#9A9090', textAlign: 'center' }}>
                  {config.photoUrl ? 'Click to change photo' : 'Upload your photo\n(JPG, PNG, WebP)'}
                </span>
                <input
                  id="alumni-photo-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handlePhotoUpload}
                />
              </label>
            </div>

            {/* Name */}
            <FieldInput
              label="Full Name"
              id="alumni-name-input"
              value={config.name}
              placeholder="e.g. Arjun Mehta"
              onChange={(v) => set('name', v)}
            />

            {/* Domain */}
            <div>
              <label htmlFor="alumni-domain-select" style={{ display: 'block', fontFamily: 'monospace', fontSize: 9, color: '#C8A96A', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
                Domain
              </label>
              <select
                id="alumni-domain-select"
                value={config.domainId as string}
                onChange={(e) => handleDomainChange(e.target.value)}
                style={selectStyle}
              >
                {ALL_DOMAINS.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            {/* Batch */}
            <div>
              <label htmlFor="alumni-batch-select" style={{ display: 'block', fontFamily: 'monospace', fontSize: 9, color: '#C8A96A', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
                Batch
              </label>
              <select
                id="alumni-batch-select"
                value={config.batchCode}
                onChange={(e) => set('batchCode', e.target.value)}
                style={selectStyle}
              >
                {BATCHES.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            {/* Cohort Year */}
            <div>
              <label htmlFor="alumni-year-select" style={{ display: 'block', fontFamily: 'monospace', fontSize: 9, color: '#C8A96A', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
                Graduation Year
              </label>
              <select
                id="alumni-year-select"
                value={config.cohortYear}
                onChange={(e) => set('cohortYear', e.target.value)}
                style={selectStyle}
              >
                {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            {/* University */}
            <FieldInput
              label="University (optional)"
              id="alumni-university-input"
              value={config.university ?? ''}
              placeholder="e.g. IIT Bombay"
              onChange={(v) => set('university', v)}
            />

            {/* Credential ID */}
            <FieldInput
              label="Credential ID"
              id="alumni-credential-input"
              value={config.credentialId}
              placeholder="IX-ALUM-2025-0001"
              onChange={(v) => set('credentialId', v)}
            />

            {/* Theme */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'monospace', fontSize: 9, color: '#C8A96A', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
                <Palette size={12} /> Card Theme
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    id={`alumni-theme-${theme.id}`}
                    onClick={() => set('theme', theme.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '8px 12px', borderRadius: 8,
                      background: config.theme === theme.id ? `${theme.color}18` : 'transparent',
                      border: `1px solid ${config.theme === theme.id ? theme.color + '55' : 'rgba(255,255,255,0.08)'}`,
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                  >
                    <div style={{ width: 14, height: 14, borderRadius: '50%', background: theme.color, boxShadow: `0 0 8px ${theme.color}88` }} />
                    <span style={{ fontFamily: 'monospace', fontSize: 10, color: config.theme === theme.id ? theme.color : '#9A9090' }}>
                      {theme.label}
                    </span>
                    {config.theme === theme.id && <CheckCircle2 size={12} color={theme.color} style={{ marginLeft: 'auto' }} />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL: Preview ─────────────────────────────────────────── */}
          <div style={{
            flex: 1,
            minWidth: 300,
            padding: '28px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
            background: 'rgba(255,255,255,0.015)',
          }}>
            {/* Card preview — scaled to fit */}
            <div style={{ width: '100%', maxWidth: 580, overflowX: 'auto' }}>
              <div style={{ transform: 'scale(0.68)', transformOrigin: 'top center', width: 856, marginLeft: 'auto', marginRight: 'auto' }}>
                <AlumniCard
                  config={config}
                  showBack={showBack}
                  exportRef={exportRef}
                />
              </div>
              {/* Spacer for scaled height */}
              <div style={{ height: 'calc(540px * 0.68 - 540px)', marginBottom: 0 }} />
            </div>

            {/* Card controls */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: -180 }}>
              <button
                id="alumni-card-flip-btn"
                onClick={() => setShowBack((v) => !v)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '10px 20px', borderRadius: 20,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#D1CBC0', fontSize: 13, fontFamily: 'monospace',
                  cursor: 'pointer', transition: 'all 0.2s',
                  letterSpacing: '0.06em',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; }}
              >
                <RotateCcw size={14} />
                {showBack ? 'Show Front' : 'Flip to Back'}
              </button>
            </div>

            {/* Divider */}
            <div style={{ width: '100%', maxWidth: 480, height: 1, background: 'rgba(200,169,106,0.12)' }} />

            {/* Download buttons */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              {[
                { format: 'png' as CardDownloadFormat, label: 'Download PNG', icon: <FileImage size={16} />, desc: 'High-res transparent' },
                { format: 'jpg' as CardDownloadFormat, label: 'Download JPG', icon: <Image size={16} />, desc: 'Social sharing' },
                { format: 'pdf' as CardDownloadFormat, label: 'Download PDF', icon: <FileText size={16} />, desc: 'Print-ready A4' },
              ].map(({ format, label, icon, desc }) => {
                const isLoading = downloading === format;
                const isDone = downloadDone === format;
                return (
                  <button
                    key={format}
                    id={`alumni-download-${format}-btn`}
                    onClick={() => handleDownload(format)}
                    disabled={!!downloading}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                      padding: '14px 22px', borderRadius: 14,
                      background: isDone
                        ? 'rgba(52,211,153,0.12)'
                        : 'linear-gradient(145deg, rgba(200,169,106,0.15), rgba(200,169,106,0.05))',
                      border: `1px solid ${isDone ? 'rgba(52,211,153,0.4)' : 'rgba(200,169,106,0.3)'}`,
                      color: isDone ? '#34D399' : '#C8A96A',
                      cursor: downloading ? 'not-allowed' : 'pointer',
                      opacity: downloading && !isLoading ? 0.5 : 1,
                      transition: 'all 0.2s',
                      minWidth: 120,
                    }}
                    onMouseEnter={(e) => {
                      if (!downloading) (e.currentTarget as HTMLElement).style.background = 'rgba(200,169,106,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = isDone
                        ? 'rgba(52,211,153,0.12)'
                        : 'linear-gradient(145deg, rgba(200,169,106,0.15), rgba(200,169,106,0.05))';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
                      {isLoading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> :
                       isDone ? <CheckCircle2 size={16} /> : icon}
                      {isLoading ? 'Generating…' : isDone ? 'Downloaded!' : label}
                    </div>
                    <span style={{ fontSize: 10, fontFamily: 'monospace', opacity: 0.65, letterSpacing: '0.06em' }}>
                      {desc}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Helper note */}
            <p style={{
              fontFamily: 'monospace', fontSize: 10, color: '#9A9090',
              textAlign: 'center', letterSpacing: '0.05em', maxWidth: 400,
            }}>
              Your card is generated locally in your browser — no data is uploaded.
              <br />Share as PNG on LinkedIn, keep the PDF for your CV or portfolio.
            </p>
          </div>
        </div>
      </div>

      {/* Spinner keyframes */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

// ─── Reusable Field Input ──────────────────────────────────────────────────────
const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: '9px 12px',
  borderRadius: 8,
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(200,169,106,0.2)',
  color: '#FFFFFF',
  fontFamily: 'monospace',
  fontSize: 12,
  outline: 'none',
};

const FieldInput: React.FC<{
  label: string; id: string; value: string;
  placeholder?: string; onChange: (v: string) => void;
}> = ({ label, id, value, placeholder, onChange }) => (
  <div>
    <label htmlFor={id} style={{ display: 'block', fontFamily: 'monospace', fontSize: 9, color: '#C8A96A', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
      {label}
    </label>
    <input
      id={id}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '100%', boxSizing: 'border-box',
        padding: '9px 12px', borderRadius: 8,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(200,169,106,0.2)',
        color: '#FFFFFF', fontFamily: 'monospace', fontSize: 12,
        outline: 'none',
        transition: 'border-color 0.2s',
      }}
      onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = 'rgba(200,169,106,0.5)'; }}
      onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = 'rgba(200,169,106,0.2)'; }}
    />
  </div>
);
