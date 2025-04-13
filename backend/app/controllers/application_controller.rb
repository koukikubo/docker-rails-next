class ApplicationController < ActionController::API
  before_action :authorize_request
  # 👉 データが見つからないとき（例：存在しないIDのユーザーを探した場合）
  # 代わりに render_not_found というメソッドを呼び出して、エラーメッセージを返す
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  # 👉 その他、予期していないエラー（例：タイプミスなど）が起きたとき
  # render_internal_error メソッドで対応する
  rescue_from StandardError, with: :render_internal_error
    # ----------------------------------
  # ✅ トークンを使って「ログイン中のユーザーかどうか」をチェックする
  # ----------------------------------
  # 認証トークンの検証と、@current_user の特定
  def authorize_request
    header = request.headers['Authorization']
    Rails.logger.debug "🌟 Authorization Header: #{header}"  # ← ヘッダー確認
    header = header.split(' ').last if header
  
    begin
      decoded = JsonWebToken.decode(header)
      Rails.logger.debug "🌟 Decoded Token: #{decoded}"  # ← デコード確認
      @current_user = User.find(decoded[:user_id])
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: "ユーザーが見つからないよ" }, status: :unauthorized
    rescue JWT::DecodeError => e
      render json: { errors: "トークンが無効です" }, status: :unauthorized
    rescue => e
      render json: { errors: "認証エラー: #{e.message}" }, status: :unauthorized
    end
  end
  
  # ============================
  # 🔐 認証の共通処理
  # ============================
  # 👉 すべてのAPIの実行前に「ログインしているか？」を確認する
  # 認証が不要な画面（例：ログインや新規登録）はあとで除外できます
  private
  # ----------------------------------
  # ❌ レコード（データ）が見つからなかった時のエラーレスポンス
  # ----------------------------------
  def render_not_found(e)
    # JSON形式でエラーメッセージを返す（HTTPステータスコード：404 Not Found）
    render json: { error: e.message }, status: :not_found
  end

  # ----------------------------------
  # ❌ 予期しないエラーが起きた時のレスポンス
  # ----------------------------------
  def render_internal_error(e)
    # JSON形式でエラーメッセージを返す（HTTPステータスコード：500 Server Error）
    render json: { error: e.message }, status: :internal_server_error
  end
end
