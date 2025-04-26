import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import type { Database } from '@/types/database.types';

/**
 * POST /api/auth/admin-role
 * 
 * Joriy foydalanuvchiga admin rolini berish uchun API
 * Bu server tarafdan app_metadata'ni o'zgartiradi
 */
export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore });
  
  try {
    // Joriy sessiyani tekshirish
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      console.error('Admin rol berish uchun sessiya olishda xatolik:', sessionError);
      return NextResponse.json(
        { error: 'Avtorizatsiya mavjud emas' },
        { status: 401 }
      );
    }
    
    const userId = session.user.id;
    
    // Admin rolini o'rnatish
    const { data, error } = await supabase.auth.admin.updateUserById(userId, {
      app_metadata: { role: 'admin' },
    });
    
    if (error) {
      console.error('Admin rolini o\'rnatishda xatolik:', error);
      return NextResponse.json(
        { error: 'Admin rolini o\'rnatishda xatolik yuz berdi' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Admin roli muvaffaqiyatli o\'rnatildi' 
    });
    
  } catch (error) {
    console.error('Admin rolini o\'rnatishda kutilmagan xatolik:', error);
    return NextResponse.json(
      { error: 'Server xatoligi yuz berdi' },
      { status: 500 }
    );
  }
} 