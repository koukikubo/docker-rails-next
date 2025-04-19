// src/components/UserContext.tsx
"use client"; // クライアントコンポーネントとして使用する宣言

import {
  createContext, // Contextオブジェクトを作成するために使用
  useContext, // Contextをコンポーネント内で使用するためのフック
  useState, // 状態管理フック（ユーザー情報を保持）
  useEffect, // 副作用処理（初期マウント時にユーザー情報を取得）
  ReactNode, // 型定義：子要素の型
} from "react";

// ユーザー情報の型を定義（型安全なコードのため）
type User = {
  id: number; // ユーザーID
  name: string; // ユーザー名
  email: string; // メールアドレス
  profile_image_url?: string | null; // プロフィール画像のURL（null可）
};

// Contextの中で使う型（userデータとその更新関数）
type UserContextType = {
  user: User | null; // 現在のユーザー情報
  setUser: (user: User | null) => void; // ユーザー情報を更新する関数
};

// Context本体を作成（初期値はundefined。安全のためエラーチェックと組み合わせる）
const UserContext = createContext<UserContextType | undefined>(undefined);

// ContextのProviderコンポーネント。アプリ全体にユーザー情報を共有する役目
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // 初期状態はnull

  // 初回レンダリング時にログイン中のユーザー情報を取得
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token"); // JWTトークンをローカルストレージから取得
      if (!token) return; // トークンがなければ処理中断（未ログイン）

      try {
        // APIから現在のユーザー情報を取得
        const res = await fetch("http://localhost:3000/api/v1/mypage", {
          headers: {
            Authorization: `Bearer ${token}`, // トークンをAuthorizationヘッダーに付与
          },
          credentials: "include", // クッキーなども含めて送信（セキュリティ対策）
        });

        // 成功時：ユーザーデータをContextに保存（Header等で利用できるようになる）
        if (res.ok) {
          const userData = await res.json(); // JSON形式でレスポンス取得
          setUser(userData); // Contextに保存
        }
      } catch (err) {
        console.error("ユーザー情報の取得に失敗しました", err); // エラーハンドリング
      }
    };

    fetchUser(); // 初期マウント時に1回だけ実行
  }, []);

  // Context全体をアプリに提供（App全体を囲うことでどこでも利用可）
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Contextを使うためのカスタムフック。useUserContext() で user と setUser を取得できる
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUserContext must be used within UserProvider"); // 安全対策：Provider外で使われたらエラーに
  return context;
};
