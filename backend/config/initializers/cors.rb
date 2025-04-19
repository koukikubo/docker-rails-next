Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:8000'  # ← Next.js 側のポートを明示的に

    resource "*",
      headers: :any,
      expose: ["Authorization"],
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true  # ← これがないと cookie や Authorization を含む fetch に失敗
  end
end
