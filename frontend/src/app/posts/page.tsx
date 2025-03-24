"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  content: string;
  image_url: string | null;
  movie_url: string | null;
  user_id: number;
  created_at: string;
};

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts`);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">投稿一覧</h1>
        <Link
          href="/posts/new"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          新規投稿
        </Link>
      </div>

      <ul className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id} className="border rounded p-4 bg-white shadow-sm">
              <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
              <p className="mb-2">{post.content}</p>
              {post.image_url && (
                <img src={post.image_url} alt="画像" className="mb-2 max-w-xs rounded" />
              )}
              {post.movie_url && (
                <video src={post.movie_url} controls className="w-full max-w-md rounded" />
              )}
            </li>
          ))
        ) : (
          <li>投稿がありません</li>
        )}
      </ul>
    </div>
  );
}
