import { getSessionCookie } from "better-auth/cookies";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/login", "/register"];

export async function proxy(req: NextRequest) {
  const { nextUrl } = req;

  // Use getSessionCookie to check for session existence (recommended approach)
  const sessionCookie = getSessionCookie(req, {
    cookiePrefix: "better-auth",
  });

  const isLoggedIn = !!sessionCookie;
  const isOnProtectedRoute = protectedRoutes.some(
    (route) =>
      nextUrl.pathname === route || nextUrl.pathname.startsWith(`${route}/`),
  );
  const isOnAuthRoute = authRoutes.includes(nextUrl.pathname);
  // Redirect logged-in users away from auth pages
  if (isOnAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Redirect unauthenticated users away from protected routes
  if (isOnProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // For role-based access control, move this logic to individual pages
  // using auth.api.getSession() for full validation

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
