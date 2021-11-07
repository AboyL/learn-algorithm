// 2021-11-06
// 24 swap-nodes-in-pairs
// 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

// 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。


class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}


// 思路只需要进行一次简单的递归就好了
function swapPairs(head: ListNode | null): ListNode | null {
  // 小于1的长度就不处理了
  if (!head || !head.next) {
    return head
  }
  // 将第一个元素跟第二个元素进行位置调换
  // 下一轮的递归的返回值作为当前论调换位置的next
  const newHead = head.next.next // 下一轮递归开头的head
  // 进行调换
  const nextHead=head.next // 最后返回的头元素
  head.next.next = head
  head.next = swapPairs(newHead)
  return nextHead
};

test('swapPairs', () => {
  expect(swapPairs({
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
  })).toEqual(
    {
      val: 2,
      next: {
        val: 1,
        next: {
          val: 4,
          next: {
            val: 3,
            next: null
          }
        }
      }
    }
  )
})