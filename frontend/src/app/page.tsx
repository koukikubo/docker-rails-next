"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]); // 初期値を空の配列にする

  useEffect(() => {
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`, {
      headers: {
        Authorization: `Basic ${btoa(`${process.env.NEXT_PUBLIC_BASIC_AUTH_USER}:${process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD}`)}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Data:", data);
        if (Array.isArray(data)) {
          setUsers(data); // 配列ならセット
        } else {
          console.error("Invalid API response:", data);
          setUsers([]); // 無効なデータが来た場合は空配列をセット
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
