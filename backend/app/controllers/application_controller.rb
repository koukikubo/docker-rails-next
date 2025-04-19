class ApplicationController < ActionController::API
  before_action :authorize_request

  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from StandardError, with: :render_internal_error

  def authorize_request
    header = request.headers['Authorization']
    Rails.logger.debug "🌟 Authorization Header: #{header}"
    header = header.split(' ').last if header

    if header.nil?
      render json: { errors: "トークンがありません" }, status: :unauthorized and return
    end

    begin
      decoded = JsonWebToken.decode(header)
      Rails.logger.debug "🌟 Decoded Token: #{decoded}"
      @decoded = decoded
      @current_user = User.find(@decoded[:user_id])
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: "ユーザーが見つからないよ" }, status: :unauthorized
    rescue JWT::DecodeError => e
      render json: { errors: "トークンが無効です" }, status: :unauthorized
    rescue => e
      render json: { errors: "認証エラー: #{e.message}" }, status: :unauthorized
    end
  end

  def render_not_found(e)
    render json: { error: e.message }, status: :not_found
  end

  def render_internal_error(e)
    render json: { error: e.message }, status: :internal_server_error
  end
end
