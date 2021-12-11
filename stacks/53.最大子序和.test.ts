export default {}

/*
 * @lc app=leetcode.cn id=53 lang=typescript
 *
 * [53] 最大子序和
 */

// @lc code=start
// 前缀和解决问题
// 可以先产生一个前缀和 然后对其进行两次循环得到最大值
// 但是这样就是 O2N 了
// 可以考虑pre数组里面不放所有的计算结果，而是放 到 i 这个数据的最大值
// 例如对于数组 [1,-2,3,4] => [0,1,-1,3,7]
// 这样得话其实也不用专门找一个数组放进去了，直接使用一个字符表示就好了
// 这里其实涉及到了动态规划
function maxSubArray(nums: number[]): number {
  let current = 0
  let max = nums[0]
  for (let i of nums) {
    current = Math.max(current + i, i)
    max = Math.max(max, current)
  }

  return max
};

test('maxSubArray', () => {
  expect(maxSubArray([1, -2, 3, 4])).toBe(7)
})
// @lc code=end

