"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/database.types';

// Server-side imports have been removed to prevent Next.js errors

/**
 * Klient komponentlari uchun joriy foydalanuvchi ma'lumotlarini va rolini olish
 * Bu funksiya faqat klient komponentlarida ishlatilishi kerak
 */
export async function getUserWithRoleClient() {
  const supabase = createClientComponentClient<Database>();
  
  try {
    // Sessiyani tekshirish
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('Klient: Sessiyani olishda xatolik:', sessionError.message);
      return { user: null, isAdmin: false };
    }
    
    if (!session || !session.user) {
      return { user: null, isAdmin: false };
    }
    
    // Foydalanuvchi ma'lumotlarini olish
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error('Klient: Foydalanuvchi ma\'lumotlarini olishda xatolik:', userError?.message);
      return { user: null, isAdmin: false };
    }
    
    // Rolni tekshirish - avval app_metadata, keyin user_metadata
    const userRole = user.app_metadata?.role || user.user_metadata?.role;
    const isAdmin = userRole === 'admin';
    
    return { user, isAdmin };
  } catch (error) {
    console.error('Klient: Foydalanuvchini olishda xatolik:', error);
    return { user: null, isAdmin: false };
  }
}

/**
 * Foydalanuvchiga admin rolini berish - client tomonidan
 * Bu funksiya faqat klient komponentlarida ishlatilishi kerak
 */
export async function setClientAdminRole(userId: string) {
  if (!userId) {
    return false;
  }
  
  const supabase = createClientComponentClient<Database>();
  
  try {
    // user_metadata orqali rolni o'rnatish (klient tomonidan)
    const { error } = await supabase.auth.updateUser({
      data: { role: 'admin' }
    });
    
    if (error) {
      console.error('Klient: Admin rolini o\'rnatishda xatolik:', error.message);
      return false;
    }
    
    // Sessiyani yangilash
    const { error: refreshError } = await supabase.auth.refreshSession();
    
    if (refreshError) {
      console.error('Klient: Sessiyani yangilashda xatolik:', refreshError.message);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Klient: Admin rolini o\'rnatishda xatolik:', error);
    return false;
  }
}

/**
 * API orqali admin rolini o'rnatish
 * Bu server componentlar o'rniga API route orqali ishlaydi
 */
export async function setAdminRoleViaApi(userId: string) {
  if (!userId) {
    return false;
  }
  
  try {
    const response = await fetch('/api/auth/set-admin-role', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      console.error('API orqali admin rolini o\'rnatishda xatolik:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('API so\'rovida xatolik:', error);
    return false;
  }
}

/**
 * API orqali foydalanuvchi ma'lumotlarini olish
 */
export async function getUserWithRoleViaApi() {
  try {
    const response = await fetch('/api/auth/get-user-role', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      console.error('API orqali foydalanuvchi ma\'lumotlarini olishda xatolik:', error);
      return { user: null, isAdmin: false };
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API so\'rovida xatolik:', error);
    return { user: null, isAdmin: false };
  }
}

/**
 * Server API so'rovlari uchun fetch funksiyasi
 * Auth headerlarni avtomatik qo'shib beradi
 */
export function getFetchWithAuth() {
  const supabase = createClientComponentClient<Database>();
  
  return async (url: string, options: RequestInit = {}) => {
    try {
      // Sessiyadan access token olish
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      
      if (!token) {
        throw new Error('Avtorizatsiya tokeni mavjud emas');
      }
      
      // Headers bilan so'rov yuborish
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      };
      
      return fetch(url, {
        ...options,
        headers,
      });
    } catch (error) {
      console.error('Avtorizatsiya bilan so\'rov yuborishda xatolik:', error);
      throw error;
    }
  };
} 