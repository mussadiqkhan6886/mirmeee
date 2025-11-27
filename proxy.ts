import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect admin routes except login page
  if (
    pathname.startsWith("/admin-dashboard") &&
    !pathname.startsWith("/admin-dashboard/login")
  ) {
    const token = req.cookies.get("adminToken")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin-dashboard/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin-dashboard/:path*",
};
