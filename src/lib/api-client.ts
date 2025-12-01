export const apiClient = {
    async get(url: string) {
        console.log('[API Client] GET request to:', url)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Send cookies
        })
        console.log('[API Client] GET response status:', response.status, response.statusText)
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`)
        }
        return response.json()
    },

    async post(url: string, body: any) {
        console.log('[API Client] POST request to:', url, 'with body:', body)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(body),
        })
        console.log('[API Client] POST response status:', response.status, response.statusText)
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`)
        }
        return response.json()
    },

    // Add other methods as needed
}
