import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // get user from session

  if (req.nextUrl.pathname.startsWith("/home")) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
  return NextResponse.next();
}

// export const config = { matcher: ["/home"] };
