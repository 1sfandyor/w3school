import { NextRequest, NextResponse } from 'next/server';
import { getDashboardStats } from '@/lib/api';

// GET /api/dashboard/stats - dashboard statistikalarini olish
export async function GET(request: NextRequest) {
  try {
    const stats = await getDashboardStats();
    
    return NextResponse.json(stats);
  } catch (error: any) {
    console.error('API xatolik:', error);
    return NextResponse.json(
      { error: error.message || 'Statistikalarni olishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
} 