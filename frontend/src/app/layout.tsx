import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const loggedIn = false; // ここでログイン状態を後ほど動的に管理

  return (
    <html lang="ja">
      <body>
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', borderBottom: '1px solid gray' }}>
          <Link href="/">ホーム</Link>
          <nav>
            {loggedIn ? (
              <Link href="/mypage">
                <img src="/user-icon.png" alt="ユーザーアイコン" width={30} height={30} />
              </Link>
            ) : (
              <>
                <Link href="/signup">新規登録</Link> | <Link href="/login">ログイン</Link>
              </>
            )}
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
