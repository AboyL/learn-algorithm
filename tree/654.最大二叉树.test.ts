export default {}
/*
 * @lc app=leetcode.cn id=654 lang=typescript
 *
 * [654] 最大二叉树
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


function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
  if (nums.length === 0) {
    return null
  }

  let max = nums[0]
  let leftArr: number[] = []
  let rightArr: number[] = []

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > max) {
      rightArr.unshift(max)
      max = nums[i]
      leftArr = leftArr.concat(rightArr)
      rightArr = []
    } else {
      rightArr.push(nums[i])
    }
  }

  const root = new TreeNode(max)
  root.left = constructMaximumBinaryTree(leftArr)
  root.right = constructMaximumBinaryTree(rightArr)
  return root
};


// @lc code=end

