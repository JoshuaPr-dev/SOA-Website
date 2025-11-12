import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  if (req.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        // Next.js middleware Request cookies API
        get: (name) => {
          const c = req.cookies.get?.(name);
          return c ? c.value : undefined;
        },
        set: (name, value, options) => {
          // NextResponse cookies API
          res.cookies.set(name, value, options);
        },
        remove: (name, options) => {
          res.cookies.delete(name, options);
        }
      }
    }
  );

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session && req.nextUrl.pathname.startsWith('/admin') && !req.nextUrl.pathname.includes('/login')) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*']
};