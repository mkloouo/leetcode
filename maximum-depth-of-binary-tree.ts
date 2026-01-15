/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function maxDepth(root: TreeNode | null): number {
  if (!root || (root.left === null && root.right === null)) {
    return 1;
  }

  let depth = 1;
  const queue = Array.from([root?.left, root?.right]).filter(
    (val) => val !== null
  );

  do {
    let currentDepthItems = queue.length;

    for (let i = 0; i < currentDepthItems; ++i) {
      const item = queue.shift();
      if (!item) {
        continue;
      }

      if (item.left !== null) {
        queue.push(item.left);
      }

      if (item.right !== null) {
        queue.push(item.right);
      }
    }

    depth++;
  } while (queue.length > 0);

  return depth;
}

module.exports = maxDepth;
