Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :posts
      resources :users, only: [:index, :update, :edit, :destroy] # 作成以外のアクション
      get 'mypage', to: 'users#mypage'
      patch 'users/profile_image', to: 'users#update_profile_image'

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
