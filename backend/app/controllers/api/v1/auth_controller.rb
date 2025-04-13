class Api::V1::AuthController < ApplicationController
  skip_before_action :authorize_request, only: [:login, :signup]

  def login
    # メールアドレスでユーザーを検索
    user = User.find_by(email: params[:email])

    # パスワードが一致しているか確認
    if user&.authenticate(params[:password])
      # トークンを発行
      token = JsonWebToken.encode(user_id: user.id)

      # 成功レスポンス
      render json: { token: token, user: user }, status: :ok
    else
      # ログイン失敗
      render json: { errors: "メールアドレスまたはパスワードが間違っています" }, status: :unauthorized
    end
  end

  def signup
    user = User.new(user_params)
  
    if user.save
      render json: { message: "ユーザー登録に成功しました" }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  private
  
  def user_params
    params.require(:auth).permit(:name, :email, :password)
  end
  
end
