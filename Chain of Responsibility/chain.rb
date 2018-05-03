class Transaction
  attr_reader :amount, :currency

  def initialize(amount, currency)
    @amount = amount
    @currency = currency
  end
end

class BaseHandler
  attr_reader :successor

  def initialize(successor = nil)
    @successor = successor
  end

  def call(transaction)
    return successor.call(transaction) unless can_handle?(transaction)

    handle(transaction)
  end

  def handle(_transaction)
    raise NotImplementedError, 'Each handler should respond to handle and can_handle? methods'
  end
end

class GatewayA < BaseHandler

  private

  def handle(transaction)
    puts "handling the transaction with GatewayA"
  end


  def can_handle?(transaction)
    transaction.amount < 100 && transaction.currency == 'USD'
  end
end

class GatewayB < BaseHandler

  private

  def handle(transaction)
    puts "handling the transaction with GatewayB"
  end

  def can_handle?(transaction)
    transaction.amount >= 100
  end
end

transaction = Transaction.new(50, 'USD')

chain = GatewayA.new(GatewayB.new)
chain.call(transaction)

transaction = Transaction.new(200, 'USD');
chain.call(transaction);