"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);  // 取得したデータを `users` に保存
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>ユーザーの一覧</h1>
      <ul>
        {users.map((user: { id: number; name: string }) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
