import { createClient } from '@supabase/supabase-js';

// Supabase URL va anonim kalit olish
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
 
// Supabase klientini yaratish
export const supabase = createClient(supabaseUrl, supabaseAnonKey); 