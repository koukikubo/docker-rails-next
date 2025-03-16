// src/lib/fetchApi.ts

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function fetchApi<T>(
  endpoint: string,
  method: HttpMethod = 'GET',
  body?: unknown
): Promise<T> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) throw new Error('API URL is missing');

  try {
    const res = await fetch(`${apiUrl}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP error! Status: ${res.status}, Message: ${errorText}`);
    }

    return await res.json();
  } catch (error: any) {
    console.error(`API Fetch Error on ${endpoint}:`, error.message);
    throw error;
  }
}
