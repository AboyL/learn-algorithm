/*
 * @lc app=leetcode.cn id=912 lang=typescript
 *
 * [912] 排序数组
 */

// @lc code=start
function swap(arr: number[], left: number, right: number) {
  let t = arr[left]
  arr[left] = arr[right]
  arr[right] = t
}

function partition(arr: number[], startIndex: number, endIndex: number) {
  //  从基准值开始进行计算
  const pivot: number = arr[startIndex]
  let left = startIndex
  let right = endIndex
  while (left !== right) {
    while (arr[right] > pivot && left < right) {
      right--
    }
    while (arr[left] <= pivot && left < right) {
      left++
    }

    // 一轮结束 可以进行交换了
    swap(arr, left, right)
  }
  // 此时left === right
  // 跟最开始的元素进行位置调换
  swap(arr, startIndex, left)

  return left
}

function sortArray(arr: number[], startIndex: number = 0, endIndex: number = arr.length - 1) {
  if (startIndex >= endIndex) {
    return arr
  }
  const pivotIndex: number = partition(arr, startIndex, endIndex)
  sortArray(arr, startIndex, pivotIndex - 1)
  sortArray(arr, pivotIndex + 1, endIndex)
  return arr
}

test('sortArray', () => {
  const a = [0];
  expect(
    sortArray(a)
  ).toEqual([0])
})
// @lc code=end

