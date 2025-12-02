import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:3000'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ all: string[] }> }
) {
    const { all } = await params
    return handleAuthRequest(request, all)
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ all: string[] }> }
) {
    const { all } = await params
    return handleAuthRequest(request, all)
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ all: string[] }> }
) {
    const { all } = await params
    return handleAuthRequest(request, all)
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ all: string[] }> }
) {
    const { all } = await params
    return handleAuthRequest(request, all)
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ all: string[] }> }
) {
    const { all } = await params
    return handleAuthRequest(request, all)
}

async function handleAuthRequest(request: NextRequest, pathParts: string[]) {
    const path = pathParts.join('/')
    const backendUrl = `${BACKEND_URL}/api/auth/${path}`

    console.log('🔄 Proxying auth request:', backendUrl)

    try {
        // Get request body if exists
        let body: string | undefined
        if (request.method !== 'GET' && request.method !== 'HEAD') {
            try {
                body = await request.text()
            } catch (e) {
                // No body
            }
        }

        // Forward the request to backend
        const backendResponse = await fetch(backendUrl, {
            method: request.method,
            headers: {
                'Content-Type': 'application/json',
                'Cookie': request.headers.get('cookie') || '',
            },
            body: body,
            credentials: 'include',
        })

        // Get response body
        const responseBody = await backendResponse.text()

        // Create response
        const response = new NextResponse(responseBody, {
            status: backendResponse.status,
            statusText: backendResponse.statusText,
        })

        // Copy headers from backend response
        backendResponse.headers.forEach((value, key) => {
            // Handle Set-Cookie specially to ensure it's set for the frontend domain
            if (key.toLowerCase() === 'set-cookie') {
                // Remove Domain attribute so it defaults to current domain
                const cookieValue = value.replace(/Domain=[^;]+;?/gi, '')
                response.headers.append('Set-Cookie', cookieValue)
            } else if (!['content-encoding', 'transfer-encoding'].includes(key.toLowerCase())) {
                response.headers.set(key, value)
            }
        })

        console.log('✅ Proxy response:', backendResponse.status)
        return response

    } catch (error) {
        console.error('❌ Proxy error:', error)
        return NextResponse.json(
            { error: 'Failed to connect to authentication server' },
            { status: 500 }
        )
    }
}
