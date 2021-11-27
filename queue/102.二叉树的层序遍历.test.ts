/*
 * @lc app=leetcode.cn id=102 lang=typescript
 *
 * [102] 二叉树的层序遍历
 */

// @lc code=start

export class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}


// 需要使用队列来实现
// 广度优先遍历 就是要依靠队列来实现
// 需要注意的是 还需要是分层存入的 怎么才知道是第几层的？ 
function levelOrder(root: TreeNode | null): number[][] {
  if (!root) {
    return []
  }

  const queue: [TreeNode, number][] = []
  const result: number[][] = []

  queue.push([root, 0])

  while (queue.length) {
    const pair = queue.shift()

    if (pair) {
      const [node, level] = pair
      // 出队
      if (level === result.length) {
        result[level] = []
      }
      result[level].push(node.val)
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

test('levelOrder', () => {
  expect(levelOrder({
    val: 1,
    left: {
      val: 2,
      left: {
        val: 4,
        left: null,
        right: null
      },
      right: {
        val: 5,
        left: null,
        right: null
      }
    },
    right: {
      val: 3,
      left: {
        val: 6,
        left: null,
        right: null
      },
      right: {
        val: 7,
        left: null,
        right: null
      }
    }
  })).toEqual([
    [1],
    [2, 3],
    [4, 5, 6, 7]
  ])
})
// @lc code=end

