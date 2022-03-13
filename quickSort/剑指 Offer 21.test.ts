// 剑指 Offer 21. 调整数组顺序使奇数位于偶数前面
// 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数在数组的前半部分，所有偶数在数组的后半部分。

export default {}

// 感觉就是 一轮快速排序？
function swap(arr: number[], left: number, right: number) {
  let t = arr[left]
  arr[left] = arr[right]
  arr[right] = t
}
function exchange(nums: number[]): number[] {
  if (!nums.length) {
    return nums
  }
  let left = 0
  let right = nums.length - 1
  while (left !== right) {
    while (left < right && nums[right] % 2 === 0) {
      right--;
    }
    while (left < right && nums[left] % 2 !== 0) {
      left++;
    }
    swap(nums, left, right)
  }
  return nums
};

test('exchange', () => {
  // const a = [1, 4, 2, 7]
  const a: number[] = []

  exchange(a)
  expect(a).toEqual([1, 7, 2, 4])
})