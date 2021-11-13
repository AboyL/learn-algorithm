
// 实现一个双向链表
export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}


class LinkedList {
  size: number = 0
  // 虚拟头结点 用于进行删除添加这些操作
  dummyHead: ListNode

  constructor() {
    this.dummyHead = new ListNode(-1, null)
  }


  getSize() {
    return this.size
  }


  // index为0的时候表示在头结点加上节点
  add(index: number, e: number) {
    if (index < 0 || index > this.size) {
      throw Error("add failed. Index is illegal.");
    }

    let prev = this.dummyHead
    for (let i = 0; i < index && prev.next; i++)
      prev = prev.next;

    prev.next = new ListNode(e, prev.next);
    // 尾指针进行移动
    this.size++
  }

  addFirst(n: number) {
    this.add(0, n)
  }

  addLast(n: number) {
    // 这个时候就需要从后面进行添加了
    this.add(this.size, n);
  }

  // 返回一个对应的子节点
  get(index: number) {
    if (index < 0 || index >= this.size) {
      throw Error("get failed. Index is illegal.");
    }

    let current: ListNode | null = this.dummyHead
    let curIndex = 0
    while (curIndex < index && curIndex && current) {
      current = current.next
      curIndex++
    }

    return current?.next || null
  }

  getFist() {
    return this.get(0)
  }

  // 修改链表的第index(0-based)个位置的元素为e
  set(index: number, n: number) {
    if (index < 0 || index >= this.size) {
      throw Error("set failed. Index is illegal.");
    }

    let current: ListNode | null = this.dummyHead.next
    for (let i = 0; i < index && current; i++) {
      current = current?.next
    }
    if (current) {
      current.val = n
    }
  }

  contains(n: number) {
    let current: ListNode | null = this.dummyHead.next
    while (current) {
      if (current?.val === n) {
        return true
      }
      current = current?.next
    }
    return false
  }

  // 删除节点
  remove(index: number) {
    if (index < 0 || index >= this.size) {
      throw Error("Remove failed. Index is illegal.");
    }

    let pre: ListNode | null = this.dummyHead
    for (let i = 0; i < index && pre; i++) {
      pre = pre.next
    }
    pre!.next = pre?.next?.next || null
    this.size--
  }

  removeFirst() {
    this.remove(0)
  }

  removeLast() {
    this.remove(this.size - 1)
  }

  removeElement(n: number) {
    let pre = this.dummyHead
    while (pre.next) {
      if (pre.next.val === n) {
        break
      }
      pre = pre.next
    }
    if (pre.next !== null) {
      pre.next = pre.next.next
      this.size--
    }
  }

  toString() {
    let str = ``
    let current = this.dummyHead.next
    while (current) {
      str += `${current.val}=>`
      current = current.next
    }
    str += current
    return str
  }
}

const l1 = new LinkedList()
l1.addLast(1)
l1.addLast(2)
l1.addLast(3)
console.log(l1.toString())
l1.set(1, 5)
l1.remove(2)
console.log(l1.toString())
l1.removeLast()
console.log(l1.toString())
l1.addLast(1)
l1.addLast(3)
l1.addLast(2)
console.log(l1.toString())
l1.removeElement(3)
console.log(l1.toString())



