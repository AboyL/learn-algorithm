/*
 * @lc app=leetcode.cn id=560 lang=typescript
 *
 * [560] 和为 K 的子数组
 */

// @lc code=start

// 通过前缀和来解决问题
// 前缀和用来进行统计 数组 [i,j] 的和
function subarraySum1(nums: number[], k: number): number {
  let sum: number = 0
  const preSum: number[] = [0]
  for (let i of nums) {
    sum += i
    preSum.push(sum)
  }
  // 等价于求 preSum[i]-preSum[j]===k
  let s = 0
  for (let i = preSum.length - 1; i >= 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      if (preSum[i] - preSum[j] === k) {
        ++s
      }
    }
  }
  return s
};


// 通过hash表进行优化
function subarraySum(nums: number[], k: number): number {
  // preSum[i] - preSum[j] === k => preSum[j] ===preSum[j]-k
  // 通过hash表进行存储
  let s = 0
  const hashMap = new Map<number, number>()
  hashMap.set(0, 1)
  let sum = 0
  for (let i of nums) {
    sum += i
    const ij = sum - k
    if (typeof hashMap.get(ij) !== 'undefined') {
      s += hashMap.get(ij) as number
    }
    hashMap.set(sum, (hashMap.get(sum) || 0) + 1)
  }
  return s
};

test('subarraySum', () => {
  // expect(subarraySum([1], 0)).toBe(0)
  expect(subarraySum([1, 1, 1], 2)).toBe(2)
  expect(subarraySum([1, 2, 3], 3)).toBe(2)
})
// @lc code=end

