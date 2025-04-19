"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { useUserContext } from "@/components/UserContext"; // 👈 追加！

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { user } = useUserContext(); // 👈 ここでContextからユーザー情報を取得！

  useEffect(() => {
    const updateLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    updateLoginStatus();
    window.addEventListener("authChanged", updateLoginStatus);
    return () => window.removeEventListener("authChanged", updateLoginStatus);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovering(false);
    }, 300);
  };

  const handleClick = () => {
    setIsClicked((prev) => {
      const newState = !prev;
      if (!newState) setIsHovering(false);
      return newState;
    });
  };

  const isMenuOpen = isHovering || isClicked;

  return (
    <header className="bg-white flex justify-between items-center px-6 py-4 shadow">
      <Link href="/" className="text-xl font-bold text-gray-600">
        ホーム
      </Link>

      <nav className="flex items-center gap-4 text-sm">
        {isLoggedIn ? (
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* 👤 ユーザー画像 */}
            <div
              className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden cursor-pointer"
              onClick={handleClick}
            >
              {user?.profile_image_url ? (
                <img
                  src={user.profile_image_url}
                  alt="プロフィール画像"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600 text-xl">
                  <FaUser />
                </div>
              )}
            </div>

            {/* 🔽 ドロップダウン */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-0 w-40 bg-white border rounded shadow-md z-10 transition-opacity duration-300">
                <Link
                  href="/mypage"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
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
