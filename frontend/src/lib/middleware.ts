import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get("authorization");

  const validAuth = `Basic ${btoa(`${process.env.NEXT_PUBLIC_BASIC_AUTH_USER}:${process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD}`)}`;

  if (basicAuth !== validAuth) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
}

// Basic認証を適用するページの範囲を指定
export const config = {
  matcher: '/:path*'
};


