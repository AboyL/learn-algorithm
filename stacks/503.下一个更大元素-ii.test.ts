export default {}
/*
 * @lc app=leetcode.cn id=503 lang=typescript
 *
 * [503] 下一个更大元素 II
 */

// @lc code=start

// 构建一个新数组，将数组翻倍得到解
function nextGreaterElements1(nums: number[]): number[] {
  let nums2: number[] = []
  nums2 = nums2.concat(nums, nums)
  // for (let i = 0; i < nums.length; i++) {
  //   nums2[i] = nums[i]
  //   nums2[i + nums.length - 1] = nums[i]
  // }
  const relust: number[] = []
  const stacks: number[] = []
  for (let i = nums2.length - 1; i >= 0; i--) {
    while (stacks.length !== 0 && stacks[0] <= nums2[i]) {
      stacks.shift()
    }
    relust[i] = stacks.length === 0 ? -1 : stacks[0]
    stacks.unshift(nums2[i])
  }
  return relust.splice(0, nums.length)
};

// 不翻倍也可以
function nextGreaterElements(nums: number[]): number[] {
  const relust: number[] = []
  const stacks: number[] = []
  const n: number = nums.length
  for (let i = 2 * n - 1; i >= 0; i--) {
    while (stacks.length !== 0 && stacks[0] <= nums[i % n]) {
      stacks.shift()
    }
    relust[i % n] = stacks.length === 0 ? -1 : stacks[0]
    stacks.unshift(nums[i % n])
  }
  return relust
};

test('nextGreaterElements', () => {
  expect(nextGreaterElements([5, 4, 3, 2, 1])).toEqual([-1, 5, 5, 5, 5])
  expect(nextGreaterElements([1, 2, 1])).toEqual([2, -1, 2])
})
// @lc code=end

