import { NextRequest, NextResponse } from 'next/server';
import { getCategory, updateCategory, deleteCategory } from '@/lib/api';
import { CategoryFormData } from '@/types/content';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/categories/[id] - alohida kategoriyani olish
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Yaroqsiz kategoriya identifikatori' },
        { status: 400 }
      );
    }
    
    const category = await getCategory(id);
    
    return NextResponse.json(category);
  } catch (error: any) {
    console.error('API xatolik:', error);
    
    if (error.code === 'PGRST116') {
      return NextResponse.json(
        { error: 'Kategoriya topilmadi' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Kategoriyani olishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}

// PUT /api/categories/[id] - kategoriyani yangilash
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Yaroqsiz kategoriya identifikatori' },
        { status: 400 }
      );
    }
    
    const data = await request.json() as CategoryFormData;
    
    if (!data.name || !data.slug) {
      return NextResponse.json(
        { error: 'Nom va slug to\'ldirilishi kerak' },
        { status: 400 }
      );
    }
    
    const category = await updateCategory(id, data);
    
    return NextResponse.json(category);
  } catch (error: any) {
    console.error('API xatolik:', error);
    
    if (error.code === 'PGRST116') {
      return NextResponse.json(
        { error: 'Kategoriya topilmadi' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Kategoriyani yangilashda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}

// DELETE /api/categories/[id] - kategoriyani o'chirish
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Yaroqsiz kategoriya identifikatori' },
        { status: 400 }
      );
    }
    
    await deleteCategory(id);
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API xatolik:', error);
    
    if (error.code === 'PGRST116') {
      return NextResponse.json(
        { error: 'Kategoriya topilmadi' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Kategoriyani o\'chirishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
} 