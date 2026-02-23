class TreeNode {
  public val: number;
  public left: TreeNode | null;
  public right: TreeNode | null;

  constructor(
    val: number = 0,
    left: TreeNode | null = null,
    right: TreeNode | null = null,
  ) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class TreeTraversals {
  // PRE-ORDER: Root -> Left -> Right
  public static dfsPreOrder(
    node: TreeNode | null,
    result: number[] = [],
  ): number[] {
    if (node === null) {
      return result;
    }

    result.push(node.val);

    this.dfsPreOrder(node.left, result);
    this.dfsPreOrder(node.right, result);

    return result;
  }

  // IN-ORDER: Left -> Root -> Right
  public static dfsInOrder(
    node: TreeNode | null,
    result: number[] = [],
  ): number[] {
    if (node === null) return result;

    this.dfsInOrder(node.left, result);
    result.push(node.val);
    this.dfsInOrder(node.right, result);
    return result;
  }

  // POST-ORDER: Left -> Right -> Root
  public static dfsPostOrder(
    node: TreeNode | null,
    result: number[] = [],
  ): number[] {
    if (node === null) return result;
    this.dfsPostOrder(node.left, result);
    this.dfsPostOrder(node.right, result);
    result.push(node.val);
    return result;
  }

  public static maxDepth(node: TreeNode | null): number {
    if (node == null) return 0;

    const leftDepth = this.maxDepth(node.left);
    const rightDepth = this.maxDepth(node.right);

    return Math.max(leftDepth, rightDepth) + 1;
  }

  // LEVEL-ORDER: Top -> Bottom, Left -> Right called BFS
  public static levelOrderBFS(root: TreeNode | null): number[] {
    if (root === null) return [];

    const result = [];
    const queue: TreeNode[] = [root];

    while (queue.length > 0) {
      const currentNode = queue.shift()!;

      result.push(currentNode.val);

      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }

      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }

    return result;
  }
}

const root = new TreeNode(50);
root.left = new TreeNode(25, new TreeNode(10), new TreeNode(30));
root.right = new TreeNode(75, null, new TreeNode(80));

console.log(root);

console.log(
  `In-Order (Sorted):   [${TreeTraversals.dfsInOrder(root).join(", ")}]`,
);

console.log(
  `Pre-Order (Clone):   [${TreeTraversals.dfsPreOrder(root).join(", ")}]`,
);

console.log(
  `Post-Order (Delete): [${TreeTraversals.dfsPostOrder(root).join(", ")}]`,
);

console.log(
  `Level-Order (BFS):   [${TreeTraversals.levelOrderBFS(root).join(", ")}]`,
);
