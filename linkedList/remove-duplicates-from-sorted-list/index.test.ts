// 2021-11-04
// 83. 删除排序链表中的重复元素
// 存在一个按升序排列的链表，给你这个链表的头节点 head ，请你删除所有重复的元素，使每个元素 只出现一次 。
// 返回同样按升序排列的结果链表。



// Definition for singly-linked list.
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}


function deleteDuplicates(head: ListNode | null): ListNode | null {
  if (head === null) {
    return null
  }
  // 因为是排序数组,所以只需要检查next是否存在切next的val是不是与当前的值是不是相等即可
  let current=head
  while (head) {
    if (head.next && head.next.val === head.val) {
      head.next = head.next.next
    } else {
      head = head.next
    }
  }
  return current
};


test('deleteDuplicates', () => {
  expect(deleteDuplicates({
    val: 1,
    next: {
      val: 1,
      next: {
        val: 2,
        next: null
      }
    }
  })).toEqual(
    {
      val: 1,
      next: {
        val: 2,
        next: null
      }
    }
  )
})