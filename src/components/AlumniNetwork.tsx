import React from 'react';
import { CreditCard } from 'lucide-react';

interface AlumniNetworkProps {
  onOpenCardStudio: (prefill?: Partial<{ name: string; domainId: string; batchCode: string; cohortYear: string; credentialId: string }>) => void;
}

export const AlumniNetwork: React.FC<AlumniNetworkProps> = ({ onOpenCardStudio }) => {
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
        <div style={{
          textAlign: 'center',
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
    </section>
  );
};
