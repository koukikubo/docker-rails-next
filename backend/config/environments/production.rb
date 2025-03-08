require "active_support/core_ext/integer/time"

Rails.application.configure do
  config.enable_reloading = false
  config.eager_load = true
  config.consider_all_requests_local = false
  config.active_storage.service = :local
  config.force_ssl = true # SSLが必要かどうか確認

  config.logger = ActiveSupport::Logger.new(STDOUT)
    .tap  { |logger| logger.formatter = ::Logger::Formatter.new }
    .then { |logger| ActiveSupport::TaggedLogging.new(logger) }

  config.log_tags = [ :request_id ]

  # デバッグ用に一時的に変更
  config.log_level = :debug 

  config.action_mailer.perform_caching = false
  config.i18n.fallbacks = true
  config.active_support.report_deprecations = false
  config.active_record.dump_schema_after_migration = false

  # # Renderのホスト許可
  # config.hosts << /\Adocker-rails-next\.onrender\.com(?::\d+)?\z/
  # 全てのホストを一時的に許可（必要なら）
  # config.hosts.clear
  # config.host_authorization = { exclude: ->(request) { request.path == "/up" } }
  allowed_host = ENV.fetch("RENDER_EXTERNAL_HOSTNAME", "docker-rails-next.onrender.com")
  config.hosts << allowed_host
end
