class Api::V1::UsersController < ApplicationController
  skip_before_action :authorize_request, only: [:create]
  include Rails.application.routes.url_helpers

  def index
    users = User.all
    render json: users
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: { user: user }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def mypage
    user = current_user
    Rails.logger.debug "👤 current_user: #{user.inspect}"
  
    if user
      render json: {
        id: user.id,
        name: user.name,
        email: user.email,
        profile_image_url: user.profile_image.attached? ? url_for(user.profile_image) : nil
      }, status: :ok
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
  # app/controllers/api/v1/users_controller.rb

  def update
    if current_user.update(profile_image: params[:profile_image])
      render json: { profile_image_url: url_for(current_user.profile_image) }, status: :ok
    else
      render json: { error: "画像の更新に失敗しました" }, status: :unprocessable_entity
    end
  end
  

  private

  def user_params
    params.permit(:name, :email, :password)
  end

  def current_user
    @current_user ||= User.find(@decoded[:user_id]) if @decoded
  end
end

