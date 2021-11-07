// 二分查找写法

// 寻找某个值在 数组 中的下标

// mid+-1
const binarySearch0 = (nums: number[], target: number): number => {
  let l = 0;
  let r = nums.length - 1
  // [l,r]

  while (l <= r) {
    const mid = Math.floor((l + r) / 2)
    if (nums[mid] === target) {
      return mid
    }
    if (nums[mid] < target) {
      l = mid + 1
    } else {
      r = mid - 1
    }
  }
  return -1
}

// 改变边界
const binarySearch1 = (nums: number[], target: number): number => {
  let l = -1;
  let r = nums.length
  // (l,r)  对应 while 的区间
  // [l,r) 同样的小狗
  while (l < r) {
    const mid = Math.floor((l + r) / 2)
    if (nums[mid] === target) {
      return mid
    }
    if (nums[mid] < target) {
      l = mid // 因为mid在(l,r)的区间不会被取到 所以不需要加1
    } else {
      r = mid
    }
  }
  return -1
}

const binarySearch = binarySearch1

test('Binary search', () => {

  const number = []
  for (let i = 0; i < 100000; i++) {
    number.push(i)
  }
  expect(binarySearch(number, 9)).toBe(9)
  expect(binarySearch(number, 0)).toBe(0)
  expect(binarySearch(number, 1)).toBe(1)
  expect(binarySearch([0, 0, 1, 9, 10], 9)).toBe(3)
  expect(binarySearch([1], 1)).toBe(0)
  expect(binarySearch([], 1)).toBe(-1)



})