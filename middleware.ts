import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  // Faqat admin sahifalari uchun tekshirish
  if (req.nextUrl.pathname.startsWith('/admin') && 
      !req.nextUrl.pathname.startsWith('/admin/login')) {
    
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    
    // Sessiyani tekshirish
    console.log("Middleware: Checking session for:", req.nextUrl.pathname);
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Sessiya bo'lmasa login sahifasiga yo'naltirish
    if (!session) {
      console.log("Middleware: No session, redirecting to login");
      const redirectUrl = new URL('/admin/login', req.url);
      return NextResponse.redirect(redirectUrl);
    }
    
    // Admin rolini tekshirish
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log("Middleware: No user found, redirecting to login");
      const redirectUrl = new URL('/admin/login', req.url);
      return NextResponse.redirect(redirectUrl);
    }
    
    // Debug uchun barcha ma'lumotlarni ko'rish
    console.log("Middleware: User metadata:", JSON.stringify({
      id: user?.id,
      email: user?.email,
      app_metadata: user?.app_metadata,
      user_metadata: user?.user_metadata
    }));
    
    // Har ikkala joydan rolni tekshirish
    const appMetadataRole = user?.app_metadata?.role;
    const userMetadataRole = user?.user_metadata?.role;
    
    console.log(`Middleware: Checking roles - app_metadata.role: ${appMetadataRole}, user_metadata.role: ${userMetadataRole}`);
    
    // Admin roli borligini tekshirish
    const isAdmin = appMetadataRole === 'admin' || userMetadataRole === 'admin';
    
    if (!isAdmin) {
      console.log("Middleware: User is not admin, redirecting to login");
      const redirectUrl = new URL('/admin/login', req.url);
      return NextResponse.redirect(redirectUrl);
    }
    
    console.log("Middleware: User is admin, allowing access");
    return res;
  }
  
  // Boshqa barcha manzillar uchun
  return NextResponse.next();
}

// Middleware faqat admin sahifalari uchun ishlasin
export const config = {
  matcher: [
    '/admin/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 