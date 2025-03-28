"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function NewPostPage() {
  const { user } = useUser(); // 👈 ここで定義
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [movie, setMovie] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("post[title]", title);
    formData.append("post[content]", content);    
    formData.append("post[uid]", user?.sub || ""); // handleSubmit のときに uid を付与

    if (image) formData.append("post[image]", image);
    if (movie) formData.append("post[movie]", movie);

    const res = await fetch(`http://localhost:3000/api/v1/posts`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      router.push("/posts");
    } else {
      alert("投稿に失敗しました");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">新規投稿</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold mb-1">タイトル</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">本文</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded px-3 py-2 h-32 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">画像</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="file:border file:rounded file:px-3 file:py-1 file:bg-blue-600 file:text-white file:cursor-pointer"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">動画</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setMovie(e.target.files?.[0] || null)}
            className="file:border file:rounded file:px-3 file:py-1 file:bg-blue-600 file:text-white file:cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          投稿する
        </button>
      </form>
    </div>
  );
}
