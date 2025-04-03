require 'net/http'
require 'uri'
require 'openssl'
require 'json'

class ApplicationController < ActionController::API
  before_action :authorize_request

  private

  def authorize_request
    header = request.headers['Authorization']
    token = header.split(' ').last if header

    # Auth0の公開鍵を取得
    jwks = fetch_jwks
    decoded_token = decode_token(token, jwks)

    @current_user = User.find_by(uid: decoded_token['sub']) # ← uidでOK（Auth0のサブジェクト）
  rescue => e
    Rails.logger.error "[Auth Error] #{e.message}"
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end

  def fetch_jwks
    jwks_uri = URI("#{ENV['AUTH0_ISSUER_BASE_URL']}/.well-known/jwks.json")
    response = Net::HTTP.get(jwks_uri)
    JSON.parse(response)
  end
  

  def decode_token(token, jwks)
    jwks_keys = jwks['keys']
    jwk_data = jwks_keys.first

    cert_text = Base64.decode64(jwk_data['x5c'].first)
    certificate = OpenSSL::X509::Certificate.new(cert_text)
    public_key = certificate.public_key

    decoded_token, = JWT.decode(token, public_key, true, {
      algorithm: 'RS256',
      iss: ENV['AUTH0_ISSUER_BASE_URL'],
      verify_iss: true,
      aud: ENV['NEXT_PUBLIC_AUTH0_AUDIENCE'],
      verify_aud: true
    })

    decoded_token
  end
end
