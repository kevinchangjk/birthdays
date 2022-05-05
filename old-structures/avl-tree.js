import { BinarySearchTree } from "./binary-search-tree.js";
import {
  leftRotation,
  rightRotation,
  leftRightRotation,
  rightLeftRotation,
} from "./tree-rotations.js";

/**
 * Balance tree doing rotations based on balance factor.
 *
 * Depending on the `node` balance factor and child's factor
 * one of this rotation is performed:
 * - LL rotations: single left rotation
 * - RR rotations: single right rotation
 * - LR rotations: double rotation left-right
 * - RL rotations: double rotation right-left
 *
 * @param {BinaryTreeNode} node
 */
function balance(node) {
  if (node.balanceFactor > 1) {
    // left subtree is higher than right subtree
    if (node.left.balanceFactor < 0) {
      return leftRightRotation(node);
    }
    return rightRotation(node);
  }
  if (node.balanceFactor < -1) {
    // right subtree is higher than left subtree
    if (node.right.balanceFactor > 0) {
      return rightLeftRotation(node);
    }
    return leftRotation(node);
  }
  return node;
}
// end::balance[]

// tag::balanceUpstream[]
/**
 * Bubbles up balancing nodes a their parents
 *
 * @param {BinaryTreeNode} node
 */
function balanceUpstream(node) {
  let current = node;
  let newParent;
  while (current) {
    newParent = balance(current);
    current = current.parent;
  }
  return newParent;
}
// end::balanceUpstream[]
// tag::balance[]

/**
 * AVL Tree
 * It's a self-balanced binary search tree optimized for fast lookups.
 */
export class AvlTree extends BinarySearchTree {
  // tag::AvlTree[]
  /**
   * Add node to tree. It self-balance itself.
   * @param {any} value node's value
   */
  add(value) {
    const node = super.add(value);
    this.root = balanceUpstream(node);
    return node;
  }

  /**
   * Remove node if it exists and re-balance tree
   * @param {any} value
   */
  remove(value) {
    const node = super.find(value);
    if (node) {
      const found = super.remove(value);
      this.root = balanceUpstream(node.parent);
      return found;
    }

    return false;
  }

  list() {
    const gen = this.inOrderTraversal();
    for (let i = 0; i < this.size; i++) {
      const birthday = gen.next().value.value;
      birthday.display();
    }
  }
}
// end::AvlTree[]
