import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    return proxy(req);
}

export async function GET(req: NextRequest) {
    return proxy(req);
}

async function proxy(req: NextRequest) {
    const { pathname, search } = req.nextUrl;

    // Extract the path after /api/auth
    // pathname is like /api/auth/signin/email
    // We want to forward to {BACKEND}/api/auth/signin/email

    // Get the backend URL
    // Default to the one provided in env or the known fallback
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "https://workline-backend.vercel.app";

    // Construct destination URL
    // We need to ensure we don't double up or miss slashes. 
    // If the backendUrl already contains /api, we should be careful.
    // Based on previous config: `${process.env.NEXT_PUBLIC_API_URL || 'https://workline-backend.vercel.app'}/api/auth/:path*`
    // So if backend is `https://site.com`, target is `https://site.com/api/auth/...`

    // Let's assume the backendUrl is the *root* of the API server.
    // The backend likely expects /api/auth/... so we preserve the full path.

    const targetUrl = new URL(pathname + search, backendUrl);

    console.log(`🔀 Proxying ${req.method} request to: ${targetUrl.toString()}`);

    const headers = new Headers(req.headers);
    headers.set("host", targetUrl.host); // Set host to backend host

    // We might need to forward the origin as the backend might check it, 
    // but usually for server-to-server it's fine. 
    // Let's forward the original host as X-Forwarded-Host if needed.

    try {
        const body = req.method !== "GET" && req.method !== "HEAD" ? await req.blob() : null;

        const response = await fetch(targetUrl, {
            method: req.method,
            headers: headers,
            body: body,
            redirect: "manual", // Don't follow redirects, let browser handle them
        });

        const responseHeaders = new Headers(response.headers);

        // 🍪 CRITICAL: Rewrite Cookies
        // detailed explanation: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
        const setCookieHeader = responseHeaders.get("set-cookie");
        if (setCookieHeader) {
            // Split multiple cookies if they are combined (rare in fetch API headers get(), usually comma separated but tough to parse)
            // Actually fetch headers.get('set-cookie') might explicitly combine them.
            // Next.js Response cookies handling is easier with NextResponse.

            // Let's do a raw string manipulation for simplicity and robustness across runtimes.
            // We want to remove "Domain=xxx;" parts.

            const newSetCookie = setCookieHeader.replace(/Domain=[^;]+;?/gi, "");

            // We also might want to ensure SameSite is Lax or None.
            // For now, removing Domain is the key fix for "Third Party" blocking.

            responseHeaders.set("set-cookie", newSetCookie);
        }

        return new NextResponse(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: responseHeaders,
        });

    } catch (error) {
        console.error("❌ Proxy error:", error);
        return NextResponse.json({ error: "Proxy failed" }, { status: 500 });
    }
}
