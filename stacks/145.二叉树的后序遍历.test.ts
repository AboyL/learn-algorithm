export default {}

/*
 * @lc app=leetcode.cn id=145 lang=typescript
 *
 * [145] 二叉树的后序遍历
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

// 可以递归，也可以迭代 注意是 left right parent

// 递归写法
function postorderTraversal1(root: TreeNode | null): number[] {
  if (!root) {
    return []
  }
  const rightArr = postorderTraversal2(root.right)
  const leftArr = postorderTraversal2(root.left)
  return [...leftArr, ...rightArr, root.val]
};

// 迭代写法
// 每次都是先遍历树的左子树，然后再遍历树的右子树，最后再遍历根节点，以此类推，直至遍历完整个树。
// 可以参考树的层序遍历，层序遍历是通过队列，那么后序遍历是否可以通过栈来实现
// 怎么进行入栈跟出栈?
function postorderTraversal2(root: TreeNode | null): number[] {
  if (!root) {
    return []
  }
  const treeStacks: TreeNode[] = [root]
  const valueArr: number[] = []
  const map: Map<TreeNode, boolean> = new Map()
  while (treeStacks.length) {
    const v = treeStacks[0]
    if (v.left && !map.get(v.left)) {
      treeStacks.unshift(v.left)
      continue
    }

    if (v.right && !map.get(v.right)) {
      treeStacks.unshift(v.right)
      continue
    }
    // 此时已经走到了最末端
    // 一个问题，当我往回走的时候，怎么才能判断是否需要向下走？还需要构建一个has表？
    // 有没有办法不构建这个表
    const tv = treeStacks.shift()
    if (tv) {
      map.set(tv, true)
      valueArr.push(tv.val)
    }
  }
  return valueArr
};

// 不需要hash表的迭代方式
function postorderTraversal(root: TreeNode | null): number[] {
  if (!root) {
    return []
  }
  const treeStacks: TreeNode[] = []
  const valueArr: number[] = []
  let prev: TreeNode | null = null
  while (root !== null || treeStacks.length !== 0) {
    // 这一轮走完以后走到了最左边
    while (root !== null) {
      treeStacks.unshift(root)
      root = root.left
    }
    let v = treeStacks.shift()
    if (v) {
      root = v
      if (root?.right === null || root?.right === prev) {
        // 确实是最后一个了
        valueArr.push(root.val)
        prev = root;
        root = null;
      } else {
        treeStacks.unshift(root)
        root = root.right
      }
    }
  }
  return valueArr
};
const tree1 = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null
    },
    right: {
      val: 4,
      left: null,
      right: null
    },
  },
  right: {
    val: 5,
    left: {
      val: 6,
      left: null,
      right: null
    },
    right: {
      val: 7,
      left: null,
      right: null
    },
  }
}

test('postorderTraversal', () => {
  expect(
    postorderTraversal(tree1)

  ).toEqual(
    [
      3, 4, 2, 6,
      7, 5, 1
    ]
  )
})
// console.log(
//   postorderTraversal(tree1)
// )
// @lc code=end

