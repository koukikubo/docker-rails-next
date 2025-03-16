"use client";

import { useEffect, useState } from "react";
import { fetchApi } from "../lib/api"; // 統一OK！

export default function Home() {
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
    fetchApi<{ id: number; name: string }[]>("/api/v1/users")
      .then((data) => {
        console.log("Fetched Data:", data);
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Invalid API response:", data);
          setUsers([]);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div>
      <h1>ユーザーの一覧</h1>
      <ul>
        {users.length > 0 ? (
          users.map((user) => <li key={user.id}>{user.name}</li>)
        ) : (
          <li>データがありません</li>
        )}
      </ul>
    </div>
  );
}



