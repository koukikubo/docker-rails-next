"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [movie, setMovie] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("post[title]", title); // .title → title に修正
    formData.append("post[content]", content);
    formData.append("post[user_id]", "1"); // 👈 一時的なユーザーID

    if (image) formData.append("post[image]", image);
    if (movie) formData.append("post[movie]", movie);

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/posts`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log("Error response:", data); // ❗エラー詳細を表示
      if (response.ok) {
        alert("投稿に成功しました！");
        router.push("/posts");
      } else {
        alert("投稿に失敗しました！");
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
      alert("通信エラーが発生しました");
    }
  };

  return (
    <div>
      <h1>新規投稿</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>タイトル</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>本文</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>画像</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>
        <div>
          <label>動画</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setMovie(e.target.files?.[0] || null)}
          />
        </div>
        <button type="submit">投稿する</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Tailwind 動作チェック
        </button>

      </form>
    </div>
  );
}