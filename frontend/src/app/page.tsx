"use client";

import { useEffect, useState } from "react";
import { fetchUsers } from "@/lib/api"; // API関数をインポート

export default function Home() {
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]); // 初期値を空の配列にする
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        console.log("Fetched Data:", data);
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Invalid API response:", data);
          setUsers([]);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("データの取得に失敗しました");
      });
  }, []);

  return (
    <div>
      <h1>ユーザーの一覧</h1>
      {error ? <p style={{ color: "red" }}>{error}</p> : null}
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
