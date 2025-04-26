import { NextRequest, NextResponse } from 'next/server';
import { getTags, createTag } from '@/lib/api';
import { TagFormData } from '@/types/content';

// GET /api/tags - teglar ro'yxatini olish
export async function GET(request: NextRequest) {
  try {
    const tags = await getTags();
    
    return NextResponse.json(tags);
  } catch (error: any) {
    console.error('API xatolik:', error);
    return NextResponse.json(
      { error: error.message || 'Teglarni olishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}

// POST /api/tags - yangi teg yaratish
export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as TagFormData;
    
    if (!data.name || !data.slug) {
      return NextResponse.json(
        { error: 'Nom va slug to\'ldirilishi kerak' },
        { status: 400 }
      );
    }
    
    const tag = await createTag(data);
    
    return NextResponse.json(tag, { status: 201 });
  } catch (error: any) {
    console.error('API xatolik:', error);
    return NextResponse.json(
      { error: error.message || 'Teg yaratishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
} 