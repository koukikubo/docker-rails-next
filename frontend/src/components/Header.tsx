"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // ← ドロップダウン表示状態

  useEffect(() => {
    const updateLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    updateLoginStatus();
    window.addEventListener("authChanged", updateLoginStatus);

    return () => {
      window.removeEventListener("authChanged", updateLoginStatus);
    };
  }, []);

  return (
    <header className="bg-white flex justify-between items-center px-6 py-4 shadow">
      <Link href="/" className="text-xl font-bold text-gray-600">
        ホーム
      </Link>

      <nav className="flex items-center gap-4 text-sm">
        {isLoggedIn ? (
          // 👉 ホバー領域全体で検出（メニューが消えにくくなる）
          <div
            className="relative"
            onMouseEnter={() => setIsMenuOpen(true)}
            onMouseLeave={() => setIsMenuOpen(false)}
          >
            {/* 👤 ユーザーアイコン */}
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
              <span className="text-gray-600 text-xl">
                <FaUser />
              </span>            
            </div>

            {/* 🔽 ドロップダウンメニュー */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-0 w-40 bg-white border rounded shadow-md z-10">
                <Link href="/mypage" className="block px-4 py-2 hover:bg-gray-100">
                  マイページ
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.dispatchEvent(new Event("authChanged"));
                    window.location.href = "/";
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  ログアウト
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/auth/signup" className="hover:underline text-blue-600">
              新規登録
            </Link>
            <Link href="/auth/login" className="hover:underline text-blue-600">
              ログイン
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
