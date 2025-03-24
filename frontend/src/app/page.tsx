import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">ようこそ！TOPページです！</h1>
      <Link
        href="/posts"
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        投稿一覧を見る
      </Link>
    </div>
  );
}
