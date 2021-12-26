export default {};
/*
 * @lc app=leetcode.cn id=589 lang=typescript
 *
 * [589] N 叉树的前序遍历
 */

// @lc code=start


class Node {
  val: number
  children: Node[]
  constructor(val?: number) {
    this.val = (val === undefined ? 0 : val)
    this.children = []
  }
}



function preorder(root: Node | null): number[] {
  if (!root) {
    return []
  }
  let result: number[] = []
  result = result.concat([root.val])
  // 进行数组遍历
  for (let child of root.children) {
    result = result.concat(preorder(child))
  }
  return result
};
// @lc code=end

