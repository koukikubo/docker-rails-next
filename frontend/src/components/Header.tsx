'use client';

import { PiUserCircleFill } from "react-icons/pi";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Header() {
  const { user, isLoading } = useUser();

  // ✅ user が未定義の間は何も描画しない（またはローディング）
  if (isLoading) return null;

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white border-b">
      <Link href="/" className="text-xl font-bold text-blue-600">ホーム</Link>

      <nav className="flex items-center space-x-4 text-sm">
        {user ? (
          <>
            <Link href="/mypage">
              {user?.picture ? (
                <img
                  src={user.picture}
                  alt="ユーザーアイコン"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <PiUserCircleFill className="w-8 h-8 text-blue-600" />
              )}
            </Link>
            <Link href="/api/auth/logout" className="text-blue-600 hover:underline">
              ログアウト
            </Link>
          </>
        ) : (
          <>
            <Link href="/api/auth/login" className="text-blue-600 hover:underline">ログイン</Link>
            <span>|</span>
            <Link href="/api/auth/login?screen_hint=signup" className="text-blue-600 hover:underline">
              新規登録
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
