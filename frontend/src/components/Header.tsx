'use client';

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Header() {
  const { user } = useUser(); // ← ログインユーザー情報が入る！

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white border-b">
      <Link href="/" className="text-xl font-bold text-blue-600">ホーム</Link>
      <nav className="space-x-4 text-sm">
        {user ? (
          <>
            <Link href="/mypage">
              <img src="/user-icon.png" alt="ユーザーアイコン" className="w-8 h-8 rounded-full" />
            </Link>
            <Link href="/api/auth/logout" className="text-blue-600 hover:underline">ログアウト</Link>
          </>
        ) : (
          <>
            <Link href="/api/auth/login" className="text-blue-600 hover:underline">ログイン</Link>
            <span>|</span>
            <Link href="/api/auth/signup" className="text-blue-600 hover:underline">新規登録</Link>
          </>
        )}
      </nav>
    </header>
  );
}
