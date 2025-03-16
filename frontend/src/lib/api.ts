// frontend/src/lib/api.ts
export async function fetchApi<T>(
  endpoint: string,
  method: string = "GET",
  body?: any
): Promise<T> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) throw new Error("API URL is missing");

  const headers: HeadersInit = {};
  let fetchBody;

  if (body instanceof FormData) {
    fetchBody = body;
  } else if (body) {
    headers["Content-Type"] = "application/json";
    fetchBody = JSON.stringify(body);
  }

  const res = await fetch(`${apiUrl}${endpoint}`, {
    method,
    headers,
    body: fetchBody,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP error! ${res.status}: ${errorText}`);
  }

  return res.json();
}
