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

class TreeAlgorithm {
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

  public static maxDepth(node: TreeNode | null): number {
    if (node == null) return 0;

    const leftDepth = this.maxDepth(node.left);
    const rightDepth = this.maxDepth(node.right);

    return Math.max(leftDepth, rightDepth) + 1;
  }
}

const node4 = new TreeNode(4);
const node5 = new TreeNode(5);
const node2 = new TreeNode(2, node4, node5);
const node3 = new TreeNode(3);
const root = new TreeNode(1, node2, node3);

const path = TreeAlgorithm.dfsPreOrder(root);
console.log(`DFS Path Visited: [${path.join(", ")}]`);

const depth = TreeAlgorithm.maxDepth(root);
console.log(`\nMaximum Depth of the Tree: ${depth}`);
