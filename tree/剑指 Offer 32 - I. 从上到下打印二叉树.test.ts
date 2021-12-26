export default {}

// 从上到下打印出二叉树的每个节点，同一层的节点按照从左到右的顺序打印。
// 3
// / \
// 9  20
//  /  \
// 15   7

// [3,9,20,15,7]



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

// 这就是层序遍历吧
// 通过队列进行遍历操作
function levelOrder(root: TreeNode | null): number[] {
  if (!root) {
    return []
  }

  let result: number[] = []
  let queue: TreeNode[] = []
  queue.push(root)
  while (queue.length) {
    const current = queue.shift()
    if (current) {
      result.push(current.val)
      // 将子节点塞入进去
      if (current.left) {
        queue.push(current.left)
      }
      if (current.right) {
        queue.push(current.right)
      }
    }
  }

  return result
};


test('levelOrder', () => {
  expect(levelOrder({
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
  })).toEqual([3, 9, 20, 15, 7])
})