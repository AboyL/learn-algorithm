// 2021-11-07
// 19 remove-nth-node-from-end-of-list
// 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

// 进阶：你能尝试使用一趟扫描实现吗？


class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}


// 问题的难点在于怎么知道是倒数
// 1. 遍历两边
// 2. 通过数组进行存储
// 3. 双指针解法 可以达到速度On 空间On
// 双指针解法
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  if (!head) {
    return null
  }
  let current: ListNode | null = head
  let leftNode: ListNode | null = head
  let index = 0 // 实际偏移量 走到n的时候两个指针一起移动
  // 最后的变化应该是 leftNode.next=leftNode.next.next 
  // 因此最后的时候leftNode应该是要被删除的节点的前一个节点
  while (current && leftNode) {
    current = current.next
    if (index > n) {
      // 左边的指针也一起开始移动
      leftNode = leftNode?.next
    }
    ++index
  }
  if(n===index){
    return head.next
  }
  // 进行调换
  if(leftNode){
    leftNode.next=leftNode.next!.next
  }
  return head
};

function removeNthFromEnd1(head: ListNode | null, n: number): ListNode | null {
  if (!head) {
    return null
  }
  let current: ListNode | null = head // current表示当前遍历的节点
  const nodeArr: ListNode[] = [] // 表示链表与数组的对应关系
  while (current) {
    nodeArr.push(current)
    current = current.next
  }
  const nodeListLen = nodeArr.length
  // 计算需返回哪个 除了当删除第一个以外返回第二个节点
  if (n === nodeListLen) {
    if (head.next) {
      return head.next
    }
    return null
  }
  // 删除对应节点
  const targetPreNode = nodeArr[nodeListLen - n - 1]
  const targetNode = nodeArr[nodeListLen - n]
  targetPreNode.next = targetNode.next
  return head
};



test('removeNthFromEnd', () => {
  expect(removeNthFromEnd({
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
      val: 1,
      next: {
        val: 2,
        next: {
          val: 3,
          next: {
            val: 5,
            next: null
          }
        }
      }
    }
  )
})