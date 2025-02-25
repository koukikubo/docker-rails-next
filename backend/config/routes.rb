Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index]
    end
  end

  # ルートをAPIのドキュメントやヘルスチェック用に設定
  root to: proc { [200, { 'Content-Type' => 'text/plain' }, ['Rails API is running']] }
end
