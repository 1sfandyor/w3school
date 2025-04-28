import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { uploadMedia, getMediaFiles, deleteMedia, updateMedia } from '@/lib/api/media';

// Supabase klientini yaratish
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Supabase client yaratish va sessiyani olish funksiyasi
async function getAuthorizedClient(request: NextRequest) {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  // Auth headerlardan tokenni olish
  const authHeader = request.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.replace('Bearer ', '');
    
    // Auth sesssiyani o'rnatish
    await supabase.auth.setSession({
      access_token: token,
      refresh_token: '',
    });
  }
  
  // Sessiyani olish
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    throw new Error("Avtorizatsiyadan o'tilmagan");
  }
  
  return { supabase, session };
}

// Media fayllar ro'yxatini olish
export async function GET(request: NextRequest) {
  try {
    // Supabase klientini olish
    const { supabase } = await getAuthorizedClient(request);

    // Query parametrlarini olish
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const type = searchParams.get('type') || undefined;
    const search = searchParams.get('search') || undefined;

    // Media fayllar ro'yxatini olish
    const { data, count, error } = await getMediaFiles({
      page,
      limit,
      type,
      search,
    }, supabase);

    if (error) throw new Error(error);

    return NextResponse.json({ data, count });
  } catch (error: any) {
    console.error('GET /api/media xatosi:', error);
    
    if (error.message === "Avtorizatsiyadan o'tilmagan") {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Media fayllarni olishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}

// Media fayl yuklash
export async function POST(request: NextRequest) {
  try {
    // Supabase klientini olish
    const { supabase } = await getAuthorizedClient(request);

    // Form data ni olish
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const path = formData.get('path') as string || '';

    if (!file) {
      return NextResponse.json(
        { error: 'Fayl topilmadi' },
        { status: 400 }
      );
    }

    // Faylni yuklash
    const { data, error } = await uploadMedia(file, path, supabase);
    if (error) throw new Error(error);

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error('POST /api/media xatosi:', error);
    
    if (error.message === "Avtorizatsiyadan o'tilmagan") {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Media fayl yuklashda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}

// Media faylni o'chirish
export async function DELETE(request: NextRequest) {
  try {
    // Supabase klientini olish
    const { supabase } = await getAuthorizedClient(request);

    // ID ni olish
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: "ID ko'rsatilmagan" },
        { status: 400 }
      );
    }

    // Faylni o'chirish
    const { error } = await deleteMedia(id, supabase);
    if (error) throw new Error(error);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('DELETE /api/media xatosi:', error);
    
    if (error.message === "Avtorizatsiyadan o'tilmagan") {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: "Media faylni o'chirishda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}

// Media fayl ma'lumotlarini yangilash
export async function PATCH(request: NextRequest) {
  try {
    // Supabase klientini olish
    const { supabase } = await getAuthorizedClient(request);
    
    // Ma'lumotlarni olish
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID ko'rsatilmagan" },
        { status: 400 }
      );
    }

    // Ma'lumotlarni yangilash
    const { data, error } = await updateMedia(id, updates, supabase);
    if (error) throw new Error(error);

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error('PATCH /api/media xatosi:', error);
    
    if (error.message === "Avtorizatsiyadan o'tilmagan") {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Media fayl ma\'lumotlarini yangilashda xatolik yuz berdi' },
      { status: 500 }
    );
  }
} 