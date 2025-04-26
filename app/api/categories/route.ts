import { NextRequest, NextResponse } from 'next/server';
import { getCategories, getCategoriesTree, createCategory } from '@/lib/api';
import { CategoryFormData } from '@/types/content';

// GET /api/categories - kategoriyalar ro'yxatini olish
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tree = searchParams.get('tree') === 'true';
    
    // Agar tree=true parametri berilsa, daraxtsimon tuzilishda qaytarish
    const categories = tree ? await getCategoriesTree() : await getCategories();
    
    return NextResponse.json(categories);
  } catch (error: any) {
    console.error('API xatolik:', error);
    return NextResponse.json(
      { error: error.message || 'Kategoriyalarni olishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}

// POST /api/categories - yangi kategoriya yaratish
export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as CategoryFormData;
    
    if (!data.name || !data.slug) {
      return NextResponse.json(
        { error: 'Nom va slug to\'ldirilishi kerak' },
        { status: 400 }
      );
    }
    
    const category = await createCategory(data);
    
    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    console.error('API xatolik:', error);
    return NextResponse.json(
      { error: error.message || 'Kategoriya yaratishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
} 