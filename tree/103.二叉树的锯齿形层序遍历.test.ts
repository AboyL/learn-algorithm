export default {};
/*
 * @lc app=leetcode.cn id=103 lang=typescript
 *
 * [103] 二叉树的锯齿形层序遍历
 */

// @lc code=start

// 给定一个二叉树，返回其节点值的锯齿形层序遍历。（
// 即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

// 例如：
// 给定二叉树 [3,9,20,null,null,15,7],
// 3
// / \
// 9  20
//  /  \
// 15   7

// [
//   [3],
//   [20,9],
//   [15,7]
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



// 思路就是 单数反着来
function zigzagLevelOrder(root: TreeNode | null): number[][] {
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
        result[level] = []
      }
      // 这里是不是需要进行处理
      if (level % 2 === 0) {
        result[level].push(node.val)
      } else {
        result[level].unshift(node.val)
      }
      // 入队
      const nextLevel = level + 1
      if (node.left) {
        queue.push([node.left, nextLevel])
      }
      if (node.right) {
        queue.push([node.right, nextLevel])
      }
    }
  }

  return result
};
// @lc code=end


test('zigzagLevelOrder', () => {
  expect(zigzagLevelOrder({
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
  })).toEqual([[3], [20, 9], [15, 7]])
})

// @lc code=end

