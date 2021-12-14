export default {}
/*
 * @lc app=leetcode.cn id=116 lang=typescript
 *
 * [116] 填充每个节点的下一个右侧节点指针
 */

// @lc code=start

class Node {
  val: number
  left: Node | null
  right: Node | null
  next: Node | null
  constructor(val?: number, left?: Node, right?: Node, next?: Node) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
    this.next = (next === undefined ? null : next)
  }
}


// 增加一个辅助函数
// 这里需要注意的
function connectTwoNode(node1: Node | null, node2: Node | null): void {
  if (!node1 || !node2) {
    return
  }
  node1.next = node2
  connectTwoNode(node1.left, node1.right)
  connectTwoNode(node2.left, node2.right)
  connectTwoNode(node1.right, node2.left)
}

function connect(root: Node | null): Node | null {
  if (!root) {
    return null
  }
  connectTwoNode(root.left, root.right)

  return root
};

// @lc code=end

