// 2021-11-09
// 82. 删除排序链表中的重复元素 II
// 存在一个按升序排列的链表，给你这个链表的头节点 head 
// 请你删除链表中所有存在数字重复情况的节点，只保留原始链表中 没有重复出现 的数字。
// 返回同样按升序排列的结果链表。


class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}


// 第一个想法就是Map
// 因为是升序数组，所以可以用三指针来匍匐前进
// fast先走 low进行记录 pre用于删除
// 使用虚拟节点来处理当第一个节点要被删除的情况
function deleteDuplicates(head: ListNode | null): ListNode | null {
  if (!head) {
    return null
  }
  const dummyHead: ListNode = { val: 0, next: head }
  let fast: ListNode | null = head
  let slow: ListNode | null = head
  let pre: ListNode | null = dummyHead
  let flag = false // 表示此时处于应该删除状态下
  while (fast) {
    // 表示应该都向前一步
    if (fast.val !== slow?.val && !flag) {
      pre = slow
      slow = fast
    }
    // 此时应该执行删除操作
    // 删除后
    if (fast.val !== slow?.val && flag) {
      pre.next = fast
      slow = fast
      flag = false
    }

    // 表示此时应该进行处理
    // 注意当fast与slow为同一指针的时候表示当前是初始状态
    if (fast.val === slow?.val && fast !== slow) {
      flag = true
    }

    fast = fast.next
  }

  // 当为 xxxbbb的时候对最后的尾数进行删除
  if (slow !== fast && flag) {
    pre.next = null
  }
  return dummyHead.next
};

test('deleteDuplicates', () => {
  expect(deleteDuplicates({
    val: 1,
    next: {
      val: 1,
      next: {
        val: 3,
        next: {
          val: 4,
          next: {
            val: 5,
            next: null
          }
        }
      }
    }
  })).toEqual(
    {
      val: 3,
      next: {
        val: 4,
        next: {
          val: 5,
          next: null
        }
      }
    }
  )

  expect(deleteDuplicates({
    val: 1,
    next: {
      val: 1,
      next: {
        val: 3,
        next: {
          val: 5,
          next: {
            val: 5,
            next: null
          }
        }
      }
    }
  })).toEqual(
    {
      val: 3,
      next: null
    }
  )
})