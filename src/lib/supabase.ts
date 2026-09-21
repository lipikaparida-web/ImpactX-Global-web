import { createClient } from '@supabase/supabase-js';
import type { Database } from './supabase.types';

// Vite injects these at build time via the VITE_ prefix.
// We cast import.meta to any to avoid the TypeScript error when
// vite/client types are not explicitly referenced in tsconfig.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const env = (import.meta as any).env as Record<string, string | undefined>;

const supabaseUrl = env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY ?? '';

// Returns a no-op client if env vars are not configured (dev/demo mode)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured =
  supabaseUrl.length > 0 && supabaseAnonKey.length > 0;

