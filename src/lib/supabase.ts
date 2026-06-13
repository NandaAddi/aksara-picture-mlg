import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rgeshbeiweqnnkbhgoya.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnZXNoYmVpd2Vxbm5rYmhnb3lhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2MzcxMTgsImV4cCI6MjA4MzIxMzExOH0.6N7jBP4C0KwHxYA8ymRT1UbN9kTyyQ2O3WV2Umvcdz4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Project {
  id: string | number;
  title: string;
  category: string;
  slug: string;
  sort_order: number;
}

export interface ProjectImage {
  id: string | number;
  project_id: string | number;
  image_url: string;
  aspect_ratio: number;
  sort_order: number;
}

export interface Article {
  id: string | number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  thumbnail_url?: string;
  created_at: string;
  is_published?: boolean;
  formatted_date?: string;
}
