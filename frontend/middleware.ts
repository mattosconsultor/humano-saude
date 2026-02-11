import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ============================================
  // PROTEÇÃO: Portal interno (UI)
  // ============================================
  if (pathname.startsWith('/portal-interno-hks-2026')) {
    const token = request.cookies.get('admin_token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');

    // Se não tiver token, redireciona para login
    if (!token && pathname !== '/portal-interno-hks-2026/login') {
      const loginUrl = new URL('/admin-login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ============================================
  // PROTEÇÃO: Webhooks (validação básica — tokens verificados dentro das routes)
  // ============================================
  if (pathname.startsWith('/api/webhooks/')) {
    const response = NextResponse.next();
    // Headers de segurança
    response.headers.set('X-Content-Type-Options', 'nosniff');
    return response;
  }

  // ============================================
  // PROTEÇÃO: API routes internas (exceto leads, calculadora, auth, e corretor APIs)
  // ============================================
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/leads') && !pathname.startsWith('/api/calculadora') && !pathname.startsWith('/api/webhooks') && !pathname.startsWith('/api/health') && !pathname.startsWith('/api/auth') && !pathname.startsWith('/api/corretor')) {
    const token = request.cookies.get('admin_token')?.value ||
                  request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
  }

  // ============================================
  // PROTEÇÃO: API do Corretor (requer corretor_token OU admin_token)
  // ============================================
  if (pathname.startsWith('/api/corretor')) {
    const token = request.cookies.get('corretor_token')?.value ||
                  request.cookies.get('admin_token')?.value ||
                  request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
  }

  // ============================================
  // PROTEÇÃO: Dashboard do Corretor (Multi-Tenant)
  // ============================================
  if (pathname.startsWith('/dashboard/corretor') && pathname !== '/dashboard/corretor/login' && pathname !== '/dashboard/corretor/cadastro' && !pathname.startsWith('/dashboard/corretor/onboarding')) {
    const token = request.cookies.get('corretor_token')?.value ||
                  request.cookies.get('admin_token')?.value ||
                  request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      const loginUrl = new URL('/dashboard/corretor/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    const response = NextResponse.next();
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    return response;
  }

  // ============================================
  // BLOQUEIO: Rotas legadas (exceto /dashboard/corretor)
  // ============================================
  if ((pathname === '/dashboard' || pathname.startsWith('/dashboard/')) && !pathname.startsWith('/dashboard/corretor')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/portal-interno-hks-2026/:path*',
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/:path*',
  ],
};
