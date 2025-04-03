# backend/app/services/authorization_service.rb

class AuthorizationService
  def initialize(headers = {})
    @headers = headers
  end

  def current_user
    @auth_payload, _ = verify_token
    @user = User.from_token_payload(@auth_payload)
  end

  private

  def http_token
    if @headers['Authorization'].present?
      @headers['Authorization'].split(' ').last
    end
  end

  def verify_token
    JsonWebToken.verify(http_token)
  end
end
