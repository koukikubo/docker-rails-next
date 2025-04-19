// src/app/layout.tsx
import "./globals.css";
import { Metadata } from "next";
import Header from "../components/Header"; // 👈 作成済みHeaderを読み込み
import { UserProvider } from "../components/UserContext";

export const metadata: Metadata = {
  title: "My App",
  description: "Next.js with Tailwind sample",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen font-sans bg-gray-50">
        <UserProvider>
          <Header />
          <main className="p-6">{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
