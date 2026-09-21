import React, { useState } from 'react';
import { X, Mail, Lock, Chrome, Loader2, GraduationCap, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAlumniAuth } from '../../hooks/useAlumniAuth';
import { isSupabaseConfigured } from '../../lib/supabase';

type AuthTab = 'signin' | 'signup';

interface AlumniAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: () => void;
}

export const AlumniAuthModal: React.FC<AlumniAuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
}) => {
  const { signIn, signUp, signInWithGoogle, isLoading, error, user } = useAlumniAuth();
  const [tab, setTab] = useState<AuthTab>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    setSuccess('');

    if (tab === 'signup' && password !== confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setLocalError('Password must be at least 8 characters.');
      return;
    }

    if (tab === 'signin') {
      await signIn(email, password);
      if (!error) {
        setSuccess('Signed in successfully!');
        setTimeout(() => { onAuthSuccess?.(); onClose(); }, 1200);
      }
    } else {
      await signUp(email, password);
      if (!error) {
        setSuccess('Account created! Please check your email to verify and then sign in.');
      }
    }
  };

  if (!isOpen) return null;

  const notConfigured = !isSupabaseConfigured;

  return (
    <div
      id="alumni-auth-modal"
      style={{
        position: 'fixed', inset: 0, zIndex: 9500,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(20px)',
        padding: 16,
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        width: '100%', maxWidth: 420,
        background: 'linear-gradient(145deg, #0E0C13 0%, #141118 100%)',
        border: '1px solid rgba(200,169,106,0.2)',
        borderRadius: 24,
        padding: '36px 32px',
        boxShadow: '0 40px 120px rgba(0,0,0,0.8)',
        position: 'relative',
      }}>
        {/* Close */}
        <button
          id="alumni-auth-close-btn"
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8, padding: 6, cursor: 'pointer', color: '#9A9090',
            display: 'flex', alignItems: 'center',
          }}
        ><X size={16} /></button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%', margin: '0 auto 14px',
            background: 'rgba(200,169,106,0.1)', border: '1px solid rgba(200,169,106,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <GraduationCap size={22} color="#C8A96A" />
          </div>
          <h2 style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700, margin: '0 0 6px' }}>
            {tab === 'signin' ? 'Alumni Sign In' : 'Claim Alumni Profile'}
          </h2>
          <p style={{ color: '#9A9090', fontSize: 12, fontFamily: 'monospace' }}>
            {tab === 'signin'
              ? 'Access your verified credential & alumni card.'
              : 'Register to claim your ImpactX Alumni Card.'}
          </p>
        </div>

        {/* Supabase not configured warning */}
        {notConfigured && (
          <div style={{
            padding: '12px 14px', borderRadius: 10, marginBottom: 20,
            background: 'rgba(251,146,60,0.1)', border: '1px solid rgba(251,146,60,0.3)',
            display: 'flex', gap: 10, alignItems: 'flex-start',
          }}>
            <AlertCircle size={14} color="#FB923C" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#FB923C', fontFamily: 'monospace', marginBottom: 4 }}>
                SUPABASE NOT CONFIGURED
              </div>
              <div style={{ fontSize: 11, color: '#9A7060', lineHeight: 1.5 }}>
                Add <code style={{ color: '#FB923C' }}>VITE_SUPABASE_URL</code> and <code style={{ color: '#FB923C' }}>VITE_SUPABASE_ANON_KEY</code> to your <code>.env</code> file to enable auth.
                The card generator is still fully functional without login.
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div style={{
          display: 'flex', borderRadius: 10, overflow: 'hidden',
          border: '1px solid rgba(200,169,106,0.15)', marginBottom: 24,
        }}>
          {(['signin', 'signup'] as AuthTab[]).map((t) => (
            <button
              key={t}
              id={`alumni-auth-tab-${t}`}
              onClick={() => { setTab(t); setLocalError(''); setSuccess(''); }}
              style={{
                flex: 1, padding: '10px 0',
                background: tab === t ? 'rgba(200,169,106,0.12)' : 'transparent',
                border: 'none',
                borderRight: t === 'signin' ? '1px solid rgba(200,169,106,0.15)' : 'none',
                color: tab === t ? '#C8A96A' : '#9A9090',
                fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.1em',
                cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase',
              }}
            >
              {t === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Email */}
          <div style={{ position: 'relative' }}>
            <Mail size={13} color="#9A9090" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              id="alumni-auth-email-input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={notConfigured}
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '11px 12px 11px 34px',
                borderRadius: 10, background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(200,169,106,0.2)',
                color: '#FFFFFF', fontFamily: 'monospace', fontSize: 12,
                outline: 'none', opacity: notConfigured ? 0.5 : 1,
              }}
            />
          </div>

          {/* Password */}
          <div style={{ position: 'relative' }}>
            <Lock size={13} color="#9A9090" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              id="alumni-auth-password-input"
              type="password"
              placeholder="Password (min 8 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={notConfigured}
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '11px 12px 11px 34px',
                borderRadius: 10, background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(200,169,106,0.2)',
                color: '#FFFFFF', fontFamily: 'monospace', fontSize: 12,
                outline: 'none', opacity: notConfigured ? 0.5 : 1,
              }}
            />
          </div>

          {/* Confirm password (signup only) */}
          {tab === 'signup' && (
            <div style={{ position: 'relative' }}>
              <Lock size={13} color="#9A9090" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                id="alumni-auth-confirm-password-input"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={notConfigured}
                style={{
                  width: '100%', boxSizing: 'border-box',
                  padding: '11px 12px 11px 34px',
                  borderRadius: 10, background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(200,169,106,0.2)',
                  color: '#FFFFFF', fontFamily: 'monospace', fontSize: 12,
                  outline: 'none', opacity: notConfigured ? 0.5 : 1,
                }}
              />
            </div>
          )}

          {/* Errors / success */}
          {(error || localError) && (
            <div style={{
              display: 'flex', gap: 8, alignItems: 'center',
              padding: '10px 12px', borderRadius: 8,
              background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.25)',
              color: '#FB7185', fontSize: 11, fontFamily: 'monospace',
            }}>
              <AlertCircle size={12} />
              {error || localError}
            </div>
          )}
          {success && (
            <div style={{
              display: 'flex', gap: 8, alignItems: 'center',
              padding: '10px 12px', borderRadius: 8,
              background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.25)',
              color: '#34D399', fontSize: 11, fontFamily: 'monospace',
            }}>
              <CheckCircle2 size={12} />
              {success}
            </div>
          )}

          {/* Submit */}
          <button
            id="alumni-auth-submit-btn"
            type="submit"
            disabled={notConfigured || isLoading}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '12px 0', borderRadius: 12,
              background: notConfigured ? 'rgba(200,169,106,0.3)' : 'linear-gradient(135deg, #C8A96A, #E2C78E)',
              border: 'none', cursor: notConfigured ? 'not-allowed' : 'pointer',
              color: '#0D0D0F', fontSize: 13, fontWeight: 700,
              opacity: isLoading ? 0.8 : 1, transition: 'all 0.2s',
            }}
          >
            {isLoading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : null}
            {tab === 'signin' ? 'Sign In' : 'Create Account'}
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            <span style={{ fontFamily: 'monospace', fontSize: 9, color: '#9A9090' }}>OR</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          </div>

          {/* Google */}
          <button
            id="alumni-auth-google-btn"
            type="button"
            disabled={notConfigured || isLoading}
            onClick={signInWithGoogle}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '11px 0', borderRadius: 12,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
              cursor: notConfigured ? 'not-allowed' : 'pointer',
              color: '#D1CBC0', fontSize: 12, fontFamily: 'monospace',
              opacity: notConfigured ? 0.5 : 1, transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { if (!notConfigured) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.09)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}
          >
            <Chrome size={15} />
            Continue with Google
          </button>
        </form>

        {/* Note about demo mode */}
        {notConfigured && (
          <p style={{
            marginTop: 20, textAlign: 'center',
            fontFamily: 'monospace', fontSize: 10, color: '#9A9090',
            lineHeight: 1.5,
          }}>
            💡 <strong style={{ color: '#C8A96A' }}>Demo mode active</strong> — You can still use the Alumni Card Studio
            to customize and download your card without logging in.
          </p>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};
