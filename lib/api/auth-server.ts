import { createServerComponentClient, createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/database.types';
import { cookies } from 'next/headers';

/**
 * API route uchun auth client yaratish
 * Bu funksiya pages/api/ direktoriyasidagi API route'larda ishlatilishi mumkin
 */
export function createApiSupabaseClient(req: Request) {
  const cookieStore = {
    getAll: () => {
      const cookieHeader = req.headers.get('cookie') || '';
      return cookieHeader.split(';').map((cookie: string) => {
        const [name, ...rest] = cookie.trim().split('=');
        return {
          name,
          value: rest.join('=')
        };
      });
    }
  };

  return createRouteHandlerClient<Database>({ cookies: () => cookieStore as any });
}

// Standart cookie sozlamalari
function getDefaultCookieOptions(name: string): {
  domain: string;
  path: string;
  sameSite: 'lax' | 'strict' | 'none';
  secure: boolean;
  httpOnly: boolean;
  maxAge: number;
} {
  return {
    domain: '',
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 1 hafta
  };
}

// API route handler (app/api/...) uchun Supabase client
export function createApiRouteClient() {
  return createRouteHandlerClient<Database>({ cookies });
}

// Server Component (app/...) uchun Supabase client
export function createServerClient() {
  return createServerComponentClient<Database>({ cookies });
}

/**
 * API route ichidan foydalanuvchi ma'lumotlarini olish va admin roli tekshirish
 * @returns {Promise<{user: any, isAdmin: boolean} | null>} Foydalanuvchi ma'lumotlari
 */
export async function getUserWithRoleFromApi() {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore });
    
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session || !session.user) {
      return null;
    }
    
    const user = session.user;
    const isAdmin = user.app_metadata?.role === 'admin' || user.user_metadata?.role === 'admin';
    
    return { user, isAdmin };
  } catch (error) {
    console.error('Foydalanuvchi rolini tekshirishda xatolik:', error);
    return null;
  }
}

/**
 * API route ichidan admin rolini o'rnatish
 * @param {string} userId - Foydalanuvchi ID raqami
 * @returns {Promise<boolean>} - Muvaffaqiyatli bajarilgan bo'lsa true
 */
export async function setAdminRoleFromApi(userId: string): Promise<boolean> {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore });
    
    // App metadata ga admin rolini o'rnatish
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      userId,
      { app_metadata: { role: 'admin' } }
    );
    
    if (updateError) {
      console.error('Admin rolini o\'rnatishda xatolik:', updateError);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Admin rolini o\'rnatishda xatolik:', error);
    return false;
  }
}

/**
 * Foydalanuvchiga tegishli kontent ekanligini tekshirish
 * Bu funksiya pages/api direktoriyasida ishlatilishi mumkin
 */
export function checkUserOwnership(contentUserId: string, currentUserId: string) {
  if (!contentUserId || !currentUserId) {
    return false;
  }
  
  return contentUserId === currentUserId;
}

/**
 * Server komponentlari uchun joriy foydalanuvchini olish
 * Bu funksiya app/ direktoriyasidagi server komponentlarda ishlatilishi kerak
 */
export async function getUserWithRole() {
  const supabase = createServerClient();
  
  try {
    // Sessiyani tekshirish
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('Server: Sessiyani olishda xatolik:', sessionError.message);
      return { user: null, isAdmin: false };
    }
    
    if (!session || !session.user) {
      return { user: null, isAdmin: false };
    }
    
    // Foydalanuvchi ma'lumotlarini olish
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error('Server: Foydalanuvchi ma\'lumotlarini olishda xatolik:', userError?.message);
      return { user: null, isAdmin: false };
    }
    
    // Rolni tekshirish - avval app_metadata, keyin user_metadata
    const userRole = user.app_metadata?.role || user.user_metadata?.role;
    const isAdmin = userRole === 'admin';
    
    return { user, isAdmin };
  } catch (error) {
    console.error('Server: Foydalanuvchini olishda xatolik:', error);
    return { user: null, isAdmin: false };
  }
}

/**
 * Server Component orqali foydalanuvchiga admin rolini berish
 * Bu funksiya app/ direktoriyasidagi server komponentlarda ishlatilishi kerak
 */
export async function setAdminRole(userId: string) {
  if (!userId) {
    return false;
  }
  
  const supabase = createServerClient();
  
  try {
    // app_metadata orqali rolni o'rnatish
    const { error } = await supabase.auth.admin.updateUserById(userId, {
      app_metadata: { role: 'admin' }
    });
    
    // Sessiyani yangilash
    const { error: refreshError } = await supabase.auth.refreshSession();
    
    if (refreshError) {
      console.error('Server: Sessiyani yangilashda xatolik:', refreshError.message);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Server: Admin rolini o\'rnatishda xatolik:', error);
    return false;
  }
} 