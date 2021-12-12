/*
 * @lc app=leetcode.cn id=496 lang=typescript
 *
 * [496] 下一个更大元素 I
 */

// @lc code=start
// 需要从后往前进行遍历
// 用一个栈进行存储 假如当前的数据比栈顶的数据小，那么就入栈
// 然后到下一个元素再进行检测，假如这个时候这个元素比栈顶的元素大，那么就出栈，再进行遍历
// 直到当前元素已经是从这个元素开始往后面数的最大的元素，这样他前面的元素的第一个最大的元素，最小也是当前元素
// 因此我们可以先生成一个数组，这个数组里面的值是对应的index对应的下一个最大元素
// 再根据一个hash表存储值的下标
// 最后根据hash表的下标找到值的最小值
// 因为nums1是nums2的子集并且不重复

// 模板
function tempNextGreaterElement(nums2: number[]): number[] {
  const relust: number[] = []
  const stacks: number[] = []
  for (let i = nums2.length - 1; i >= 0; i--) {
    while (stacks.length !== 0 && stacks[0] <= nums2[i]) {
      stacks.shift()
    }
    relust[i] = stacks.length === 0 ? -1 : stacks[0]
    stacks.unshift(nums2[i])
  }
  return relust
};

function nextGreaterElement(num1: number[], nums2: number[]): number[] {
  const preRelust: number[] = []
  const stacks: number[] = []
  const hashMap = new Map<number, number>()
  for (let i = nums2.length - 1; i >= 0; i--) {
    hashMap.set(nums2[i], i)
    while (stacks.length !== 0 && stacks[0] <= nums2[i]) {
      stacks.shift()
    }
    preRelust[i] = stacks.length === 0 ? -1 : stacks[0]
    stacks.unshift(nums2[i])
  }

  // 对num1 进行遍历

  const result: number[] = []
  for (let i of num1) {
    const index: number = hashMap.get(i) as number
    result.push(preRelust[index])
  }
  return result
};

test('NextGreaterElement', () => {
  expect(tempNextGreaterElement([1, 2, 3])).toEqual([2, 3, -1])
  expect(tempNextGreaterElement([3, 2, 3])).toEqual([-1, 3, -1])
  expect(tempNextGreaterElement([3])).toEqual([-1])
  expect(tempNextGreaterElement([3, 2, 1])).toEqual([-1, -1, -1])


})
// @lc code=end

