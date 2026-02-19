
// Singleton Pattern 

interface ICache<T> {
  set(key: string, value: T): void;
  get(key: string): T | undefined;
  has(key: string): boolean;
  clear(): void;
}

class InMemoryCache<T> implements ICache<T> {
  private static instance: InMemoryCache<any>;
  private cache: Map<string, T>;

  private constructor() {
    this.cache = new Map<string, T>();
    console.log("Cache initialized in memory");
  }

  public static getInstance<T>(): InMemoryCache<T> {
    if (!InMemoryCache.instance) {
      InMemoryCache.instance = new InMemoryCache<T>();
    }
    return InMemoryCache.instance;
  }

  public set(key: string, value: T): void {
    this.cache.set(key, value);
  }

  public get(key: string): T | undefined {
    return this.cache.get(key);
  }

  public has(key: string): boolean {
    return this.cache.has(key);
  }

  public clear(): void {
    this.cache.clear();
  }
}

// We get our instance.

const myCache1 = InMemoryCache.getInstance<string>();
myCache1.set("user_123", "Amritesh");

const myCache2 = InMemoryCache.getInstance<string>();

console.log("Value from cache 2:", myCache2.get("user_123")); // Should print "Amritesh"

console.log("Are both caches the exact same instance?", myCache1 === myCache2);
