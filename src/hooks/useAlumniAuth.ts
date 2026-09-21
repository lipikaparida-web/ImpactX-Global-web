import { useState, useEffect, useCallback } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { AlumniCardConfig } from '../types';

interface AlumniProfile {
  id: string;
  intern_id: string;
  credential_id: string | null;
  slug: string | null;
  current_company: string | null;
  current_role: string | null;
  bio: string | null;
  top_skills: string[] | null;
  is_mentor_available: boolean;
  is_public: boolean;
  card_customization: Record<string, unknown> | null;
  linkedin_url: string | null;
  portfolio_url: string | null;
}

interface UseAlumniAuthReturn {
  session: Session | null;
  user: User | null;
  alumniProfile: AlumniProfile | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  claimAlumniProfile: (internId: string) => Promise<void>;
  updateAlumniCard: (config: Partial<AlumniCardConfig>) => Promise<void>;
}

export function useAlumniAuth(): UseAlumniAuthReturn {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [alumniProfile, setAlumniProfile] = useState<AlumniProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Listen to auth state changes
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchAlumniProfile(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchAlumniProfile(session.user.id);
      } else {
        setAlumniProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchAlumniProfile = useCallback(async (userId: string) => {
    if (!isSupabaseConfigured) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: intern } = await (supabase as any)
        .from('interns')
        .select('id')
        .eq('user_id', userId)
        .single() as { data: { id: string } | null };

      if (!intern) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: profile } = await (supabase as any)
        .from('alumni_profiles')
        .select('*')
        .eq('intern_id', intern.id)
        .single() as { data: AlumniProfile | null };

      setAlumniProfile(profile ?? null);
    } catch (e) {
      console.error('[useAlumniAuth] fetchAlumniProfile error:', e);
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      setError('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      setError('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setError('Supabase is not configured.');
      return;
    }
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/#alumni` },
    });
  }, []);

  const signOut = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    await supabase.auth.signOut();
  }, []);

  const claimAlumniProfile = useCallback(async (internId: string) => {
    if (!isSupabaseConfigured || !user) return;
    setIsLoading(true);
    try {
      const credentialId = `IX-ALUM-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from('alumni_profiles')
        .upsert({
          intern_id: internId,
          credential_id: credentialId,
          is_public: true,
          is_mentor_available: false,
        })
        .select()
        .single() as { data: AlumniProfile | null; error: unknown };
      if (error) throw error;
      setAlumniProfile(data);
    } catch (e) {
      console.error('[useAlumniAuth] claimAlumniProfile error:', e);
      setError('Failed to claim profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const updateAlumniCard = useCallback(async (config: Partial<AlumniCardConfig>) => {
    if (!isSupabaseConfigured || !alumniProfile) return;
    setIsLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from('alumni_profiles')
        .update({ card_customization: config as Record<string, unknown> })
        .eq('id', alumniProfile.id) as { error: unknown };
      if (error) throw error;
      setAlumniProfile((prev) => prev ? { ...prev, card_customization: config as Record<string, unknown> } : prev);
    } catch (e) {
      console.error('[useAlumniAuth] updateAlumniCard error:', e);
    } finally {
      setIsLoading(false);
    }
  }, [alumniProfile]);

  return {
    session,
    user,
    alumniProfile,
    isLoading,
    error,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    claimAlumniProfile,
    updateAlumniCard,
  };
}
