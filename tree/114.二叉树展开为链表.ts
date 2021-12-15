export default {}
/*
 * @lc app=leetcode.cn id=114 lang=typescript
 *
 * [114] 二叉树展开为链表
 */

// @lc code=start
// 给你二叉树的根结点 root ，请你将它展开为一个单链表：

// 展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。
// 展开后的单链表应该与二叉树 先序遍历 顺序相同。


// 递归算法的关键要明确函数的定义，相信这个定义，而不要跳进递归细节。
// 因此不应该去思考，当我只有一个元素的时候应该做什么
// 而是当我前面的步骤都完成了的时候 我要做什么
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


/**
  Do not return anything, modify root in-place instead.
 */

function flatten(root: TreeNode | null): void {
  if (!root) {
    return
  }
  // 进行特殊
  flatten(root.left)
  flatten(root.right)

  const left = root.left
  const right = root.right

  root.left = null
  root.right = left

  let p = root

  while (p.right) {
    p = p.right
  }
  p.right = right

};
// @lc code=end

