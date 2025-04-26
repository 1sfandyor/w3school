import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/types/database.types';

export async function POST(request: NextRequest) {
  // Faqat POST so'rovlarini qabul qilish
  if (request.method !== 'POST') {
    return NextResponse.json(
      { error: 'Method not allowed. Faqat POST so\'rovlari qabul qilinadi.' },
      { status: 405 }
    );
  }

  try {
    // Supabase mijozini yaratish
    const supabase = createRouteHandlerClient<Database>({ cookies });

    // Foydalanuvchi sessiyasini tekshirish
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Autentifikatsiya kerak. Iltimos, avval tizimga kiring.' },
        { status: 401 }
      );
    }

    // So'rov tanasidan userId ni olish
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'Foydalanuvchi identifikatori kerak' },
        { status: 400 }
      );
    }
    
    // Joriy foydalanuvchi bilan so'ralgan foydalanuvchi bir xil ekanligini tekshirish
    if (session.user.id !== userId) {
      return NextResponse.json(
        { error: 'Faqat o\'zingiz uchun admin huquqini so\'rashingiz mumkin' },
        { status: 403 }
      );
    }

    // Foydalanuvchiga admin rolini tayinlash
    const { data, error } = await supabase.auth.admin.updateUserById(
      userId,
      {
        app_metadata: { role: 'admin' },
        user_metadata: { role: 'admin' }
      }
    );

    if (error) {
      console.error('Foydalanuvchi rolini yangilashda xatolik:', error);
      return NextResponse.json(
        { error: 'Foydalanuvchi rolini yangilashda xatolik yuz berdi' },
        { status: 500 }
      );
    }

    // Sessiyani yangilash
    const { error: refreshError } = await supabase.auth.refreshSession();
    
    if (refreshError) {
      console.error('Sessiyani yangilashda xatolik:', refreshError);
      return NextResponse.json(
        { error: 'Sessiyani yangilashda xatolik yuz berdi' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Admin huquqi muvaffaqiyatli berildi' },
      { status: 200 }
    );
    
  } catch (err: any) {
    console.error('Admin rolini belgilashda xatolik:', err);
    return NextResponse.json(
      { error: err.message || 'Admin rolini belgilashda xatolik yuz berdi' },
      { status: 500 }
    );
  }
} 