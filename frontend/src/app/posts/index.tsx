"use client";

import { useEffect, useState } from "react";
import { fetchApi } from "../../lib/api"; 
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

  useEffect(() => {
    fetchApi<Post[]>("/api/v1/posts")
      .then((data) => {
        console.log("Fetched Posts:", data);
        setPosts(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div>
      <h1>投稿一覧</h1>
      <ul>
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              {post.image_url && (
                <img src={post.image_url} alt="投稿画像" width="200" />
              )}
              {post.movie_url && (
                <video src={post.movie_url} controls width="300" />
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
