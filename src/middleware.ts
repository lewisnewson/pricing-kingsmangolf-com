import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// App middleware for authentication and internationalization
export async function middleware(request: NextRequest, response: NextResponse) {
	// Get the pathname and search parameters from the request
	const { pathname } = request.nextUrl

	// Extract the firebase auth token from cookies (written after a login)
	const firebaseToken: any = request.cookies.get("__KG_FB_Token")

	// @TODO - Validate the session token with Firebase
	const tokenValid = true

	// If the token isn't present or has a null value
	if ((!firebaseToken?.value || !tokenValid) && pathname !== "/login") {
		return NextResponse.redirect(new URL(`/login`, request.url))
	} else if (firebaseToken?.value && tokenValid && pathname === "/login") {
		return NextResponse.redirect(new URL(`/dashboard`, request.url))
	}
}

export const config = {
	matcher: [
		// Skip all internal paths, favicons and api endpoints
		"/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
	],
}
