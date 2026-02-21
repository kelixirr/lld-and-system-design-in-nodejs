
// Facade Pattern For Microservices 

class AuthService {
  public verifyToken(token: string): boolean {
    console.log("[Auth Service] Verifying user token...");
    return token === "valid_token_123";
  }
}

class InventoryService {
  public checkStock(itemId: string): boolean {
    console.log(`[Inventory Service] Checking stock for item: ${itemId}...`);
    return true;
  }
}

class PaymentService {
  public chargeCard(amount: number): boolean {
    console.log(`[Payment Service] Processing charge for $${amount}...`);
    return true;
  }
}

class ShippingService {
  public dispatchOrder(itemId: string): string {
    console.log(`[Shipping Service] Generating tracking number...`);
    return `TRACK_${Math.floor(Math.random() * 999999)}`;
  }
}

class OrderProcessorFacade {
  private auth: AuthService;
  private inventory: InventoryService;
  private payment: PaymentService;
  private shipping: ShippingService;

  constructor() {
    this.auth = new AuthService();
    this.inventory = new InventoryService();
    this.payment = new PaymentService();
    this.shipping = new ShippingService();
  }

  public async placeOrder(
    userToken: string,
    itemId: string,
    amount: number,
  ): Promise<string> {
    if (!this.auth.verifyToken(userToken)) {
      return "ERROR: Unauthorized access.";
    }

    if (!this.inventory.checkStock(itemId)) {
      return "ERROR: Item out of stock.";
    }

    if (!this.payment.chargeCard(amount)) {
      return "ERROR: Payment failed.";
    }

    const trackingNum = this.shipping.dispatchOrder(itemId);

    return `SUCCESS! Your tracking number is: ${trackingNum}`;
  }
}

const apiGateway = new OrderProcessorFacade();

async function runClientRequest() {
  console.log(
    "[Frontend] User clicked 'Place Order'. Sending single request...",
  );

  const response = await apiGateway.placeOrder(
    "valid_token_123",
    "Macbook_PRO",
    1200.0,
  );

  console.log(`[Frontend] Response received: ${response}`);
}

runClientRequest();


