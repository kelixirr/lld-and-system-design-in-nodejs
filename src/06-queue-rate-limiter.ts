interface IRateLimiter {
  isAllowed(userId: string): boolean;
}

class SlidingWindowRateLimiter implements IRateLimiter {
  private windowSizeInMS: number;
  private maxRequests: number;

  private useRequests: Map<string, number[]>; // we can also use linked list here

  constructor(windowSizeInMs: number, maxRequests: number) {
    this.windowSizeInMS = windowSizeInMs;
    this.maxRequests = maxRequests;
    this.useRequests = new Map<string, number[]>();
  }

  public isAllowed(userId: string): boolean {
    const currentTime = Date.now();

    if (!this.useRequests.has(userId)) {
      this.useRequests.set(userId, []);
    }

    const requestQueue = this.useRequests.get(userId)!;

    while (
      requestQueue.length > 0 &&
      currentTime - requestQueue[0]! > this.windowSizeInMS
    ) {
      requestQueue.shift();
    }

    if (requestQueue.length < this.maxRequests) {
      requestQueue.push(currentTime);
      console.log(`Request from ${userId} processed.`);
      return true;
    } else {
      console.log(`Request from ${userId} denied.`);
      return false;
    }
  }
}

const apiLimiter = new SlidingWindowRateLimiter(5000, 3);
const userId = "124";

for (let i = 0; i <= 5; i++) {
  console.log(`\nAttempt ${i}:`);
  apiLimiter.isAllowed(userId);
}

setTimeout(() => {
  apiLimiter.isAllowed(userId);
}, 6000);
