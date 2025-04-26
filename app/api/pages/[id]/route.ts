import { NextRequest, NextResponse } from 'next/server';
import { getPage, updatePage, deletePage } from '@/lib/api';
import { ContentFormData } from '@/types/content';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/pages/[id] - alohida sahifani olish
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Yaroqsiz sahifa identifikatori' },
        { status: 400 }
      );
    }
    
    const page = await getPage(id);
    
    return NextResponse.json(page);
  } catch (error: any) {
    console.error('API xatolik:', error);
    
    if (error.code === 'PGRST116') {
      return NextResponse.json(
        { error: 'Sahifa topilmadi' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Sahifani olishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}

// PUT /api/pages/[id] - sahifani yangilash
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Yaroqsiz sahifa identifikatori' },
        { status: 400 }
      );
    }
    
    const data = await request.json() as ContentFormData;
    
    if (!data.title || !data.slug) {
      return NextResponse.json(
        { error: 'Sarlavha va slug to\'ldirilishi kerak' },
        { status: 400 }
      );
    }
    
    const page = await updatePage(id, data);
    
    return NextResponse.json(page);
  } catch (error: any) {
    console.error('API xatolik:', error);
    
    if (error.code === 'PGRST116') {
      return NextResponse.json(
        { error: 'Sahifa topilmadi' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Sahifani yangilashda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}

// DELETE /api/pages/[id] - sahifani o'chirish
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Yaroqsiz sahifa identifikatori' },
        { status: 400 }
      );
    }
    
    await deletePage(id);
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API xatolik:', error);
    
    if (error.code === 'PGRST116') {
      return NextResponse.json(
        { error: 'Sahifa topilmadi' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Sahifani o\'chirishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
} 