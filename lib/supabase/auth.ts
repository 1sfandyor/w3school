import { supabase } from './client';
import { User } from '@supabase/supabase-js';

// Login with email/password
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
}

// Sign up with email/password
export async function signUpWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  return { data, error };
}

// Sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

// Get current user
export async function getCurrentUser(): Promise<{ user: User | null; error: Error | null }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return { user, error: null };
  } catch (error) {
    return { user: null, error: error as Error };
  }
}

// Update user data in profiles table
export async function updateUserProfile(userId: string, data: { name?: string; avatar_url?: string; role?: string }) {
  const { error } = await supabase
    .from('profiles')
    .update(data)
    .eq('id', userId);
    
  return { error };
} 