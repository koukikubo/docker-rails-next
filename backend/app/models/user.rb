class User < ApplicationRecord
  has_secure_password
  has_many :posts
  has_one_attached :avatar
  has_one_attached :profile_image

end
