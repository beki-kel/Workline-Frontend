import { createAuthClient } from "better-auth/react"
import { organizationClient } from "better-auth/client/plugins"

// Use the local API proxy route instead of calling backend directly
// This ensures cookies are set on the same domain (workline-frontend.vercel.app)
const baseURL = typeof window !== 'undefined'
    ? window.location.origin  // Use same domain in browser
    : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'  // Use frontend URL in SSR

export const authClient = createAuthClient({
    baseURL,
    plugins: [
        organizationClient()
    ],
    fetchOptions: {
        credentials: 'include',
    }
})

// Log to verify configuration
console.log('🔐 Auth Client configured with baseURL:', baseURL)
