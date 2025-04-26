import { NextRequest, NextResponse } from 'next/server';
import { getRecentActivities } from '@/lib/api';

// GET /api/dashboard/activities - so'nggi faoliyatlarni olish
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '5');
    
    const activities = await getRecentActivities(limit);
    
    return NextResponse.json(activities);
  } catch (error: any) {
    console.error('API xatolik:', error);
    return NextResponse.json(
      { error: error.message || 'Faoliyatlarni olishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
} 