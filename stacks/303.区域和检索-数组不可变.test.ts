/*
 * @lc app=leetcode.cn id=303 lang=typescript
 *
 * [303] 区域和检索 - 数组不可变
 */

// @lc code=start
// 前缀和解决问题
// 需要注意的是left right在前缀和里面的对应关系
class NumArray {
  list: number[] = [0]
  constructor(nums: number[]) {
    let sum: number = 0
    for (let i of nums) {
      sum += i
      this.list.push(sum)
    }
  }

  sumRange(left: number, right: number): number {
    return this.list[right+1] - this.list[left]
  }
}

test('NumArray', () => {
  const na = new NumArray([1, 2, 3, 4, 5, 6])
  expect(na.sumRange(0, 1)).toBe(3)
  expect(na.sumRange(1, 2)).toBe(5)

})
/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */
// @lc code=end

