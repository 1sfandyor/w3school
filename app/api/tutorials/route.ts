import { NextRequest, NextResponse } from 'next/server';
import { getTutorials, createTutorial } from '@/lib/api';
import { ContentFormData } from '@/types/content';

// GET /api/tutorials - darsliklar ro'yxatini olish
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const status = searchParams.get('status') || undefined;
    
    const result = await getTutorials(page, pageSize, status);
    
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API xatolik:', error);
    return NextResponse.json(
      { error: error.message || 'Darsliklarni olishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}

// POST /api/tutorials - yangi darslik yaratish
export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as ContentFormData;
    
    if (!data.title || !data.slug) {
      return NextResponse.json(
        { error: 'Sarlavha va slug to\'ldirilishi kerak' },
        { status: 400 }
      );
    }
    
    const tutorial = await createTutorial(data);
    
    return NextResponse.json(tutorial, { status: 201 });
  } catch (error: any) {
    console.error('API xatolik:', error);
    return NextResponse.json(
      { error: error.message || 'Darslik yaratishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
} 