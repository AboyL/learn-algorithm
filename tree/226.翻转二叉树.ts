export default {};
/*
 * @lc app=leetcode.cn id=226 lang=typescript
 *
 * [226] 翻转二叉树
 */

// @lc code=start

class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}

function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) {
    return null
  }
  const temp = root.right
  root.right = root.left
  root.left = temp

  invertTree(root.right)
  invertTree(root.left)

  return root
};

// @lc code=end

