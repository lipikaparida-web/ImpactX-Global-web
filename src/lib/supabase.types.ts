// Auto-generated Supabase database types
// Run: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/supabase.types.ts
// to regenerate from your live Supabase schema.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      cohorts: {
        Row: {
          id: string;
          name: string;
          year: number;
          status: 'upcoming' | 'active' | 'completed';
          start_date: string | null;
          end_date: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          year: number;
          status?: 'upcoming' | 'active' | 'completed';
          start_date?: string | null;
          end_date?: string | null;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['cohorts']['Insert']>;
      };
      batches: {
        Row: {
          id: string;
          cohort_id: string;
          batch_code: string;
          domain_id: string;
          graduation_date: string | null;
          mentor_lead: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          cohort_id: string;
          batch_code: string;
          domain_id: string;
          graduation_date?: string | null;
          mentor_lead?: string | null;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['batches']['Insert']>;
      };
      interns: {
        Row: {
          id: string;
          batch_id: string;
          user_id: string | null;
          full_name: string;
          email: string;
          university: string | null;
          country: string | null;
          photo_url: string | null;
          linkedin_url: string | null;
          github_url: string | null;
          status: 'active' | 'graduated' | 'dropped';
          created_at: string;
        };
        Insert: {
          id?: string;
          batch_id: string;
          user_id?: string | null;
          full_name: string;
          email: string;
          university?: string | null;
          country?: string | null;
          photo_url?: string | null;
          linkedin_url?: string | null;
          github_url?: string | null;
          status?: 'active' | 'graduated' | 'dropped';
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['interns']['Insert']>;
      };
      projects: {
        Row: {
          id: string;
          batch_id: string;
          intern_id: string | null;
          title: string;
          repo_url: string | null;
          live_demo_url: string | null;
          case_study: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          batch_id: string;
          intern_id?: string | null;
          title: string;
          repo_url?: string | null;
          live_demo_url?: string | null;
          case_study?: string | null;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['projects']['Insert']>;
      };
      alumni_profiles: {
        Row: {
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
          card_customization: Json | null;
          linkedin_url: string | null;
          portfolio_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          intern_id: string;
          credential_id?: string | null;
          slug?: string | null;
          current_company?: string | null;
          current_role?: string | null;
          bio?: string | null;
          top_skills?: string[] | null;
          is_mentor_available?: boolean;
          is_public?: boolean;
          card_customization?: Json | null;
          linkedin_url?: string | null;
          portfolio_url?: string | null;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['alumni_profiles']['Insert']>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
