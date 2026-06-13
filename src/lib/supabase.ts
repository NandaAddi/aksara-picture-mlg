import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase Environment Variables in NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

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
