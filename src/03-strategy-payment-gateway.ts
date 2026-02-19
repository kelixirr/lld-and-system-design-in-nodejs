// Strategy Pattern

interface IPaymentStrategy {
  pay(amount: number): void;
}

class CreditCardPayment implements IPaymentStrategy {
  private cardNumber: string;

  constructor(cardNumber: string) {
    this.cardNumber = cardNumber;
  }

  public pay(amount: number): void {
    console.log(
      `Processing $${amount} via Credit Card ending in ${this.cardNumber.slice(-4)}`,
    );
  }
}

class PayPalPayment implements IPaymentStrategy {
  private emailAddress: string;

  constructor(emailAddress: string) {
    this.emailAddress = emailAddress;
  }

  public pay(amount: number): void {
    console.log(
      `Processing $${amount} via PayPal account: ${this.emailAddress}`,
    );
  }
}

class CryptoPayment implements IPaymentStrategy {
  private walletAddress: string;

  constructor(walletAddress: string) {
    this.walletAddress = walletAddress;
  }

  public pay(amount: number): void {
    console.log(
      `Processing $${amount} via Crypto Wallet: ${this.walletAddress}`,
    );
  }
}

class CheckoutProcessor {
  private paymentStrategy: IPaymentStrategy;

  constructor(strategy: IPaymentStrategy) {
    this.paymentStrategy = strategy;
  }

  public setPaymentStrategy(strategy: IPaymentStrategy): void {
    this.paymentStrategy = strategy;
    console.log("--> Payment strategy updated.");
  }
  public processOrder(amount: number): void {
    console.log("Starting checkout process...");
    this.paymentStrategy.pay(amount);
    console.log("Checkout complete!\n");
  }
}

const creditCardMethod = new CreditCardPayment("4111222233334444");
const checkout = new CheckoutProcessor(creditCardMethod);

checkout.processOrder(150.0);

const paypalMethod = new PayPalPayment("user@exaple.com");
checkout.setPaymentStrategy(paypalMethod);

checkout.processOrder(45.5);
