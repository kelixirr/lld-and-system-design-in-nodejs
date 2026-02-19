type NodeKV = DLLNode<any, any>;

class DLLNode<K, V> {
  key: K;
  value: V;
  prev: NodeKV | null = null;
  next: NodeKV | null = null;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
}

class LRUCache<K, V> {
  private capacity: number;
  private cache: Map<K, NodeKV>;

  private head: NodeKV;
  private tail: NodeKV;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map<K, NodeKV>();

    this.head = new DLLNode<K, V>(null as K, null as V);
    this.tail = new DLLNode<K, V>(null as K, null as V);

    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  private InsertBeforeNode(node: DLLNode<K, V>): void {
    const prevNode = this.tail.prev;
    if (prevNode) {
      prevNode.next = node;
      node.prev = prevNode;
      node.next = this.tail;
      this.tail.prev = node;
    }
  }

  private removeNode(node: DLLNode<K, V>) {
    const prevNode = node.prev;
    const nextNode = node.next;
    if (prevNode && nextNode) {
      prevNode.next = nextNode;
      nextNode.prev = prevNode;
    }
  }

  public get(key: K): V | undefined {
    if (!this.cache.has(key)) {
      console.log(`Cache MISS for key: ${key}`);
      return undefined;
    }

    const node = this.cache.get(key)!;
    console.log(`Cache HIT for key: ${key}. Moving to Most Recently Used.`);
    this.removeNode(node);
    this.InsertBeforeNode(node);
    return node.value;
  }

  public put(key: K, value: V): void {
    const node = this.cache.get(key);
    if (node) {
      this.removeNode(node);
    }

    const newNode = new DLLNode(key, value);
    this.cache.set(key, newNode);
    this.InsertBeforeNode(newNode);
    console.log(`Inserted/Updated key: ${key}`);

    // evict when capacity exceeded
    if (this.cache.size > this.capacity) {
      const lruNode = this.head.next;
      if (lruNode && lruNode !== this.tail) {
        console.log(`Capacity exceeded! Evicting LRU key: ${lruNode.key}`);
        this.removeNode(lruNode);
        this.cache.delete(lruNode.key);
      }
    }
  }
}

const myCache = new LRUCache<string, string>(3);

myCache.put("paper_1", "Quantum Computing Basics");
myCache.put("paper_2", "Machine Learning in Node");
myCache.put("paper_3", "TypeScript LLD Patterns");

myCache.get("paper_1");

myCache.put("paper_4", "Advanced Doubly Linked Lists");

// Let's verify:
console.log("\n--- Verification ---");
console.log("Is paper_1 still here?", myCache.get("paper_1") !== undefined); // Should be true
console.log("Is paper_2 still here?", myCache.get("paper_2") !== undefined); // Should be false (Evicted!)
