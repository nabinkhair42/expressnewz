import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the admin-auth cookie, which might be undefined
  const adminAuthCookie = request.cookies.get("admin-auth");

  // Convert adminAuthCookie to a string or default to an empty string
  const isAuthenticated = adminAuthCookie
    ? adminAuthCookie.value === "true"
    : false;

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
