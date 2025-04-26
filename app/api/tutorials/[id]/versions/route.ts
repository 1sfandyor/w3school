import { NextRequest, NextResponse } from 'next/server';
import { getTutorialVersions } from '@/lib/api';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/tutorials/[id]/versions - darslik versiyalarini olish
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Yaroqsiz darslik identifikatori' },
        { status: 400 }
      );
    }
    
    const versions = await getTutorialVersions(id);
    
    return NextResponse.json(versions);
  } catch (error: any) {
    console.error('API xatolik:', error);
    
    return NextResponse.json(
      { error: error.message || 'Darslik versiyalarini olishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
} 