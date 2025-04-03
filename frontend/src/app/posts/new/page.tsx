"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function NewPostPage() {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [token, setToken] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [movie, setMovie] = useState<File | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/auth/session", {
          credentials: "include", // セッションクッキー送信に必要
        });
        const json = await res.json();
        console.log("[DEBUG] セッションレスポンス:", json);

        if (json?.accessToken) {
          setToken(json.accessToken);
          console.log("[DEBUG] Access Token:", json.accessToken);
        } else {
          console.warn("[DEBUG] session.accessToken が存在しません");
        }
      } catch (err) {
        console.error("アクセストークン取得失敗:", err);
      }
    };

    fetchToken();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("post[title]", title);
    formData.append("post[content]", content);
    if (image) formData.append("post[image]", image);
    if (movie) formData.append("post[movie]", movie);

    try {
      const res = await fetch("http://localhost:3000/api/v1/posts", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        router.push("/posts");
      } else {
        const errorData = await res.json();
        alert("投稿に失敗しました：" + JSON.stringify(errorData));
      }
    } catch (err) {
      console.error("通信エラー:", err);
    }
  };

  if (isLoading) return <p>読み込み中...</p>;
  if (!user) return <p>ログインが必要です</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">新規投稿</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="タイトル"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded px-3 py-2 h-32"
          placeholder="本文"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setMovie(e.target.files?.[0] || null)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          投稿する
        </button>
      </form>
    </div>
  );
}
