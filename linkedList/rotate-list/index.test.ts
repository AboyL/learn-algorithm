// 2021-11-05
// 61. 旋转链表
// 给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。


class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}


// 可以使用递归来进行实现 但是会有非常大的效率问题
// 可以先做一遍遍历保存到数组里面再进行取余处理
function rotateRight(head: ListNode | null, k: number): ListNode | null {
  if (!head) {
    return null
  }
  let current: ListNode | null = head // current表示当前遍历的节点
  const nodeArr: ListNode[] = [] // 表示链表与数组的对应关系
  while (current) {
    nodeArr.push(current)
    current = current.next
  }
  const len = nodeArr.length
  const needMove = k%len
  // 表示不需要进行遍历了
  if (len == 1 || needMove === 0) {
    return head
  }
  // 开始进行移动
  // 将len-k位置的元素变成首元素
  // 将末尾位置的元素的next指向原来head
  // 将len-needMove-1位置的元素的next置为null
  const newHead = nodeArr[len - needMove]
  nodeArr[len - 1].next = head
  nodeArr[len - needMove - 1].next = null
  return newHead
};

test('rotateRight', () => {
  expect(rotateRight({
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
      val: 4,
      next: {
        val: 5,
        next: {
          val: 1,
          next: {
            val: 2,
            next: {
              val: 3,
              next: null
            }
          }
        }
      }
    }
  )
})