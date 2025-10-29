// Use a relative URL in the browser to avoid mixed-content and CORS issues.
// When running server-side (Next.js server or during build) fall back to the
// environment variable which should point to the backend reachable from the
// server (e.g. http://backend:8000 when running inside Docker).
const isBrowser = typeof window !== 'undefined';
export const API_BASE_URL = isBrowser ? '' : (process.env.NEXT_PUBLIC_API_URL || 'http://backend:8000');
export const API_URL = `${API_BASE_URL}/api/v1`;