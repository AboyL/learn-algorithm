// 2021-11-10
// 25. K 个一组翻转链表
// 给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。
// k 是一个正整数，它的值小于或等于链表的长度。
// 如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

// 进阶：
// 你可以设计一个只使用常数额外空间的算法来解决此问题吗？
// 你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。

class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}


// 思路还是递归
// 先从反转链表出发，
// 需要一个dummyHead来进行处理吧
// 一个问题是，假如我走到最后没有k个呢？先遍历一遍再进行一遍？或者进行一次反向遍历呢?
// 可以直接进行反向遍历
function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  if (!head || k === 1) {
    return head
  }
  // const dummyHead:ListNode={val:0,next:head}
  let index = 1 // 当前要旋转的第几个
  let next = head.next
  let current = head
  let oldCurrnet = current
  while (next && index < k) {
    // 保留数据
    oldCurrnet = current
    current = next
    next = next.next
    current.next = oldCurrnet
    ++index
  }
  if (index < k) {
    // 对自身再做一次反转
    head.next=null
    return reverseKGroup(current, index)
  } else {
    head.next = reverseKGroup(next, k)
  }
  return current
};

test('reverseKGroup', () => {
  expect(reverseKGroup({
    val: 1,
    next: {
      val: 2,
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
  }, 2)).toEqual(
    {
      val: 2,
      next: {
        val: 1,
        next: {
          val: 4,
          next: {
            val: 3,
            next: {
              val: 5,
              next: null
            }
          }
        }
      }
    }
  )

  expect(reverseKGroup({
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
  }, 2)).toEqual(
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

  expect(reverseKGroup({
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
  }, 3)).toEqual(
    {
      val: 3,
      next: {
        val: 2,
        next: {
          val: 1,
          next: {
            val: 4,
            next: null
          }
        }
      }
    }
  )
})


test('reverseKGroup2', () => {

  expect(reverseKGroup({
    val: 1,
    next: {
      val: 2,
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
  }, 3)).toEqual(
    {
      val: 3,
      next: {
        val: 2,
        next: {
          val: 1,
          next: {
            val: 4,
            next: {
              val: 5,
              next: null
            }
          }
        }
      }
    }
  )

})