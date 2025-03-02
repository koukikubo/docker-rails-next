export async function fetchUsers() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const username = process.env.NEXT_PUBLIC_BASIC_AUTH_USER;
  const password = process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD;

  if (!apiUrl || !username || !password) {
    throw new Error("API URL or Basic Auth credentials are missing");
  }

  try {
    const response = await fetch(`${apiUrl}/api/v1/users`, {
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
    }

    return response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
}
