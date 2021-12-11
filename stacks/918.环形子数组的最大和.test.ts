export default {}
/*
 * @lc app=leetcode.cn id=918 lang=typescript
 *
 * [918] 环形子数组的最大和
 */

// @lc code=start
// 与最大子序和类似 那是否只需要走两边就好了


// 
function maxSubarraySumCircular(nums: number[]): number {
  if (nums.length === 1) {
    return nums[0]
  }
  let current = 0
  let max = nums[0]
  let sum = 0
  for (let i of nums) {
    sum += i
    current = Math.max(current + i, i)
    max = Math.max(max, current)
  }

  // 计算第二个值 是整个数组里面的最小队列
  let min = nums[1]
  let pre = 0
  for (let i = 1; i < nums.length - 1; i++) {
    pre = Math.min(nums[i], nums[i] + pre)
    min = Math.min(pre, min)
  }

  return Math.max(max, sum - min)
};

test('maxSubarraySumCircular', () => {
  expect(maxSubarraySumCircular([-2])).toBe(-2)

  expect(maxSubarraySumCircular([1, -6, -7, 4])).toBe(5)
  expect(maxSubarraySumCircular([-5, 3, 5])).toBe(8)

  expect(maxSubarraySumCircular([-2, -3, -1])).toBe(-1)

  expect(maxSubarraySumCircular([-2, -3, -1])).toBe(-1)
  expect(maxSubarraySumCircular([9, -4, -7, 9])).toBe(18)


  expect(maxSubarraySumCircular([1, -2, 3, -2])).toBe(3)
  expect(maxSubarraySumCircular([5, -3, 5])).toBe(10)
  expect(maxSubarraySumCircular([3, -1, 2, -1])).toBe(4)
  expect(maxSubarraySumCircular([3, -2, 2, -3])).toBe(3)

})
// @lc code=end

