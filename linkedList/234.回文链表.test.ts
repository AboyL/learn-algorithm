/*
 * @lc app=leetcode.cn id=234 lang=typescript
 *
 * [234] 回文链表
 */

// @lc code=start


export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}


// 回文链表的特征是什么？
// 是最后一个数据跟第一个数据一样 那么是否可以直接构建两个链表数组来进行判断
// 进一步优化，其实只需要一个数组就好了
function isPalindrome1(head: ListNode | null): boolean {
  const positiveSequence: number[] = []
  const reverseSequence: number[] = []
  let current = head
  while (current) {
    positiveSequence.push(current.val)
    reverseSequence.unshift(current.val)
    current = current.next
  }
  for (let i = 0; i < positiveSequence.length; i++) {
    if (positiveSequence[i] !== reverseSequence[i]) {
      return false
    }
  }
  return true
};

function isPalindrome(head: ListNode | null): boolean {
  const sequence: number[] = []
  let current = head
  while (current) {
    sequence.push(current.val)
    current = current.next
  }
  for (let i = 0, j = sequence.length - 1; i < j; i++, j--) {
    if (sequence[i] !== sequence[j]) {
      return false
    }
  }
  return true
};

test('isPalindrome', () => {
  const generateLinkedList = (arr: number[]) => {
    const head = new ListNode(arr[0], null)
    let current = head;
    for (let i = 1; i < arr.length; i++) {
      current.next = new ListNode(arr[i], null)
      current = current.next
    }
    return head
  }

  expect(isPalindrome(generateLinkedList([1, 2, 2, 1]))).toBeTruthy()
  expect(isPalindrome(generateLinkedList([1, 2, 3, 2, 1]))).toBeTruthy()

  expect(isPalindrome(generateLinkedList([1, 2, 2]))).toBeFalsy()

})
// @lc code=end

