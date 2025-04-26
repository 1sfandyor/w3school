import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/types/database.types';

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore });
  
  try {
    // Sessiyani tekshirish
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('Server: Sessiyani olishda xatolik:', sessionError.message);
      return NextResponse.json({ error: 'Sessiya xatosi' }, { status: 401 });
    }
    
    if (!session || !session.user) {
      return NextResponse.json({ user: null, isAdmin: false }, { status: 200 });
    }
    
    // Foydalanuvchi ma'lumotlarini olish
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error('Server: Foydalanuvchi ma\'lumotlarini olishda xatolik:', userError?.message);
      return NextResponse.json({ user: null, isAdmin: false }, { status: 200 });
    }
    
    // Rolni tekshirish - avval app_metadata, keyin user_metadata
    const userRole = user.app_metadata?.role || user.user_metadata?.role;
    const isAdmin = userRole === 'admin';
    
    // User ma'lumotlaridan maxfiy ma'lumotlarni olib tashlash
    const safeUser = {
      id: user.id,
      email: user.email,
      role: userRole,
      created_at: user.created_at,
      updated_at: user.updated_at,
      app_metadata: user.app_metadata,
      user_metadata: user.user_metadata
    };
    
    return NextResponse.json({ user: safeUser, isAdmin }, { status: 200 });
  } catch (error) {
    console.error('Server: Foydalanuvchini olishda xatolik:', error);
    return NextResponse.json({ error: 'Kutilmagan xatolik yuz berdi' }, { status: 500 });
  }
} 