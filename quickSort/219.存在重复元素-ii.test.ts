export default {}
/*
 * @lc app=leetcode.cn id=219 lang=typescript
 *
 * [219] 存在重复元素 II
 */

// @lc code=start
// 给你一个整数数组 nums 和一个整数 k ，判断数组中是否存在两个 不同的索引 i 和 j ，
// 满足 nums[i] == nums[j] 且 abs(i - j) <= k 。如果存在，返回 true ；否则，返回 false 。

// 直接通过hash表来解决问题
function containsNearbyDuplicate(nums: number[], k: number): boolean {
  const hashMap = new Map<number, number>()
  for (let i = 0; i < nums.length; i++) {
    if (hashMap.get(nums[i]) !== undefined) {
      // 比较一下
      // 有问题
      if (Math.abs(i - hashMap.get(nums[i])!) <= k) {
        return true
      } else {
        hashMap.set(nums[i], i)
      }
    } else {
      hashMap.set(nums[i], i)
    }
  }

  return false
};

test('containsNearbyDuplicate', () => {
  expect(
    containsNearbyDuplicate([1, 2, 3, 1], 3)
  ).toEqual(true)
})
// @lc code=end

