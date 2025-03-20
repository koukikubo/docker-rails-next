import Link from "next/link";

export default async function Home() {
  // ここでサーバーサイドのデータをフェッチ（SSR）
  
  return (
    <div>
      <h1>ようこそ！TOPページです！</h1>
      <Link href="/posts/new">投稿一覧を見る</Link>
    </div>
  );
}
