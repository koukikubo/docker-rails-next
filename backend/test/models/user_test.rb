require "test_helper"

class UserTest < ActiveSupport::TestCase
  belongs_to :user

  has_one_attached :image  # Active Storage 画像
  has_one_attached :movie  # Active Storage 動画

  validates :title, presence: true
  validates :content, presence: true
end
