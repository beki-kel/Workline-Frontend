import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    // List of protected routes
    const protectedRoutes = ["/dashboard"];
    const isProtectedRoute = protectedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
    );

    if (isProtectedRoute) {
        try {
            // Verify session by calling the backend
            const backendUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "https://workline-backend.vercel.app";
            const sessionResponse = await fetch(`${backendUrl}/api/auth/get-session`, {
                headers: {
                    // Forward all cookies from the request
                    cookie: request.headers.get("cookie") || "",
                },
                credentials: "include",
            });

            if (!sessionResponse.ok || sessionResponse.status === 401) {
                // No valid session, redirect to auth
                return NextResponse.redirect(new URL("/auth", request.url));
            }

            const sessionData = await sessionResponse.json();

            // Check if session exists and user is authenticated
            if (!sessionData || !sessionData.user) {
                return NextResponse.redirect(new URL("/auth", request.url));
            }
        } catch (error) {
            console.error("Middleware session check failed:", error);
            // On error, redirect to auth for safety
            return NextResponse.redirect(new URL("/auth", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
