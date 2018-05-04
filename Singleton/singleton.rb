require 'singleton'

class AppConfig
  include Singleton

  def initialize
    puts "creating new"
  end
end

# AppConfig.new

first, second = AppConfig.instance, AppConfig.instance
puts first == second