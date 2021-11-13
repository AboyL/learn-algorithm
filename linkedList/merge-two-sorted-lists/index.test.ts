// 2021-11-13
// 21. 合并两个有序链表
// 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 


export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}


// 直接遍历合并就好了
function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {

  const newDummyHead = new ListNode(-1, null)
  let current = newDummyHead
  while (l1 || l2) {
    if (l1 && (!l2 || l1.val < l2.val)) {
      current.next = l1
      l1 = l1.next
      current.next.next = null
      current = current.next
    } else if (l2) {
      current.next = l2
      l2 = l2.next
      current.next.next = null
      current = current.next
    }
  }

  return newDummyHead.next
};


test('mergeTwoLists', () => {
  expect(mergeTwoLists({
    val: 1,
    next: {
      val: 3,
      next: null
    }
  }, {
    val: 2,
    next: {
      val: 4,
      next: null
    }
  })).toEqual(
    {
      val: 1,
      next: {
        val: 2,
        next: {
          val: 3,
          next: {
            val: 4,
            next: null
          }
        }
      }
    }
  )
})