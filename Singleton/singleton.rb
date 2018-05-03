require 'singleton'

class AppConfig
  include Singleton
end

# AppConfig.new

first, second = AppConfig.instance, AppConfig.instance
puts first == second