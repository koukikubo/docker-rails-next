"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
  
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Data:", data);
        setUsers(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  console.log("Current Users State:", users);

  return (
    <div>
      <h1>ユーザーの一覧</h1>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
