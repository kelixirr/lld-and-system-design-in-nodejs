class TreeNode {
  public val: string;
  public children: TreeNode[];

  constructor(val: string) {
    this.val = val;
    this.children = [];
  }
}

class GenericTree {
  public root: TreeNode | null;
  constructor() {
    this.root = null;
  }

  public setRoot(val: string): void {
    this.root = new TreeNode(val);
    console.log("Root Added");
  }

  public findNode(val: string): TreeNode | null {
    if (this.root === null) return null;

    const queue: TreeNode[] = [this.root];

    while (queue.length > 0) {
      const currentNode = queue.shift()!;
      if (currentNode.val === val) {
        console.log("Current Nod Val", currentNode);

        return currentNode;
      }
      for (const child of currentNode.children) {
        queue.push(child);
      }
    }

    return null;
  }

  public insert(parentValue: string, newValue: string): boolean {
    const parentNode = this.findNode(parentValue);
    if (parentNode == null) {
      return false;
    }

    const newNode = new TreeNode(newValue);
    parentNode.children.push(newNode);
    return true;
  }
}

const companyTree = new GenericTree();
console.log(
  companyTree.setRoot("Amritesh(CEO)"),
  companyTree.insert("Amritesh(CEO)", "CTO"),
  companyTree.insert("Amritesh(CEO)", "VP of Engineering"),
  companyTree.insert("VP of Engineering", "Frontend Lead"),
  companyTree.insert("VP of Engineering", "Backend Lead"),
);

const backendLeadNode = companyTree.findNode("Backend Lead");
console.log(backendLeadNode?.val);
