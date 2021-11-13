// 2021-11-12
// 2. 两数相加
// 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。



class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}


// 理清题目
// 高清进位关系
// 递归处理子节点
// 还是很快的，前面就是没有理清楚题目导致的问题
const getLinkedByNumber = (value: number): ListNode => {
  let newNode: ListNode | null = null
  if (value < 10) {
    newNode = new ListNode(value, null)
    return newNode
  } else {
    // 需要根据数组反向生成链表
    const nextValue = Math.floor(value / 10)
    const nextNode = getLinkedByNumber(nextValue)
    newNode = new ListNode(value % 10, nextNode)

  }
  return newNode
}

// 增加一个进位的参数
// 但是这里需要考虑的是在最后一步进行了进位应该怎么办
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null, additionalNumber: number = 0): ListNode | null {
  if (!l1 && !l2 && additionalNumber === 0) {
    return null
  }
  let value = (l1?.val || 0) + (l2?.val || 0) + additionalNumber
  const nextList = addTwoNumbers(l1?.next || null, l2?.next || null, Math.floor(value / 10))
  const newNode = getLinkedByNumber(value % 10)
  newNode.next = nextList
  return newNode
};

console.log(addTwoNumbers({
  val: 2,
  next: {
    val: 4,
    next: {
      val: 3,
      next: null
    }
  }
}, {
  val: 5,
  next: {
    val: 6,
    next: {
      val: 4,
      next: null
    }
  }
}))

console.log(addTwoNumbers({
  val: 9,
  next: {
    val: 2,
    next: null
  }
}, {
  val: 3,
  next: {
    val: 4,
    next: null
  }
}))


test('addTwoNumbers', () => {
  expect(addTwoNumbers({
    val: 2,
    next: {
      val: 4,
      next: {
        val: 3,
        next: null
      }
    }
  }, {
    val: 5,
    next: {
      val: 6,
      next: {
        val: 4,
        next: null
      }
    }
  })).toEqual(
    {
      val: 7,
      next: {
        val: 0,
        next: {
          val: 8,
          next: null
        }
      }
    }
  )
})

test('addTwoNumbers', () => {
  expect(addTwoNumbers({
    val: 9,
    next: {
      val: 2,
      next: null
    }
  }, {
    val: 3,
    next: {
      val: 4,
      next: null
    }
  })).toEqual(
    {
      val: 2,
      next: {
        val: 7,
        next: null
      }
    }
  )
})