import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_PATHS = new Set(["/login", "/forgot-password", "/reset-password"]);

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasToken = Boolean(request.cookies.get("authToken")?.value);
  const isPublic = PUBLIC_PATHS.has(pathname);

  if (hasToken && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!hasToken && !isPublic) {
    const login = new URL("/login", request.url);
    login.searchParams.set("redirect", `${pathname}${search}`);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
