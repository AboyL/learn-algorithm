export default {}
/*
 * @lc app=leetcode.cn id=1305 lang=typescript
 *
 * [1305] 两棵二叉搜索树中的所有元素
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

// 整体思路可以借鉴并归排序的思路
// 二叉搜索树 是左边的子节点比父节点小，右边的比父节点大
// 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值
// 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值
// 就是进行一次合并的操作 通过两个指针指向
// 需要进行一些迭代的操作
// 可以递归找到最后的一个元素,然后再在最后一个元素中进行寻找
// 中序遍历加上排序 对于二叉搜索树就是要用中序遍历
function defs(root: TreeNode | null, arr: number[]) {
  if (!root) {
    return
  }
  defs(root.left, arr)
  arr.push(root.val)
  defs(root.right, arr)
}
function getAllElements(root1: TreeNode | null, root2: TreeNode | null): number[] {
  let arr: number[] = []
  let leftArr: number[] = []
  let rightArr: number[] = []
  defs(root1, leftArr)
  defs(root2, rightArr)
  // 进行一次归并
  let left = 0
  let right = 0
  while (left < leftArr.length || right < rightArr.length) {
    if ((leftArr[left] < rightArr[right] && left < leftArr.length) || right >= rightArr.length) {
      arr.push(leftArr[left])
      left++
    } else {
      arr.push(rightArr[right])
      right++
    }
  }
  return arr
};

test('getAllElements', () => {

  expect(
    getAllElements(
      {
        val: 2,
        left: {
          val: 1,
          left: null,
          right: null,
        },
        right: {
          val: 4,
          left: null,
          right: null,
        }
      },
      {
        val: 1,
        left: {
          val: 0,
          left: null,
          right: null,
        },
        right: {
          val: 3,
          left: null,
          right: null,
        }
      }
    )
  ).toEqual(
    [0, 1, 1, 2, 3, 4]
  )
})
// @lc code=end

