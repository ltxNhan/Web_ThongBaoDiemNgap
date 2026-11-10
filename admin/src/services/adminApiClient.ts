const BASE_URL = '/api/admin';

export async function adminRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('admin_token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
    if (!res.ok) {
      throw new Error(`Admin API Error ${res.status}`);
    }
    return await res.json();
  } catch (err: any) {
    console.warn(`[adminApiClient] fallback on ${endpoint}:`, err.message);
    throw err;
  }
}
