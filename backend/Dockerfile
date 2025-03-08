# syntax = docker/dockerfile:1
# RUBY_VERSION は .ruby-version や Gemfile の Ruby バージョンと一致させる
ARG RUBY_VERSION=3.2.2

FROM registry.docker.com/library/ruby:$RUBY_VERSION-slim as base
# 作業ディレクトリを /rails に設定
WORKDIR /rails
# 環境変数の設定
ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="0" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="" \
    PORT=3000

# **ここからビルド用のステージ**
FROM base as build
# 必要なパッケージをインストール
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential git libpq-dev libvips pkg-config
# Gemfile をコピーし、Gem をインストール
COPY Gemfile Gemfile.lock ./
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git
# アプリケーションコードをコピー
COPY . .
# **ここから本番用の最終ステージ**
FROM base
# 本番環境に必要なパッケージをインストール
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl libvips postgresql-client && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives
# ビルド済みのファイルをコピー
COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /rails /rails
# 非 root ユーザーを作成して権限を設定（セキュリティ向上）
RUN useradd rails --create-home --shell /bin/bash && \
    chown -R rails:rails db log storage tmp
USER rails:rails
# Rails のデフォルトポート 3000 を公開
EXPOSE 3000
# DB 初期化スクリプトを実行
ENTRYPOINT ["/rails/bin/docker-entrypoint"]
# Rails サーバーを起動
CMD ["bundle", "exec", "rails", "s", "-p", "3000", "-b", "0.0.0.0"]


