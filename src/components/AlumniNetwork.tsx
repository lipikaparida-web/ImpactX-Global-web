import React, { useState, useMemo, useCallback } from 'react';
import {
  Search, GraduationCap, Briefcase, Globe2, Users2,
  ExternalLink, Github, Linkedin, Star, CreditCard,
  ChevronDown, X,
} from 'lucide-react';
import { AlumniMember } from '../types';
import { SAMPLE_ALUMNI, DOMAIN_DISPLAY_NAMES, DOMAIN_COLORS } from '../data/alumniData';

// ─── Utilities ────────────────────────────────────────────────────────────────
const AVAILABLE_BATCHES = Array.from(
  new Set(SAMPLE_ALUMNI.map((a) => a.batch?.batch_code ?? ''))
).filter(Boolean).sort();

const AVAILABLE_YEARS = Array.from(
  new Set(SAMPLE_ALUMNI.map((a) => a.graduation_year))
).sort((a, b) => Number(b) - Number(a));

const AVAILABLE_DOMAINS = Array.from(
  new Set(SAMPLE_ALUMNI.map((a) => a.batch?.domain_id ?? ''))
).filter(Boolean);

// ─── Stat numbers ─────────────────────────────────────────────────────────────
const NETWORK_STATS = [
  { label: 'Total Alumni', value: `${SAMPLE_ALUMNI.length * 310}+`, icon: <GraduationCap size={16} /> },
  { label: 'Countries', value: '38+', icon: <Globe2 size={16} /> },
  { label: 'Companies', value: '120+', icon: <Briefcase size={16} /> },
  { label: 'Mentor-Ready', value: `${SAMPLE_ALUMNI.filter(a => a.is_mentor_available).length * 280}+`, icon: <Star size={16} /> },
];

// ─── Avatar placeholder ───────────────────────────────────────────────────────
const AvatarPlaceholder: React.FC<{ name: string; size?: number; accentColor?: string }> = ({
  name, size = 56, accentColor = '#C8A96A',
}) => {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: `${accentColor}22`,
      border: `2px solid ${accentColor}55`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.32, fontWeight: 700, color: accentColor,
      fontFamily: 'monospace', letterSpacing: '0.05em',
    }}>{initials}</div>
  );
};

// ─── Alumni Card ─────────────────────────────────────────────────────────────
const AlumniMemberCard: React.FC<{
  alumni: AlumniMember;
  onOpenCard: (alumni: AlumniMember) => void;
}> = ({ alumni, onOpenCard }) => {
  const [hovered, setHovered] = useState(false);
  const domainColors = DOMAIN_COLORS[alumni.batch?.domain_id ?? ''] ?? {
    bg: 'rgba(200,169,106,0.12)', text: '#C8A96A', border: 'rgba(200,169,106,0.3)',
  };
  const domainName = DOMAIN_DISPLAY_NAMES[alumni.batch?.domain_id ?? ''] ?? 'General';

  return (
    <div
      style={{
        background: hovered
          ? 'linear-gradient(145deg, #14121A 0%, #1C1825 100%)'
          : 'linear-gradient(145deg, #0E0C13 0%, #131018 100%)',
        border: `1px solid ${hovered ? 'rgba(200,169,106,0.35)' : 'rgba(200,169,106,0.12)'}`,
        borderRadius: 20,
        padding: '24px 22px',
        cursor: 'pointer',
        transition: 'all 0.28s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,169,106,0.15)'
          : '0 4px 20px rgba(0,0,0,0.3)',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Mentor-available badge */}
      {alumni.is_mentor_available && (
        <div style={{
          position: 'absolute', top: 16, right: 16,
          padding: '3px 10px', borderRadius: 20,
          background: 'rgba(52,211,153,0.12)',
          border: '1px solid rgba(52,211,153,0.3)',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#34D399', animation: 'pulse 2s infinite' }} />
          <span style={{ fontFamily: 'monospace', fontSize: 8, color: '#34D399', letterSpacing: '0.08em' }}>MENTOR READY</span>
        </div>
      )}

      {/* Top: avatar + name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
        {alumni.photo_url ? (
          <img
            src={alumni.photo_url}
            alt={alumni.full_name}
            style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(200,169,106,0.4)', flexShrink: 0 }}
          />
        ) : (
          <AvatarPlaceholder name={alumni.full_name} />
        )}
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{
            fontWeight: 700, fontSize: 16, color: '#FFFFFF',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{alumni.full_name}</div>
          <div style={{
            fontFamily: 'monospace', fontSize: 10, color: '#9A9090',
            marginTop: 2, letterSpacing: '0.06em',
          }}>{alumni.university}</div>
        </div>
      </div>

      {/* Current role */}
      {(alumni.current_role || alumni.current_company) && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14,
          padding: '8px 12px', borderRadius: 10,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <Briefcase size={12} color="#C8A96A" />
          <span style={{ fontSize: 12, color: '#D1CBC0', fontWeight: 500 }}>
            {alumni.current_role}
            {alumni.current_company && (
              <span style={{ color: '#C8A96A' }}> @ {alumni.current_company}</span>
            )}
          </span>
        </div>
      )}

      {/* Domain + Batch badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
        <span style={{
          padding: '3px 10px', borderRadius: 20, fontSize: 10,
          fontFamily: 'monospace', letterSpacing: '0.06em',
          background: domainColors.bg, color: domainColors.text, border: `1px solid ${domainColors.border}`,
        }}>{domainName}</span>
        <span style={{
          padding: '3px 10px', borderRadius: 20, fontSize: 10,
          fontFamily: 'monospace', letterSpacing: '0.06em',
          background: 'rgba(200,169,106,0.1)', color: '#C8A96A', border: '1px solid rgba(200,169,106,0.25)',
        }}>{alumni.batch?.batch_code ?? ''} • {alumni.graduation_year}</span>
        {alumni.country && (
          <span style={{
            padding: '3px 10px', borderRadius: 20, fontSize: 10,
            fontFamily: 'monospace', letterSpacing: '0.06em',
            background: 'rgba(255,255,255,0.05)', color: '#9A9090', border: '1px solid rgba(255,255,255,0.08)',
          }}>{alumni.country}</span>
        )}
      </div>

      {/* Skills */}
      {alumni.top_skills && alumni.top_skills.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
          {alumni.top_skills.slice(0, 3).map((skill) => (
            <span key={skill} style={{
              padding: '2px 8px', borderRadius: 6,
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
              fontFamily: 'monospace', fontSize: 9, color: '#7A7490', letterSpacing: '0.04em',
            }}>{skill}</span>
          ))}
          {(alumni.top_skills.length > 3) && (
            <span style={{
              padding: '2px 8px', borderRadius: 6,
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
              fontFamily: 'monospace', fontSize: 9, color: '#7A7490',
            }}>+{alumni.top_skills.length - 3}</span>
          )}
        </div>
      )}

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(200,169,106,0.08)', marginBottom: 14 }} />

      {/* Actions row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {alumni.linkedin_url && (
            <a
              href={alumni.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                padding: 6, borderRadius: 8,
                background: 'rgba(10,102,194,0.12)', border: '1px solid rgba(10,102,194,0.25)',
                color: '#4F9CF9', display: 'flex', alignItems: 'center',
              }}
            ><Linkedin size={13} /></a>
          )}
          {alumni.github_url && (
            <a
              href={alumni.github_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                padding: 6, borderRadius: 8,
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                color: '#C8C8C8', display: 'flex', alignItems: 'center',
              }}
            ><Github size={13} /></a>
          )}
          {alumni.portfolio_url && (
            <a
              href={alumni.portfolio_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                padding: 6, borderRadius: 8,
                background: 'rgba(200,169,106,0.08)', border: '1px solid rgba(200,169,106,0.2)',
                color: '#C8A96A', display: 'flex', alignItems: 'center',
              }}
            ><ExternalLink size={13} /></a>
          )}
        </div>

        {/* View Card button */}
        <button
          onClick={() => onOpenCard(alumni)}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '6px 14px', borderRadius: 10,
            background: 'rgba(200,169,106,0.1)',
            border: '1px solid rgba(200,169,106,0.25)',
            color: '#C8A96A', fontSize: 11,
            fontFamily: 'monospace', letterSpacing: '0.06em',
            cursor: 'pointer', transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(200,169,106,0.18)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(200,169,106,0.1)';
          }}
        >
          <CreditCard size={12} />
          View Card
        </button>
      </div>
    </div>
  );
};

// ─── Dropdown helper ──────────────────────────────────────────────────────────
const FilterDropdown: React.FC<{
  id: string; value: string; options: { value: string; label: string }[];
  onChange: (v: string) => void; placeholder: string;
}> = ({ id, value, options, onChange, placeholder }) => (
  <div style={{ position: 'relative' }}>
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        appearance: 'none', padding: '9px 36px 9px 14px',
        borderRadius: 10, background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(200,169,106,0.2)',
        color: value ? '#FFFFFF' : '#9A9090',
        fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.06em',
        cursor: 'pointer', outline: 'none',
        minWidth: 140,
      }}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
    <ChevronDown size={12} color="#C8A96A" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
interface AlumniNetworkProps {
  onOpenCardStudio: (prefill?: Partial<{ name: string; domainId: string; batchCode: string; cohortYear: string; credentialId: string }>) => void;
}

export const AlumniNetwork: React.FC<AlumniNetworkProps> = ({ onOpenCardStudio }) => {
  const [search, setSearch] = useState('');
  const [filterBatch, setFilterBatch] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterDomain, setFilterDomain] = useState('');
  const [mentorOnly, setMentorOnly] = useState(false);

  const filtered = useMemo(() => {
    return SAMPLE_ALUMNI.filter((a) => {
      const q = search.toLowerCase();
      const matchSearch = !q ||
        a.full_name.toLowerCase().includes(q) ||
        (a.current_company ?? '').toLowerCase().includes(q) ||
        (a.current_role ?? '').toLowerCase().includes(q) ||
        (a.university ?? '').toLowerCase().includes(q) ||
        (a.top_skills ?? []).some((s) => s.toLowerCase().includes(q));

      const matchBatch = !filterBatch || a.batch?.batch_code === filterBatch;
      const matchYear = !filterYear || a.graduation_year === filterYear;
      const matchDomain = !filterDomain || a.batch?.domain_id === filterDomain;
      const matchMentor = !mentorOnly || a.is_mentor_available;

      return matchSearch && matchBatch && matchYear && matchDomain && matchMentor;
    });
  }, [search, filterBatch, filterYear, filterDomain, mentorOnly]);

  const handleOpenCard = useCallback((alumni: AlumniMember) => {
    onOpenCardStudio({
      name: alumni.full_name,
      domainId: alumni.batch?.domain_id ?? 'web-dev',
      batchCode: alumni.batch?.batch_code ?? 'Batch 01',
      cohortYear: alumni.graduation_year,
      credentialId: alumni.credential_id,
    });
  }, [onOpenCardStudio]);

  const clearFilters = useCallback(() => {
    setSearch(''); setFilterBatch(''); setFilterYear('');
    setFilterDomain(''); setMentorOnly(false);
  }, []);

  const hasFilters = search || filterBatch || filterYear || filterDomain || mentorOnly;

  return (
    <section
      id="alumni"
      style={{ position: 'relative', padding: '120px 0 100px', background: 'transparent' }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 500,
        background: 'radial-gradient(ellipse at center, rgba(200,169,106,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* ── Section header ─────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 30,
            background: 'rgba(200,169,106,0.08)',
            border: '1px solid rgba(200,169,106,0.2)',
            marginBottom: 20,
          }}>
            <GraduationCap size={12} color="#C8A96A" />
            <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#C8A96A', letterSpacing: '0.18em' }}>
              ALUMNI NETWORK
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800,
            color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1.05,
            margin: '0 0 16px',
          }}>
            Builders Who{' '}
            <span style={{ color: '#C8A96A' }}>Graduated.</span>
            <br />Still Building.
          </h2>
          <p style={{ fontSize: 16, color: '#9A9090', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.6 }}>
            ImpactX alumni are now at Google, Microsoft, Figma, Notion, Stanford HAI, and launching their own startups.
            Every one of them started exactly where you are.
          </p>

          {/* Stat pills */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
            {NETWORK_STATS.map((stat) => (
              <div key={stat.label} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 20px', borderRadius: 40,
                background: 'rgba(200,169,106,0.06)',
                border: '1px solid rgba(200,169,106,0.15)',
              }}>
                <span style={{ color: '#C8A96A' }}>{stat.icon}</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF' }}>{stat.value}</span>
                <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#9A9090' }}>{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Claim card CTA */}
          <button
            id="alumni-claim-card-cta-btn"
            onClick={() => onOpenCardStudio()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', borderRadius: 40,
              background: 'linear-gradient(135deg, #C8A96A 0%, #E2C78E 100%)',
              border: 'none', cursor: 'pointer',
              fontSize: 14, fontWeight: 700, color: '#0D0D0F',
              boxShadow: '0 8px 30px rgba(200,169,106,0.3)',
              transition: 'all 0.25s',
              letterSpacing: '-0.01em',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(200,169,106,0.4)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(200,169,106,0.3)'; }}
          >
            <CreditCard size={16} />
            Claim & Generate Your Alumni Card
          </button>
        </div>

        {/* ── Filter bar ─────────────────────────────────────────────────── */}
        <div style={{
          display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center',
          marginBottom: 36,
          padding: '16px 20px',
          borderRadius: 16,
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(200,169,106,0.1)',
        }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: '1 1 200px' }}>
            <Search size={14} color="#9A9090" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              id="alumni-search-input"
              type="text"
              value={search}
              placeholder="Search by name, company, skill…"
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '9px 12px 9px 34px', borderRadius: 10,
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(200,169,106,0.15)',
                color: '#FFFFFF', fontFamily: 'monospace', fontSize: 11, outline: 'none',
              }}
            />
          </div>

          <FilterDropdown
            id="alumni-filter-batch"
            value={filterBatch}
            placeholder="All Batches"
            options={AVAILABLE_BATCHES.map((b) => ({ value: b, label: b }))}
            onChange={setFilterBatch}
          />

          <FilterDropdown
            id="alumni-filter-year"
            value={filterYear}
            placeholder="All Years"
            options={AVAILABLE_YEARS.map((y) => ({ value: y, label: `Class of ${y}` }))}
            onChange={setFilterYear}
          />

          <FilterDropdown
            id="alumni-filter-domain"
            value={filterDomain}
            placeholder="All Domains"
            options={AVAILABLE_DOMAINS.map((d) => ({ value: d, label: DOMAIN_DISPLAY_NAMES[d] ?? d }))}
            onChange={setFilterDomain}
          />

          {/* Mentor toggle */}
          <button
            id="alumni-mentor-toggle-btn"
            onClick={() => setMentorOnly((v) => !v)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '9px 14px',
              borderRadius: 10,
              background: mentorOnly ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${mentorOnly ? 'rgba(52,211,153,0.4)' : 'rgba(255,255,255,0.1)'}`,
              color: mentorOnly ? '#34D399' : '#9A9090',
              fontFamily: 'monospace', fontSize: 11, cursor: 'pointer',
              transition: 'all 0.2s', letterSpacing: '0.06em', whiteSpace: 'nowrap',
            }}
          >
            <Users2 size={13} />
            Mentor-Ready
          </button>

          {/* Clear filters */}
          {hasFilters && (
            <button
              id="alumni-clear-filters-btn"
              onClick={clearFilters}
              style={{
                display: 'flex', alignItems: 'center', gap: 4, padding: '9px 12px',
                borderRadius: 10, background: 'transparent',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#9A9090', fontFamily: 'monospace', fontSize: 10,
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              <X size={11} /> Clear
            </button>
          )}
        </div>

        {/* Result count */}
        <div style={{ marginBottom: 20, fontFamily: 'monospace', fontSize: 11, color: '#9A9090', letterSpacing: '0.08em' }}>
          Showing <span style={{ color: '#C8A96A' }}>{filtered.length}</span> of {SAMPLE_ALUMNI.length} alumni
        </div>

        {/* ── Alumni Grid ─────────────────────────────────────────────────── */}
        {filtered.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20,
          }}>
            {filtered.map((alumni) => (
              <AlumniMemberCard
                key={alumni.id}
                alumni={alumni}
                onOpenCard={handleOpenCard}
              />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center', padding: '80px 24px',
            border: '1px dashed rgba(200,169,106,0.15)',
            borderRadius: 20,
          }}>
            <GraduationCap size={40} color="#C8A96A44" style={{ marginBottom: 16 }} />
            <p style={{ color: '#9A9090', fontFamily: 'monospace', fontSize: 13 }}>
              No alumni match your current filters. Try adjusting your search.
            </p>
            <button
              onClick={clearFilters}
              style={{
                marginTop: 16, padding: '8px 20px', borderRadius: 20,
                background: 'rgba(200,169,106,0.1)', border: '1px solid rgba(200,169,106,0.3)',
                color: '#C8A96A', fontFamily: 'monospace', fontSize: 11, cursor: 'pointer',
              }}
            >Clear Filters</button>
          </div>
        )}

        {/* Bottom CTA */}
        <div style={{
          marginTop: 60, textAlign: 'center',
          padding: '40px 28px',
          borderRadius: 20,
          background: 'rgba(200,169,106,0.04)',
          border: '1px solid rgba(200,169,106,0.12)',
        }}>
          <p style={{ color: '#9A9090', fontSize: 13, fontFamily: 'monospace', marginBottom: 16 }}>
            ARE YOU A GRADUATE? JOIN THE NETWORK.
          </p>
          <h3 style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
            Claim your verified Alumni Profile & Digital Card
          </h3>
          <p style={{ color: '#7A7490', maxWidth: 480, margin: '0 auto 24px', fontSize: 14 }}>
            Generate your personalized ImpactX Alumni Credential Card, download it in PNG, JPG, or PDF, and share it on LinkedIn as proof of your journey.
          </p>
          <button
            id="alumni-bottom-claim-btn"
            onClick={() => onOpenCardStudio()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 28px', borderRadius: 30,
              background: 'linear-gradient(135deg, #C8A96A, #E2C78E)',
              border: 'none', cursor: 'pointer',
              fontSize: 14, fontWeight: 700, color: '#0D0D0F',
              boxShadow: '0 6px 24px rgba(200,169,106,0.25)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            <CreditCard size={16} />
            Generate My Alumni Card
          </button>
        </div>
      </div>

      {/* Pulse animation */}
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </section>
  );
};
