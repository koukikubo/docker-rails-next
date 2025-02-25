export async function fetchUsers() {
  const response = await fetch("https://docker-rails-next.onrender.com/api/v1/users");
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}
