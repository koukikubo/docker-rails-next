class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Basic::ControllerMethods

  # before_action :basic_auth  # これを追加

  private

  def basic_auth
    Rails.logger.info "BASIC_AUTH_USER: #{ENV['BASIC_AUTH_USER']}"
    Rails.logger.info "BASIC_AUTH_PASSWORD: #{ENV['BASIC_AUTH_PASSWORD']}"
    authenticate_or_request_with_http_basic do |username, password|
      username == ENV["BASIC_AUTH_USER"] && password == ENV["BASIC_AUTH_PASSWORD"]
    end
  end
  
end
