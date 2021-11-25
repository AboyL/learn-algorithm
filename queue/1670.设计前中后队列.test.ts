/*
 * @lc app=leetcode.cn id=1670 lang=typescript
 *
 * [1670] 设计前中后队列
 */

// @lc code=start

// 猜测需要三个指针，一个指针是一个慢指针
// 或者直接根据size来进行判断
// 直接用链表来做吧

class FrontMiddleBackQueueListNode {
  val: number
  next: FrontMiddleBackQueueListNode | null
  pre: FrontMiddleBackQueueListNode | null

  constructor(val?: number, next?: FrontMiddleBackQueueListNode | null, pre?: FrontMiddleBackQueueListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
    this.pre = (pre === undefined ? null : pre)
  }
}

class FrontMiddleBackQueue {
  dummyHead: FrontMiddleBackQueueListNode
  tail: FrontMiddleBackQueueListNode
  size: number = 0
  constructor() {
    this.dummyHead = new FrontMiddleBackQueueListNode(-1)
    this.tail = this.dummyHead
  }

  pushFront(val: number): void {
    const newNode = new FrontMiddleBackQueueListNode(val, this.dummyHead.next, this.dummyHead)
    if (this.dummyHead.next) {
      this.dummyHead.next.pre = newNode
    }
    this.dummyHead.next = newNode
    // 表示此时没有最后一个
    if (this.tail === this.dummyHead) {
      this.tail = newNode
    }
    this.size++
  }

  pushMiddle(val: number): void {
    if (this.size === 0) {
      this.pushFront(val)
      return
    }
    let mid = this.size / 2
    let current = this.dummyHead
    while (current.next && mid >= 1) {
      current = current.next
      --mid
    }
    const newNode = new FrontMiddleBackQueueListNode(val, current.next, current)
    if (current.next) {
      current.next.pre = newNode
    }
    current.next = newNode
    this.size++
  }

  pushBack(val: number): void {
    if (this.tail === this.dummyHead) {
      this.pushFront(val)
      return
    } else {
      this.tail.next = new FrontMiddleBackQueueListNode(val, null, this.tail);
      this.tail = this.tail.next;
    }
    this.size++
  }

  popFront(): number {
    if (this.dummyHead.next) {
      const v = this.dummyHead.next.val
      this.dummyHead.next = this.dummyHead.next.next
      if (this.dummyHead.next) {
        this.dummyHead.next.pre = this.dummyHead
      }
      this.size--
      if (this.size === 0) {
        this.tail = this.dummyHead
      }
      return v
    }
    return -1
  }

  popMiddle(): number {
    if (this.tail !== this.dummyHead) {
      let mid = this.size / 2
      let current = this.dummyHead
      while (current.next && mid > 0) {
        current = current.next
        --mid
      }
      if (current.pre) {
        current.pre.next = current.next
        if (current.pre.next) {
          current.pre.next.pre = current.pre
        }
      }
      this.size--
      if (this.size === 0) {
        this.tail = this.dummyHead
      }
      return current.val
    }
    return -1
  }

  popBack(): number {
    if (this.tail !== this.dummyHead) {
      const v = this.tail.val
      // 这里还是需要用pre来处理一下得好
      if (this.tail.pre) {
        this.tail.pre.next = this.tail.next
        if (this.tail.pre.next) {
          this.tail.pre.next.pre = this.tail.pre
        }
        this.tail = this.tail.pre
      }
      this.size--
      if (this.size === 0) {
        this.tail = this.dummyHead
      }
      return v
    }

    return -1
  }
}


test('FrontMiddleBackQueue', () => {
  const queue = new FrontMiddleBackQueue()
  const testMethodArr = ["pushFront", "pushBack", "pushMiddle", "pushMiddle", "popFront", "popMiddle", "popMiddle", "popBack", "popFront"]


  const parameterArr = [[1], [2], [3], [4], [], [], [], [], []]

  const expectArr = [undefined, undefined, undefined, undefined, 1, 3, 4, 2, -1]

  testMethodArr.forEach((v, index) => {
    expect((queue as any)[v](...parameterArr[index])).toEqual(expectArr[index])
  })
})
/**
 * Your FrontMiddleBackQueue object will be instantiated and called as such:
 * var obj = new FrontMiddleBackQueue()
 * obj.pushFront(val)
 * obj.pushMiddle(val)
 * obj.pushBack(val)
 * var param_4 = obj.popFront()
 * var param_5 = obj.popMiddle()
 * var param_6 = obj.popBack()
 */
// @lc code=end

