# ベースイメージ
FROM node:18-alpine

# 作業ディレクトリの設定
WORKDIR /next

# package.json と yarn.lock をコピー
COPY package.json yarn.lock ./

# 依存関係をインストール
RUN yarn install --frozen-lockfile

# 残りのソースコードをコピー
COPY . .

# Next.js の開発環境での実行
EXPOSE 3000
CMD ["yarn", "dev", "-p", "3000"]
