require 'net/http'
require 'uri'
require 'json'
require 'jwt'
require 'openssl'
require 'base64'

class JsonWebToken
  def self.verify(token)
    JWT.decode(token, nil,
      true, # Verify the signature
      {
        algorithms: 'RS256',
        iss: ENV['AUTH0_ISSUER_BASE_URL'],
        verify_iss: true,
        aud: ENV['NEXT_PUBLIC_AUTH0_AUDIENCE'],
        verify_aud: true
      }
    ) do |header|
      jwks_hash[header['kid']]
    end
  end

  def self.jwks_hash
    jwks_raw = Net::HTTP.get URI("#{ENV['AUTH0_ISSUER_BASE_URL']}/.well-known/jwks.json")
    jwks_keys = JSON.parse(jwks_raw)['keys']
    Hash[
      jwks_keys.map do |k|
        [
          k['kid'],
          OpenSSL::X509::Certificate.new(Base64.decode64(k['x5c'].first)).public_key
        ]
      end
    ]
  end
end
