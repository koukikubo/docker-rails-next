import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  // Basic 認証の解析
  const base64Credentials = authHeader.split(" ")[1];
  const [username, password] = atob(base64Credentials).split(":");

  const validUsername = process.env.NEXT_PUBLIC_BASIC_AUTH_USER;
  const validPassword = process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD;

  if (username !== validUsername || password !== validPassword) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
}

