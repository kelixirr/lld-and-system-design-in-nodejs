class ListNode {
  public val: number;
  public next: ListNode | null;

  constructor(val: number, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class LinkedList {
  public head: ListNode | null;

  constructor() {
    this.head = null;
  }

  public append(val: number): void {
    const newNode = new ListNode(val);

    if (this.head === null) {
      this.head = newNode;
      return;
    }

    let current = this.head;
    while (current.next !== null) {
      current = current.next;
    }

    current.next = newNode;
  }

  public print(): void {
    let current = this.head;
    const values: number[] = [];

    while (current !== null) {
      values.push(current.val);
      current = current.next;
    }

    console.log(values.join(" -> ") + " -> null");
  }

  public reverse(): void {
    let previous: ListNode | null = null;
    let current: ListNode | null = this.head;
    let following: ListNode | null = null;

    while (current !== null) {
      following = current.next;
      current.next = previous;
      previous = current;
      current = following;
    }

    this.head = previous;
  }

  // Time Complexity: O(N) | Space Complexity: O(1) - Cycle detection
  public hasCycle(): boolean {
    let slow = this.head;
    let fast = this.head;

    while (fast !== null && fast.next !== null) {
      slow = slow!.next;
      fast = fast.next.next;

      if (slow === fast) {
        return true;
      }
    }
    return false;
  }
}

const myList = new LinkedList();

myList.append(10);
myList.append(20);
myList.append(30);
myList.append(40);

console.log("\nOriginal List:");
myList.print();

console.log("\n--- Reversing the Linked List ---");
myList.reverse();

console.log("Reversed List:");
myList.print();
