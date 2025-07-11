import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  // ✅ Block all access if no token
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ If token exists, allow — real checks happen in API handlers
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/employee/:path*"],
};