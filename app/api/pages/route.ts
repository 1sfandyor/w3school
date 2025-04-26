import { NextRequest, NextResponse } from 'next/server';
import { getPages, createPage } from '@/lib/api';
import { ContentFormData } from '@/types/content';

// GET /api/pages - sahifalar ro'yxatini olish
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const status = searchParams.get('status') || undefined;
    
    const result = await getPages(page, pageSize, status);
    
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API xatolik:', error);
    return NextResponse.json(
      { error: error.message || 'Sahifalarni olishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}

// POST /api/pages - yangi sahifa yaratish
export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as ContentFormData;
    
    if (!data.title || !data.slug) {
      return NextResponse.json(
        { error: 'Sarlavha va slug to\'ldirilishi kerak' },
        { status: 400 }
      );
    }
    
    const page = await createPage(data);
    
    return NextResponse.json(page, { status: 201 });
  } catch (error: any) {
    console.error('API xatolik:', error);
    return NextResponse.json(
      { error: error.message || 'Sahifa yaratishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
} 