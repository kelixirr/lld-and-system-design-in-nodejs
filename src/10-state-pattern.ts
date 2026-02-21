interface IOrderState {
  pay(): void;
  ship(): void;
  cancel(): void;
}

class OrderContext {
  private currentState: IOrderState;

  constructor() {
    this.currentState = new PendingState(this);
  }

  public setState(state: IOrderState): void {
    this.currentState = state;
  }

  public pay(): void {
    this.currentState.pay();
  }

  public ship(): void {
    this.currentState.ship();
  }

  public cancel(): void {
    this.currentState.cancel();
  }
}

class PendingState implements IOrderState {
  private order: OrderContext;

  constructor(order: OrderContext) {
    this.order = order;
    console.log("[State Changed] Order is now PENDING.");
  }

  public pay(): void {
    console.log("Processing payment...");
    this.order.setState(new PaidState(this.order));
  }

  public ship(): void {
    console.log(" Cannot ship a pending order. Payment required.");
  }

  public cancel(): void {
    console.log("Order cancelled safely. No refund needed.");
  }
}

class PaidState implements IOrderState {
  private order: OrderContext;

  constructor(order: OrderContext) {
    this.order = order;
    console.log("[State Changed] Order is now PAID.");
  }

  public pay(): void {
    console.log("Order is already paid.");
  }

  public ship(): void {
    console.log("Boxing items and dispatching to courier...");
    this.order.setState(new ShippedState(this.order));
  }

  public cancel(): void {
    console.log(
      "Order cancelled. Issuing a full refund to the customer's card.",
    );
  }
}

class ShippedState implements IOrderState {
  private order: OrderContext;

  constructor(order: OrderContext) {
    this.order = order;
    console.log("[State Changed] Order is now SHIPPED.");
  }

  public pay(): void {
    console.log(" Order is already paid and shipped.");
  }

  public ship(): void {
    console.log("Order is already on the truck.");
  }

  public cancel(): void {
    console.log(
      "Too late to cancel! The item is already shipped. Customer must initiate a return.",
    );
  }
}


const myOrder = new OrderContext();

myOrder.ship();
myOrder.pay();
myOrder.pay();
myOrder.ship();
myOrder.cancel();
