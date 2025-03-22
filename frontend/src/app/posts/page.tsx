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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts`, {
        cache: "no-store", // キャッシュを無効化
      });
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
    <div>
      <h1>投稿一覧</h1>
      <Link href="/posts/new">投稿</Link>
      <ul>
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              {post.image_url && <img src={post.image_url} alt="画像" width="200" />}
              {post.movie_url && <video src={post.movie_url} controls width="300" />}
            </li>
          ))
        ) : (
          <li>投稿がありません</li>
        )}
      </ul>
    </div>
  );
}
