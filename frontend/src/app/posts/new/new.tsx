"use client";

import { useState } from "react";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [movie, setMovie] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("post[title]", title);
    formData.append("post[content]", content);
    if (image) formData.append("post[image]", image);
    if (movie) formData.append("post[movie]", movie);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("投稿に成功しました！");
      // 必要なら遷移: 例）トップページに戻る
      // router.push("/");
    } else {
      alert("投稿に失敗しました");
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
      </form>
    </div>
  );
}