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

  inorder(node) {
    if (!node) return;
    this.inorder(node.left);
    console.log(node.data);
    this.inorder(node.right);
  }

  // preorder traversal using Recusrion
  preorder(node) {
    if (!node) return;
    console.log(node.data);
    this.preorder(node.left);
    this.preorder(node.right);
  }

  // preorder traversal using Iteration
  preorderIterative(node) {
    if (!node) return;

    let st = [];
    let cur = node;

    while (cur || st.length) {
      console.log(cur.data);
      if (cur.right) st.push(cur.right);
      cur = cur.left;

      if (!cur && st.length) cur = st.pop();
    }
  }

  getMin(node = this.root) {
    if (!node) {
      console.log("BST is empty");
      return -1;
    }

    if (!node.left) return node.data;
    return this.getMin(node.left);
  }

  getMax(node = this.root) {
    if (!node) {
      console.log("BST is empty");
      return -1;
    }

    if (!node.right) return node.data;
    return this.getMax(node.right);
  }

  storeInorder(node, list = []) {
    if (!node) return list;

    this.storeInorder(node.left, list);
    list.push(node.data);
    this.storeInorder(node.right, list);

    return list;
  }

  mergeLists(list1, list2, m, n) {
    var list3 = [];
    var i = 0;
    var j = 0;

    while (i < m && j < n) {
      if (list1[i] < list2[j]) list3.push(list1[i++]);
      else list3.push(list2[j++]);
    }

    while (i < m) list3.push(list1[i++]);
    while (j < n) list3.push(list2[j++]);

    return list3;
  }

  ListToBST(list, start, end) {
    if (start > end) return null;

    var mid = parseInt((start + end) / 2);
    var node = new Node(list[mid]);

    node.left = this.ListToBST(list, start, mid - 1);
    node.right = this.ListToBST(list, mid + 1, end);

    return node;
  }

  mergeTrees(node1, node2) {
    var list1 = this.storeInorder(node1);
    var list2 = this.storeInorder(node2);
    var list3 = this.mergeLists(list1, list2, list1.length, list2.length);
    var node = this.ListToBST(list3, 0, list3.length - 1);

    return node;
  }
}

// const bst1 = new BST();
// bst1.insert(10);
// bst1.insert(5);
// bst1.insert(16);
// bst1.insert(3);
// bst1.insert(8);
// bst1.insert(20);
// bst1.insert(25);

// console.log(bst1);
// console.log(bst1.search(8));
// console.log(bst1.search(5));
// console.log(bst1.search(20));
// console.log(bst1.search(18));

// const root = bst1.root;
// console.log("Preorder traversal of BST using Recursion");
// bst1.preorder(root);

// console.log("Preorder traversal of BST using Iteration");
// bst1.preorderIterative(root);

// console.log(`Minimum element in BST: ${bst1.getMin()}`);
// bst1.insert(2);
// console.log(`Minimum element in BST: ${bst1.getMin()}`);

// console.log(`Maximum element in BST: ${bst1.getMax()}`);
// bst1.insert(32);
// bst1.insert(36);
// console.log(`Maximum element in BST: ${bst1.getMax()}`);


// Merging two BSTs
var bst1 = new BST();
bst1.insert(100);
bst1.insert(50);
bst1.insert(300);
bst1.insert(20);
bst1.insert(70);
console.log("Inorder traversal of BST1");
bst1.inorder(bst1.root);

var bst2 = new BST();
bst2.insert(80);
bst2.insert(40);
bst2.insert(120);
console.log("Inorder traversal of BST2");
bst2.inorder(bst2.root);

var bst3 = new BST();
bst3.root = bst3.mergeTrees(bst1.root, bst2.root);
console.log("Inorder traversal after merging BST1 & BST2");
bst3.inorder(bst3.root);
