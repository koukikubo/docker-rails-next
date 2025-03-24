import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My App",
  description: "Next.js with Tailwind sample",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const loggedIn = false; // ログイン状態仮

  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-900 font-sans min-h-screen">
        <header className="flex justify-between items-center px-6 py-4 bg-white border-b">
          <Link href="/" className="text-xl font-bold text-blue-600">ホーム</Link>
          <nav className="space-x-4 text-sm">
            {loggedIn ? (
              <Link href="/mypage">
                <img src="/user-icon.png" alt="ユーザーアイコン" className="w-8 h-8 rounded-full" />
              </Link>
            ) : (
              <>
                <Link href="/signup" className="text-blue-600 hover:underline">新規登録</Link>
                <span>|</span>
                <Link href="/login" className="text-blue-600 hover:underline">ログイン</Link>
              </>
            )}
          </nav>
        </header>

        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
