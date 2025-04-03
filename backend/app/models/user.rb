class User < ApplicationRecord
  has_many :posts

  def self.from_token_payload(payload)
    find_or_create_by!(uid: payload['sub'])
  end
  
end
