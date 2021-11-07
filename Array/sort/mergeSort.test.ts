import { cloneDeep } from 'lodash'

// 将arr[l...mid]以及arr[mid+1,r] 进行归并 此时左右两边是好的
const _merge = (outArr: number[], l: number, mid: number, r: number) => {
  const arr = []
  // 需要处理偏移量

  for (let i = l; i <= r; i++) {
    arr[i - l] = outArr[i]
  }
  let i = l; // 左边的游标
  let j = mid + 1 // 右边的游标
  for (let k = l; k <= r; k++) {
    if (i > mid) {
      outArr[k] = arr[j - l]
      j++
    } else if (j > r) {
      outArr[k] = arr[i - l]
      i++
    } else if (arr[i - l] < arr[j - l]) {
      outArr[k] = arr[i - l]
      i++
    } else {
      outArr[k] = arr[j - l]
      j++
    }
  }


}
// 递归使用归并排序 对arr[l,r]的范围进行排序
const _mergeSort = (outArr: number[], l: number, r: number) => {
  if (l >= r) {
    return
  }
  // 可以设置一个常量 使用插入排序进行优化
  const mid = Math.floor((l + r) / 2)

  // 分成两半 对左边进行排序
  _mergeSort(outArr, l, mid)
  // 对右边进行排序
  _mergeSort(outArr, mid + 1, r)
  // 此时左右两边各自有序 可以进行合并了
  // 对有序的内容进行优化  假如排序的内容是近乎有序的内容 可以进行排序
  if (outArr[mid] > outArr[mid + 1]) {
    _merge(outArr, l, mid, r)
  }
}

// 归并排序
const mergeSort = (outArr: number[]) => {
  // 需要注意定义 每个变量 每个参数都是有意义的
  _mergeSort(outArr, 0, outArr.length - 1)
}


// 自底向上的归并排序
const mergeSortBU = (outArr: number[]) => {
  const n = outArr.length
  for (let size = 1; size <= n; size *= 2) {
    for (let i = 0; i + size < n; i += 2 * size) {
      // 对arr[i,i+size-1] 到 arr[i+size,i+size+size-1] 进行归并
      _merge(outArr, i, i + size - 1, Math.min(i + size + size - 1, n - 1))
    }
  }
}


test('mergeSort', () => {
  const arr1 = [3, 2, 1, 5]
  const arr2 = [9, 0, 1, 3, 1]
  mergeSort(arr1)
  expect(arr1).toEqual([1, 2, 3, 5])
  mergeSort(arr2)
  expect(arr2).toEqual([0, 1, 1, 3, 9])


  const arr3 = [3, 2, 1, 5]
  const arr4 = [9, 0, 1, 3, 1]
  mergeSortBU(arr3)
  expect(arr3).toEqual([1, 2, 3, 5])
  mergeSortBU(arr4)
  expect(arr4).toEqual([0, 1, 1, 3, 9])




})