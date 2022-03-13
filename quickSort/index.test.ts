export default {}

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

function quickSort(arr: number[], startIndex: number = 0, endIndex: number = arr.length - 1) {
  if (startIndex >= endIndex) {
    return
  }
  const pivotIndex: number = partition(arr, startIndex, endIndex)
  quickSort(arr, startIndex, pivotIndex - 1)
  quickSort(arr, pivotIndex + 1, endIndex)
}

test('quickSort', () => {
  const a = [5, 1, 7, 9, 11];
  quickSort(a)
  expect(
    a
  ).toEqual([1, 5, 7, 9, 11])
})