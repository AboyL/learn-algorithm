// 2021-11-22

/*
 * @lc app=leetcode.cn id=969 lang=typescript
 *
 * [969] 煎饼排序
 */


// 给你一个整数数组 arr ，请使用 煎饼翻转 完成对数组的排序。

// 一次煎饼翻转的执行过程如下：

// 选择一个整数 k ，1 <= k <= arr.length
// 反转子数组 arr[0...k-1]（下标从 0 开始）
// 例如，arr = [3,2,1,4] ，选择 k = 3 进行一次煎饼翻转，反转子数组 [3,2,1] ，得到 arr = [1,2,3,4] 。

// 以数组形式返回能使 arr 有序的煎饼翻转操作所对应的 k 值序列。任何将数组排序且翻转次数在 10 * arr.length 范围内的有效答案都将被判断为正确。

// @lc code=start

// 这个题目的核心不是进行排序，而是进行煎饼排序，返回的是煎饼排序的数组，那么怎么进行处理？
// 虽然看起来很复杂，但是，但是是否是只需要按照 这个数组进行反转就可以了吗
// 那么答案就很简单了，先找到最大的位置，根据这个进行一次反转，把最大的反转到第一位，然后再进行一次反转
// 循环判断得到最后的结果
// 最后需要反转的次数为 2*len

// 对一个数组进行煎饼反转
const pancake = (arr: number[], n: number) => {
  if (n > 1) {
    for (let i = 0, j = n - 1; i < j; i++, j--) {
      const tem = arr[i]
      arr[i] = arr[j]
      arr[j] = tem
    }
  }
}

function pancakeSort(arr: number[]): number[] {

  let lastIndex = arr.length - 1
  let len = arr.length
  if (len <= 1) {
    return []
  }
  let maxIndex = 0
  let max = 0
  let pancakeArr=[]
  while (lastIndex !== 0) {
    // 找到最大的数字
    for (let i = 0; i <= lastIndex; i++) {
      if (arr[i] > max) {
        max = arr[i]
        maxIndex = i
      }
    }
    // 一轮结束 此时应该找到 先从maxIndex反转到最开始
    // 再进行一轮反转到最后
    pancake(arr, maxIndex+1)
    pancake(arr, lastIndex+1)
    pancakeArr.push(maxIndex+1,lastIndex+1)
    --lastIndex
    max=0
    maxIndex=0
  }
  return pancakeArr
};

// @lc code=end

