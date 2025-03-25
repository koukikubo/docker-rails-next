// src/app/posts/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

type Post = {
  id: number;
  title: string;
  content: string;
  image_url: string | null;
  movie_url: string | null;
};

export default function PostDetail({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`http://localhost:3000/api/v1/posts/${params.id}`);
      const data = await res.json();
      setPost(data);
    };
    fetchPost();
  }, [params.id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("本当に削除しますか？");
    if (!confirmDelete) return;

    const res = await fetch(`http://localhost:3000/api/v1/posts/${params.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/posts");
    } else {
      alert("削除に失敗しました");
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="mb-4">{post.content}</p>
      {post.image_url && <img src={post.image_url} alt="画像" className="mb-4 rounded" />}
      {post.movie_url && (
        <video src={post.movie_url} controls className="w-full max-w-md rounded mb-4" />
      )}
      <div className="space-x-2">
        <button
          onClick={() => router.push(`/posts/${post.id}/edit`)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          編集
        </button>
        <Button variant="danger" onClick={handleDelete}>
          削除する
        </Button>
      </div>
    </div>
  );
}
