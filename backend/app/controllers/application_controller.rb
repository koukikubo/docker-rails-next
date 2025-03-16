class ApplicationController < ActionController::API
  # RailsでAPI用のエラーハンドリング
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from StandardError, with: :render_internal_error

  private

  def render_not_found(e)
    render json: { error: e.message }, status: :not_found
  end

  def render_internal_error(e)
    render json: { error: e.message }, status: :internal_server_error
  end
end
