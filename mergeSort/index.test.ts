
const _merge = (arr: number[], start: number, mid: number, end: number) => {
  // 这个时候 start 到 mid 以及 mid 到end都是排好序了的数组了
  const temArr: number[] = []
  let i = start
  let left = start
  let right = mid + 1
  while (i <= end) {
    // 这个时候进行比较
    i++
    if ((arr[left] < arr[right] && left <= mid) || right > end) {
      temArr.push(arr[left])
      left++
    } else {
      temArr.push(arr[right])
      right++;
    }
  }
  // 进行一次复制
  for (let j = 0; j < temArr.length; j++) {
    arr[start + j] = temArr[j]
  }
}

function _mergeSort(arr: number[], start: number, end: number) {
  // 在什么时候不会进行
  // 实际上进行的曹组
  if (start >= end) {
    return
  }
  const mid = Math.floor((start + end) / 2)
  _mergeSort(arr, start, mid)
  _mergeSort(arr, mid + 1, end)
  // 进行合并操作
  _merge(arr, start, mid, end)
}

function mergeSort(arr: number[]) {
  // 先将数组进行划分成两半再进行合并
  const len = arr.length
  if (!len) {
    return []
  }
  _mergeSort(arr, 0, len - 1)
}

test('mergeSort', () => {
  const a = [5, 1, 9, 11];
  mergeSort(a)
  expect(
    a
  ).toEqual([1, 5, 9, 11])
  const b = [5, 1, 7, 9, 11];
  mergeSort(b)
  expect(
    b
  ).toEqual([1, 5, 7, 9, 11])
})