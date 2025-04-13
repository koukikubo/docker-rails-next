# JWTトークンの発行・検証に使用するクラス
class JsonWebToken
  # 秘密鍵（トークンを発行・検証する際に使用）
  SECRET_KEY = ENV['SECRET_KEY_BASE'] || Rails.application.secrets.secret_key_base.to_s

  # JWTの発行（ログイン成功時に使う）
  def self.encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i  # トークンの有効期限を設定
    JWT.encode(payload, SECRET_KEY)  # エンコードして返す
  end

  # JWTのデコード（トークンの正当性確認用）
  def self.decode(token)
    decoded = JWT.decode(token, SECRET_KEY)[0]  # デコードしてpayload部分を取得
    HashWithIndifferentAccess.new(decoded)  # シンボルでも文字列でもアクセスできるように変換
  rescue
    nil  # 失敗したらnilを返す
  end
end
