"use server"
import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import { OauthObj } from "./libs/init_oauth"
export async function middleware(request: NextRequest) {
  const request_data = {
    url: `${process.env.NEXT_PUBLIC_OAUTH_INITIATE}` as string,
    method: "get",
    data: { oauth_callback: process.env.NEXT_PUBLIC_OAUTH_CALLBACK_URL },
  }
  let _token = request.cookies.get("access_token")
  if (request.nextUrl.pathname !== "/") {
    if (_token) return
    const str = await OauthObj.lrsOauthInitiate({
      request_data,
      url: request_data.url,
      _next: request.nextUrl.pathname,
    })
    const re = NextResponse.redirect(new URL(str, request.url))
    re.cookies.set("_next", request.nextUrl.pathname)
    return re
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|static/images|auth|favicon.ico).*)"],
}
