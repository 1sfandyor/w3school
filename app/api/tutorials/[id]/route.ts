import { NextRequest, NextResponse } from 'next/server';
import { getTutorial, updateTutorial, deleteTutorial } from '@/lib/api';
import { ContentFormData } from '@/types/content';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/tutorials/[id] - alohida darslikni olish
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Yaroqsiz darslik identifikatori' },
        { status: 400 }
      );
    }
    
    const tutorial = await getTutorial(id);
    
    return NextResponse.json(tutorial);
  } catch (error: any) {
    console.error('API xatolik:', error);
    
    if (error.code === 'PGRST116') {
      return NextResponse.json(
        { error: 'Darslik topilmadi' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Darslikni olishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}

// PUT /api/tutorials/[id] - darslikni yangilash
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Yaroqsiz darslik identifikatori' },
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
    
    const tutorial = await updateTutorial(id, data);
    
    return NextResponse.json(tutorial);
  } catch (error: any) {
    console.error('API xatolik:', error);
    
    if (error.code === 'PGRST116') {
      return NextResponse.json(
        { error: 'Darslik topilmadi' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Darslikni yangilashda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}

// DELETE /api/tutorials/[id] - darslikni o'chirish
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Yaroqsiz darslik identifikatori' },
        { status: 400 }
      );
    }
    
    await deleteTutorial(id);
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API xatolik:', error);
    
    if (error.code === 'PGRST116') {
      return NextResponse.json(
        { error: 'Darslik topilmadi' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Darslikni o\'chirishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
} 