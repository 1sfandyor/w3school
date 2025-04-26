import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  // Admin sahifalar uchun tekshirish
  if (req.nextUrl.pathname.startsWith('/admin') && 
      !req.nextUrl.pathname.startsWith('/admin/login')) {
    
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Sessiya bo'lmasa login sahifasiga yo'naltirish
    if (!session) {
      const redirectUrl = new URL('/admin/login', req.url);
      return NextResponse.redirect(redirectUrl);
    }
    
    // Admin rolini tekshirish
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      const redirectUrl = new URL('/admin/login', req.url);
      return NextResponse.redirect(redirectUrl);
    }
    

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
    
    return res;
  }
  
  // Not-found sahifasi uchun maxsus middleware
  if (req.nextUrl.pathname === '/not-found') {
    // Agar so'rov /not-found ga kelgan bo'lsa, 404 sahifasini ko'rsatish
    return NextResponse.rewrite(new URL('/not-found', req.url));
  }
  
  // Boshqa barcha manzillar uchun
  return NextResponse.next();
}

// Middleware faqat admin va dinamik sahifalar uchun ishlasin
export const config = {
  matcher: [
    '/admin/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 