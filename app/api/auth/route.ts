import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import type { Database } from '@/types/database.types';

/**
 * POST /api/auth/admin-role
 * Foydalanuvchiga admin rolini beradi (app_metadata ni o'zgartiradi)
 * Bu endpoint faqat existing userlar uchun
 */
export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  
  try {
    // Sessiyani tekshirish
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      console.error('Admin rol o\'rnatishda xatolik: Sessiya topilmadi', sessionError);
      return NextResponse.json(
        { error: 'Ruxsat berilmagan. Avval tizimga kiring.' },
        { status: 401 }
      );
    }
    
    // Adminga o'zgartirish
    const { data, error } = await supabase.auth.admin.updateUserById(
      session.user.id,
      { app_metadata: { role: 'admin' } }
    );
    
    if (error) {
      console.error('Admin rol o\'rnatishda xatolik:', error);
      return NextResponse.json(
        { error: 'Admin rolini o\'rnatishda xatolik yuz berdi' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { success: true, message: 'Admin roli muvaffaqiyatli o\'rnatildi' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Admin rol o\'rnatishda xatolik:', error);
    return NextResponse.json(
      { error: 'Kutilmagan xatolik yuz berdi' },
      { status: 500 }
    );
  }
} 