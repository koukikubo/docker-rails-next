import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header"; // ファイル名に合わせて調整！

export const metadata: Metadata = {
  title: "My App",
  description: "Next.js with Tailwind sample",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-900 font-sans min-h-screen">
      <Header />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
