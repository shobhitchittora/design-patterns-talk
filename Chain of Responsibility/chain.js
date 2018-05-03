class Transaction {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }
}

class BaseHandler {
  constructor(next = null) {
    this.next = next;
  }

  call(transaction) {
    if (this.canHandle(transaction)) {
      return this.handle(transaction)
    }

    if (this.next) {
      return this.next.call(transaction);
    }
    return 'Failed';
  }
}

class GatewayA extends BaseHandler {
  constructor(next) {
    super(next);
  }

  handle(transaction) {
    return 'handling on GatewayA ';
  }

  canHandle(transaction) {
    return transaction.amount < 100;
  }
}

class GatewayB extends BaseHandler {
  constructor(next) {
    super(next);
  }

  handle(transaction) {
    return 'handling on GatewayB ';
  }

  canHandle(transaction) {
    return transaction.amount < 200;
  }
}

let transaction = new Transaction(100, 'INR');
chain = new GatewayA(new GatewayB());
console.log(
  chain.call(transaction)
);

