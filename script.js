class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(data, node = this.root) {
    let newNode = new Node(data);
    if (this.root === null) this.root = newNode;
    else this.insertNode(this.root, newNode);
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) node.left = newNode;
      else this.insertNode(node.left, newNode);
    } else {
      if (node.right === null) node.right = newNode;
      else this.insertNode(node.right, newNode);
    }
  }

  search(data, node = this.root) {
    if (node === null) return null;
    else if (data < node.data) return this.search(data, node.left);
    else if (data > node.data) return this.search(data, node.right);
    else return node;
  }
}

const bst1 = new BST();
bst1.insert(10);
bst1.insert(5);
bst1.insert(16);
bst1.insert(3);
bst1.insert(8);
bst1.insert(20);
bst1.insert(25);

console.log(bst1);
console.log(bst1.search(8));
console.log(bst1.search(5));
console.log(bst1.search(20));
console.log(bst1.search(18));