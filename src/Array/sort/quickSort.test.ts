// 快速排序

import { cloneDeep } from 'lodash'

function swap<T = number>(arr: T[], a: number, b: number) {
  const t: T = arr[a]
  arr[a] = arr[b]
  arr[b] = t
}

// 对 arr[l,r]进行一次partition操作
// 返回p 使 arr[l,p-1]>arr[p] arr[p+1,r]>arr[p]
const _partition = (arr: number[], l: number, r: number): number => {

  // 随机数优化
  swap<number>(arr, l, Math.floor(Math.random() * (r - l + 1)) + l)
  const v: number = arr[l] // 默认基准为第一个元素
  // arr[l+1...p]<v arr[p+1...i) 大于v
  let p = l
  for (let i = l + 1; i <= r; i++) {
    if (arr[i] < v) {
      swap(arr, i, p + 1)
      // 进行一次位置交换
      p++
    }
  }
  // 交换l 跟p 
  swap(arr, l, p)
  return p
}

// 对数组 arr[l...r]部分进行排序
const _quickSort = (arr: number[], l: number, r: number) => {
  if (l >= r) {
    return
  }
  const p: number = _partition(arr, l, r);
  _quickSort(arr, l, p - 1)
  _quickSort(arr, p + 1, r)
}

/**
 * 
 * @param arr 要排序的数组
 */
const quickSort = (arr: number[]) => {
  // 定义n为数组的长度
  const n: number = arr.length
  _quickSort(arr, 0, n - 1)
}


// 双路快排
// 对 arr[l,r]进行一次partition操作
// 返回p 使 arr[l,p-1]>arr[p] arr[p+1,r]>arr[p]
const _partition2 = (arr: number[], l: number, r: number): number => {

  // 随机数优化
  swap<number>(arr, l, Math.floor(Math.random() * (r - l + 1)) + l)
  const v: number = arr[l]
  // arr[l+1...i)<=v arr(j...r) >=v
  let i = l + 1;
  let j = r;
  while (true) {
    while (i <= r && arr[i] < v) i++;
    while (j >= l + 1 && arr[j] > v) j--;
    if (i > j) {
      break
    }
    swap(arr, i, j)
    i++
    j--
  }
  return j
}

// 对数组 arr[l...r]部分进行排序
const _quickSort2 = (arr: number[], l: number, r: number) => {
  if (l >= r) {
    return
  }
  const p: number = _partition2(arr, l, r);
  _quickSort2(arr, l, p - 1)
  _quickSort2(arr, p + 1, r)
}

/**
 * 
 * @param arr 要排序的数组
 */
const quickSort2 = (arr: number[]) => {
  // 定义n为数组的长度
  const n: number = arr.length
  _quickSort(arr, 0, n - 1)
}

test('quickSort', () => {
  const arr1 = [3, 2, 1, 5]
  const arr2 = [9, 0, 1, 3, 1]
  quickSort(arr1)
  expect(arr1).toEqual([1, 2, 3, 5])
  quickSort(arr2)
  expect(arr2).toEqual([0, 1, 1, 3, 9])


  const arr3 = [3, 2, 1, 5]
  const arr4 = [9, 0, 1, 3, 1]
  quickSort2(arr3)
  expect(arr3).toEqual([1, 2, 3, 5])
  quickSort2(arr4)
  expect(arr4).toEqual([0, 1, 1, 3, 9])

})