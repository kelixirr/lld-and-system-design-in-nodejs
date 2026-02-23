class BSTNode {
  public value: number;
  public left: BSTNode | null;
  public right: BSTNode | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  public root: BSTNode | null;

  constructor() {
    this.root = null;
  }

  public insert(value: number): void {
    const newNode = new BSTNode(value);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let currentNode = this.root;

    while (true) {
      // if value is less than current go left else right and ignore duplicate
      if (value < currentNode.value) {
        if (currentNode.left === null) {
          currentNode.left = newNode;
          return;
        }

        // if not null move to level down left side
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        if (currentNode.right === null) {
          currentNode.right = newNode;
          return;
        }

        currentNode = currentNode.right;
      } else {
        return; // for duplicates
      }
    }
  }

  public search(target: number): boolean {
    let currentNode = this.root;

    while (currentNode !== null) {
      if (target === currentNode.value) {
        return true;
      }
      if (target < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return false;
  }

  public remove(value: number): void {
    this.root = this.removeNode(this.root, value);
  }

  private removeNode(
    currentNode: BSTNode | null,
    value: number,
  ): BSTNode | null {
    if (currentNode === null) {
      return null;
    }

    if (value < currentNode.value) {
      currentNode.left = this.removeNode(currentNode.left, value);
      return currentNode;
    } else if (value > currentNode.value) {
      currentNode.right = this.removeNode(currentNode.right, value);
      return currentNode;
    } else {
      if (currentNode.left === null && currentNode.right === null) {
        return null;
      }
      if (currentNode.left === null) {
        return currentNode.right;
      }
      const successor = this.findMinNode(currentNode.right!);
      currentNode.value = successor.value;
      currentNode.right = this.removeNode(currentNode.right, successor.value);
      return currentNode;
    }
  }

  private findMinNode(node: BSTNode): BSTNode {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }
}

const myTree = new BinarySearchTree();

myTree.insert(50);
myTree.insert(25);
myTree.insert(75);
myTree.insert(10);
myTree.insert(30);
myTree.insert(80);

const target1 = 30;
console.log(`\nInitiating search for ${target1}:`);
const found1 = myTree.search(target1);

const target2 = 99;
console.log(`\nInitiating search for ${target2}:`);
const found2 = myTree.search(target2);
