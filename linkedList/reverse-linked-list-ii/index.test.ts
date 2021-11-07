// 2021-11-04
// 92. 反转链表 II
// 给你单链表的头指针 head 和两个整数 left 和 right ，
// 其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 


// Definition for singly - linked list.
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

// 反转链表1
function reverseBetween1(head: ListNode | null): ListNode | null {
  if (!head) {
    return null
  }
  // 
  let next = head.next
  let current = head
  let oldCurrnet = current
  while (next) {
    // 保留数据
    oldCurrnet = current
    current = next
    next = next.next
    current.next = oldCurrnet
  }
  head.next = null
  return current
};

// 反转链表2 带偏移量的
function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
  if (!head) {
    return null
  }
  // 先找到left节点以及left前面的节点 从left开始进行反转 直到right停止反转
  let index = 1
  let leftNode = head
  let originLeftNode = leftNode
  // 找到初始节点
  while (index !== left && leftNode.next) {
    originLeftNode = leftNode
    leftNode = leftNode.next
    ++index
  }

  let next = leftNode.next
  let current = leftNode
  let oldCurrnet = current
  // 表示下一个要处理的节点是什么 明确变量定义
  let nextIndex=index+1
  while (next && nextIndex <= right) {
    // 保留数据
    oldCurrnet = current
    current = next
    next = next.next
    current.next = oldCurrnet
    ++nextIndex
  }
  leftNode.next = next
  if (originLeftNode !== leftNode) {
    // 表示不是从1开始的
    originLeftNode.next = current
    return head
  }
  return current
};

test('reverseBetween', () => {
  expect(reverseBetween({
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
  }, 2, 4)).toEqual(
    {
      val: 1,
      next: {
        val: 4,
        next: {
          val: 3,
          next: {
            val: 2,
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