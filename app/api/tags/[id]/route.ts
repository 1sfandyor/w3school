import { NextRequest, NextResponse } from 'next/server';
import { getTag, updateTag, deleteTag, getTagUsage } from '@/lib/api';
import { TagFormData } from '@/types/content';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/tags/[id] - alohida tegni olish
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Yaroqsiz teg identifikatori' },
        { status: 400 }
      );
    }
    
    const searchParams = request.nextUrl.searchParams;
    const withUsage = searchParams.get('usage') === 'true';
    
    const tag = await getTag(id);
    
    // Agar usage=true berilgan bo'lsa, foydalanilgan sahifalar va darsliklar sonini ham qaytarish
    if (withUsage) {
      const usage = await getTagUsage(id);
      return NextResponse.json({ ...tag, usage });
    }
    
    return NextResponse.json(tag);
  } catch (error: any) {
    console.error('API xatolik:', error);
    
    if (error.code === 'PGRST116') {
      return NextResponse.json(
        { error: 'Teg topilmadi' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Tegni olishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}

// PUT /api/tags/[id] - tegni yangilash
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Yaroqsiz teg identifikatori' },
        { status: 400 }
      );
    }
    
    const data = await request.json() as TagFormData;
    
    if (!data.name || !data.slug) {
      return NextResponse.json(
        { error: 'Nom va slug to\'ldirilishi kerak' },
        { status: 400 }
      );
    }
    
    const tag = await updateTag(id, data);
    
    return NextResponse.json(tag);
  } catch (error: any) {
    console.error('API xatolik:', error);
    
    if (error.code === 'PGRST116') {
      return NextResponse.json(
        { error: 'Teg topilmadi' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Tegni yangilashda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}

// DELETE /api/tags/[id] - tegni o'chirish
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Yaroqsiz teg identifikatori' },
        { status: 400 }
      );
    }
    
    await deleteTag(id);
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API xatolik:', error);
    
    if (error.code === 'PGRST116') {
      return NextResponse.json(
        { error: 'Teg topilmadi' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Tegni o\'chirishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
} 