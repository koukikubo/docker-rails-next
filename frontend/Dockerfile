# ベースイメージとして軽量な Node.js Alpine を使用
FROM node:18-alpine

# 作業ディレクトリを /next に設定
WORKDIR /next-app

# 依存関係のキャッシュを利用するため package.json と yarn.lock をコピー
COPY package.json yarn.lock ./

# 依存関係のインストール（開発環境）
RUN yarn install --frozen-lockfile

# アプリケーションのコードをコピー
COPY . .

# Next.js のデフォルトポート 3000 を公開
EXPOSE 3000

# Next.js の開発環境を起動（本番なら `yarn build && yarn start`）
CMD ["yarn", "dev"]
