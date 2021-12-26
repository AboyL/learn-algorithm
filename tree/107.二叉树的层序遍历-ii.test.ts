export default {}
/*
 * @lc app=leetcode.cn id=107 lang=typescript
 *
 * [107] 二叉树的层序遍历 II
 */

// @lc code=start

// 给定一个二叉树，返回其节点值自底向上的层序遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）

// 例如：
// 给定二叉树 [3,9,20,null,null,15,7],


// 3
// / \
// 9  20
//  /  \
// 15   7

// [
//   [15,7],
//   [9,20],
//   [3]
// ]

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


// 一个最基本的思路就是直接进行一遍正序遍历再反过来
// 或者直接修改塞入到result里面的逻辑就好了
function levelOrderBottom(root: TreeNode | null): number[][] {
  if (!root) {
    return []
  }
  let result: number[][] = []
  let queue: [TreeNode, number][] = []
  queue.push([root, 0])

  while (queue.length) {
    const pair = queue.shift()
    if (pair) {
      const [node, level] = pair
      // 处理没有的时候
      if (level === result.length) {
        result.unshift([])
      }
      // 这里是不是需要进行处理
      result[0].push(node.val)
      // 入队
      if (node.left) {
        queue.push([node.left, level + 1])
      }
      if (node.right) {
        queue.push([node.right, level + 1])
      }
    }
  }

  return result
};
// @lc code=end


test('levelOrderBottom', () => {
  expect(levelOrderBottom({
    val: 3,
    left: {
      val: 9,
      left: null,
      right: null
    },
    right: {
      val: 20,
      left: {
        val: 15,
        left: null,
        right: null
      },
      right: {
        val: 7,
        left: null,
        right: null
      }
    }
  })).toEqual([[15, 7], [9, 20], [3]])
})
