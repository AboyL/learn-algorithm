export default {}
/*
 * @lc app=leetcode.cn id=148 lang=typescript
 *
 * [148] 排序链表
 */

// @lc code=start

class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}


// 确实可以使用快速排序 
// 可以先遍历一遍 链表 然后根据这个来

// 链表的交换不太一样
function swap(arr: ListNode[], left: number, right: number) {
  let t = arr[left]
  arr[left] = arr[right]
  arr[right] = t
}

function partition(arr: ListNode[], startIndex: number, endIndex: number) {
  //  从基准值开始进行计算
  const pivot: number = arr[startIndex].val
  let left = startIndex
  let right = endIndex
  while (left !== right) {
    while (arr[right].val > pivot && left < right) {
      right--
    }
    while (arr[left].val <= pivot && left < right) {
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

function quickSort(arr: ListNode[], startIndex: number = 0, endIndex: number = arr.length - 1) {
  if (startIndex >= endIndex) {
    return
  }
  const pivotIndex: number = partition(arr, startIndex, endIndex)
  quickSort(arr, startIndex, pivotIndex - 1)
  quickSort(arr, pivotIndex + 1, endIndex)
}

function sortList(head: ListNode | null): ListNode | null {
  // 获取用于遍历的数组
  if (!head) {
    return null
  }
  const list: ListNode[] = []
  while (head) {
    list.push(head)
    head = head.next
  }
  quickSort(list)
  // 对链表进行一次重组
  for (let i = 0; i < list.length; i++) {
    list[i].next = list[i + 1] || null
  }
  return list[0]
};
// @lc code=end

