import { NextRequest, NextResponse } from 'next/server';
import { getPageVersions } from '@/lib/api';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/pages/[id]/versions - sahifa versiyalarini olish
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Yaroqsiz sahifa identifikatori' },
        { status: 400 }
      );
    }
    
    const versions = await getPageVersions(id);
    
    return NextResponse.json(versions);
  } catch (error: any) {
    console.error('API xatolik:', error);
    
    return NextResponse.json(
      { error: error.message || 'Sahifa versiyalarini olishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
} 