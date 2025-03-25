"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState<File | null>(null);
  const [movieURL, setMovieURL] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [movie, setMovie] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [removeMovie, setRemoveMovie] = useState(false);


  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`http://localhost:3000/api/v1/posts/${id}`);
      const data = await res.json();
      setTitle(data.title || "");
      setContent(data.content || "");
      setImageURL(data.image_url || null);
      setMovieURL(data.movie_url || null);

      // image_url, movie_urlはあくまで表示用。アップロードはFileで再選択が必要
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("post[title]", title);
    formData.append("post[content]", content);
    formData.append("post[remove_image]", String(removeImage));
    formData.append("post[remove_movie]", String(removeMovie));
    if (image) formData.append("post[image]", image);
    if (movie) formData.append("post[movie]", movie);

    const res = await fetch(`http://localhost:3000/api/v1/posts/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      router.push(`/posts/`);
    } else {
      alert("更新に失敗しました");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">投稿を編集</h1>

      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label className="block font-semibold mb-1">タイトル</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">本文</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded px-3 py-2 h-32"
            required
          />
        </div>

        {imageURL && (
          <div>
            <label className="block font-semibold mb-1">現在の画像</label>
            <img src={imageURL} alt="現在の画像" className="mb-4 max-w-xs rounded" />
          </div>
        )}
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="file:border file:rounded file:px-3 file:py-1 file:bg-blue-600 file:text-white file:cursor-pointer"
          />
        </div>

        {imageURL && (
          <div>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={removeImage}
                onChange={(e) => setRemoveImage(e.target.checked)}
              />
              <span>画像を削除</span>
            </label>
          </div>
        )}

        {movieURL && (
          <div>
            <video src={movieURL} controls className="w-full max-w-md rounded mb-4" />
          </div>
        )}
        <div>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setMovie(e.target.files?.[0] || null)}
            className="file:border file:rounded file:px-3 file:py-1 file:bg-blue-600 file:text-white file:cursor-pointer"
          />
        </div>

        {movieURL && (
          <div>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={removeMovie}
                onChange={(e) => setRemoveMovie(e.target.checked)}
              />
              <span>動画を削除</span>
            </label>
          </div>
        )}
        
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
          更新する
        </button>
      </form>
    </div>
  );
}
