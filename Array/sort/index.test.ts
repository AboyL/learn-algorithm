import { cloneDeep } from 'lodash'

// 选择排序
const selectionSort = (outArr: number[]) => {
  const arr = cloneDeep(outArr)
  const len = arr.length
  for (let i = 0; i < len; i++) {
    let minIndex = i
    for (let j = i; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    // 调换内容
    const tem = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = tem
  }
  return arr
}

// 插入排序
const insetionSort = (outArr: number[]) => {
  const arr = cloneDeep(outArr)
  const len = arr.length
  for (let i = 1; i < len; i++) {
    let temValue = arr[i]
    let j
    for (j = i; j > 0 && arr[j - 1] > temValue; j--) {
      arr[j] = arr[j-1]
    }
    arr[j] = temValue
  }
  return arr
}




test('Binary search', () => {
  const arr1 = [3, 1, 2]
  const arr2 = [9, 0, 1, 3, 1]
  expect(selectionSort(arr1)).toEqual([1, 2, 3])
  expect(selectionSort(arr2)).toEqual([0, 1, 1, 3, 9])


  expect(insetionSort(arr1)).toEqual([1, 2, 3])
  expect(insetionSort(arr2)).toEqual([0, 1, 1, 3, 9])

})