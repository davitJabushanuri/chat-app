import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.JWT_SECRET });
  const url = req.nextUrl.clone();

  if (req.nextUrl.pathname.startsWith("/home") && !session) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  if (url.pathname === "/" && session) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/auth/signin") && session) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}
