"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { useUserContext } from "@/components/UserContext"; // ← ここが重要！

type User = {
  id: number;
  name: string;
  email: string;
  profile_image_url?: string | null;
};

type Post = {
  id: number;
  title: string;
};

export default function MyPage() {
  const { user, setUser } = useUserContext(); // ← useStateではなくContextから！
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      console.log("🔑 トークン確認:", token);

      if (!token) {
        console.warn("⚠️ トークンがありません。ログインページに遷移します");
        router.push("/auth/login");
        return;
      }

      try {
        // 🔹 ユーザー情報取得（GET /api/v1/me）
        const userRes = await fetch("http://localhost:3000/api/v1/mypage", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include", // ← これが必要（fetch がクッキーやヘッダー付きで送信）
        });

        const userData: User = await userRes.json();

        if (!userData || !userData.id) {
          console.error("❌ ユーザーIDが無効:", userData);
          router.push("/auth/login");
          return;
        }

        setUser(userData);

        // 🔹 投稿一覧取得
        const postRes = await fetch(
          `http://localhost:3000/api/v1/posts?user_id=${userData.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!postRes.ok) {
          console.error("❌ 投稿取得失敗（ステータス）:", postRes.status);
          return;
        }

        const postsData: Post[] = await postRes.json();
        setPosts(postsData);
      } catch (error) {
        console.error("❌ データ取得エラー:", error);
      }
    };

    fetchData();
  }, []);
  //
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append("profile_image", file);

    const res = await fetch(
      "http://localhost:3000/api/v1/users/profile_image",
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (res.ok) {
      const updatedUser = await res.json();

      // user を使って明示的にオブジェクトを構築
      if (user) {
        setUser({
          ...user,
          profile_image_url: updatedUser.profile_image_url,
        });
      }
    }
  };
  if (!user) return <div>読み込み中...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">マイページ</h1>

      {/* 🔹 ユーザー情報 */}
      <div className="mb-6 border-b pb-4">
        <div className="flex items-center gap-4">
          <label
            htmlFor="profile-image-upload"
            className="cursor-pointer relative"
          >
            {user.profile_image_url ? (
              <img
                src={user.profile_image_url}
                alt="プロフィール画像"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                <FaUser />
              </div>
            )}
            {/* 非表示のファイル入力 */}
            <input
              id="profile-image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>

      {/* 🔹 投稿一覧 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">自分の投稿</h2>
        <ul className="list-disc list-inside space-y-2">
          {posts.map((post) => (
            <li key={post.id}>
              <a
                href={`/posts/${post.id}`}
                className="text-blue-600 hover:underline"
              >
                {post.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* 🔹 アクションリンク */}
      <div className="space-y-2">
        <button
          onClick={() => router.push("/auth/edit")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          アカウント情報を編集
        </button>
        <button
          onClick={() => router.push("/auth/password")}
          className="bg-yellow-500 text-white px-4 py-2 rounded ml-4"
        >
          パスワード変更
        </button>
        <button
          onClick={() => router.push("/auth/delete")}
          className="bg-red-600 text-white px-4 py-2 rounded ml-4"
        >
          アカウント削除
        </button>
      </div>
    </div>
  );
}
