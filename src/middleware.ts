import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|mockServiceWorker.js).*)"],
}

export function middleware(request: NextRequest) {
  // const allCookies = request.cookies.getAll()
  // const allHeaders = request.headers.entries()

  const isDev = process.env.NODE_ENV === "development"

  if (!isDev && /^\/$/.test(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/map", request.url))
  }

  if (!isDev && /^\/guide$/.test(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/map", request.url))
  }

  if (/^\/mypage(?!\/).*/.test(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/mypage/profile", request.url))
  }
}
