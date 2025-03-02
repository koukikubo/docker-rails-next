Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "https://docker-rails-next.vercel.app", "http://localhost:8000", 

    resource "*",
      headers: :any,
      expose: ["Authorization"],
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
