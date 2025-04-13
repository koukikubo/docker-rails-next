Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :posts
      resources :users, only: [:index, :update, :edit, :destroy] # 作成以外のアクション

      resources :auth, only: [] do
        collection do
          post :signup
          post :login
        end
      end      
    end

    namespace :admin do
      resources :users

    end
  end

  # ルートをAPIのドキュメントやヘルスチェック用に設定
  root to: proc { [200, { 'Content-Type' => 'text/plain' }, ['Rails API is running']] }
end
