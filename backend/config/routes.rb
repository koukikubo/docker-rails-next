Rails.application.routes.draw do
  Rails.application.routes.draw do
    namespace :api do
      namespace :v1 do
        resources :users, only: [:index]  # 例として users#index のエンドポイントを用意
      end
    end
  end
  
end
