"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://docker-rails-next.onrender.com/api/v1/users") // Rails API のエンドポイント
      .then((res) => res.json())
      .then((data) => {
        console.log("取得したデータ:", data);
        setUsers(data);
      })
      .catch((err) => console.error("エラー:", err));
  }, []);

  return (
    <div>
      <h1>ユーザー一覧</h1>
      <ul>
        {users.map((user: { id: number; name: string }) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
