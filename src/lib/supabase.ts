import { createClient } from '@supabase/supabase-js';
import type { Database } from './supabase.types';

// Vite injects these at build time via the VITE_ prefix.
// We cast import.meta to any to avoid the TypeScript error when
// vite/client types are not explicitly referenced in tsconfig.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const env = (import.meta as any).env as Record<string, string | undefined>;

const supabaseUrl = env?.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = env?.VITE_SUPABASE_ANON_KEY ?? '';

export const isSupabaseConfigured =
  Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http'));

// Fallback dummy credentials to prevent @supabase/supabase-js from throwing on initialization
export const supabase = createClient<Database>(
  isSupabaseConfigured ? supabaseUrl : 'https://placeholder-project.supabase.co',
  isSupabaseConfigured ? supabaseAnonKey : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy'
);

