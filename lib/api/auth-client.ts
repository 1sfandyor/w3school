import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/database.types';

/**
 * Client komponentlarda admin rolini so'rash API'si
 * @returns {Promise<{success: boolean, error?: string}>} So'rov natijasi
 */
export async function requestAdminRole(): Promise<{success: boolean, error?: string}> {
  try {
    // Foydalanuvchi ma'lumotlarini olish
    const supabase = createClientComponentClient<Database>();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session || !session.user) {
      return { success: false, error: 'Autentifikatsiya talab qilinadi' };
    }
    
    // API ga so'rov yuborish
    const response = await fetch('/api/auth/set-admin-role', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: session.user.id }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, error: data.error || 'So\'rov amalga oshmadi' };
    }
    
    // Sessiyani yangilash
    await supabase.auth.refreshSession();
    
    return { success: true };
  } catch (error) {
    console.error('Admin huquqini so\'rashda xatolik:', error);
    return { success: false, error: 'So\'rovni yuborishda xatolik yuz berdi' };
  }
} 