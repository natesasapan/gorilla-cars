// middleware.ts (create this file in your root directory)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Add the paths that you want to protect here
const protectedRoutes = ['/home', '/item']
const authRoutes = ['/login', '/signup']

export function middleware(request: NextRequest) {
    // Get the path of the request
    const path = request.nextUrl.pathname
    
    // Check if this is a protected route
    const isProtectedRoute = protectedRoutes.includes(path)
    const isAuthRoute = authRoutes.includes(path)
    
    // Get the token from cookies
    const token = request.cookies.get('auth_token')?.value
    
    // If trying to access protected route without being logged in
    if (isProtectedRoute && !token) {
        const url = new URL('/login', request.url)
        url.searchParams.set('redirect', path)
        return NextResponse.redirect(url)
    }
    
    // If trying to access login/signup while logged in
    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL('/home', request.url))
    }
    
    return NextResponse.next()
}

// Configure which routes use this middleware
export const config = {
    matcher: [...protectedRoutes, ...authRoutes]
}
