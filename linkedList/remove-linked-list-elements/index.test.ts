// 2021-11-11
// 203 remove-linked-list-elements
// 给你一个链表的头节点 head 和一个整数 val ，请你删除链表中所有满足 Node.val == val 的节点，并返回 新的头节点 。

class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}



// 虚拟头结点 来做一个判断 很简单就完事了
// 不使用虚拟头结点就需要做很多的判断 很麻烦
function removeElements1(head: ListNode | null, val: number): ListNode | null {
  const dummyHead: ListNode = {
    val: -1,
    next: head
  }

  let current = dummyHead
  while (current.next) {
    if (current.next.val === val) {
      current.next = current.next.next
    } else {
      current = current.next
    }
  }
  return dummyHead.next
};

// 通过递归来实现
function removeElements(head: ListNode | null, val: number): ListNode | null {
  if (!head) {
    return head
  }

  head.next = removeElements(head.next, val)

  return head.val === val ? head.next : head
};


// 一个判断函数
const judge = (head: any) => {
  return Math.random() * 10 > head.val ? true : false
}

function dealWithLinkedList(head: ListNode | null, val: number): ListNode | null {
  if (!head) {
    return head
  }

  head.next = dealWithLinkedList(head.next, val)

  return judge(head) ? head.next : head
};

test('removeElements', () => {
  expect(removeElements({
    val: 1,
    next: {
      val: 2,
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
  }, 2)).toEqual(
    {
      val: 1,
      next: {
        val: 3,
        next: {
          val: 5,
          next: null
        }
      }
    }
  )
})