export async function fetchUsers() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("API URL is missing");
  }

  try {
    const response = await fetch(`${apiUrl}/api/v1/users`);

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
