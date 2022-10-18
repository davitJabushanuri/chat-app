import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // get user from cookies
  const isAuthenticated = req.cookies.get("next-auth.session-token");

  if (req.nextUrl.pathname.startsWith("/home") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/auth/signin") && isAuthenticated) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}
