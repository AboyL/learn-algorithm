// 快速排序

function swap<T = number>(arr: T[], a: number, b: number) {
  const t: T = arr[a]
  arr[a] = arr[b]
  arr[b] = t
}


// 对数组 arr[l...r]部分进行排序
const _quickSort3 = (arr: number[], l: number, r: number) => {
  if (l > r) {
    return
  }
  // 随机数优化
  swap<number>(arr, l, Math.floor(Math.random() * (r - l + 1)) + l)
  const v: number = arr[l]

  let lt = l;//arr[l+1,lt]<v
  let gt = r + 1;//arr[gt,r]>v
  let i = l + 1;//arr[lt+1,i)===v

  while (i < gt) {
    if (arr[i] < v) {
      swap(arr, i, lt + 1)
      lt++
      i++
    } else if (arr[i] > v) {
      swap(arr, i, gt - 1)
      gt--
      // i 不--
    } else {
      i++
    }
  }
  swap(arr, l, lt)
  _quickSort3(arr, l, lt - 1)
  _quickSort3(arr, gt, r)
}

/**
 * 
 * @param arr 要排序的数组
 */
const quickSort3 = (arr: number[]) => {
  // 定义n为数组的长度
  const n: number = arr.length
  _quickSort3(arr, 0, n - 1)
}


test('quickSort3  三路快排 ', () => {
  const arr1 = [3, 2, 1, 5]
  const arr2 = [9, 0, 1, 3, 1]
  quickSort3(arr1)
  expect(arr1).toEqual([1, 2, 3, 5])
  quickSort3(arr2)
  expect(arr2).toEqual([0, 1, 1, 3, 9])
})