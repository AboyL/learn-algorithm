// 2021-11-5
// 622. 设计循环队列

// 设计你的循环队列实现。 循环队列是一种线性数据结构，其操作表现基于 FIFO（先进先出）原则并且队尾被连接在队首之后以形成一个循环。它也被称为“环形缓冲器”。

// 循环队列的一个好处是我们可以利用这个队列之前用过的空间。在一个普通队列里，一旦一个队列满了，我们就不能插入下一个元素，即使在队列前面仍有空间。但是使用循环队列，我们能使用这些空间去存储新的值。

// 你的实现应该支持如下操作：

// MyCircularQueue(k): 构造器，设置队列长度为 k 。
// Front: 从队首获取元素。如果队列为空，返回 -1 。
// Rear: 获取队尾元素。如果队列为空，返回 -1 。
// enQueue(value): 向循环队列插入一个元素。如果成功插入则返回真。
// deQueue(): 从循环队列中删除一个元素。如果成功删除则返回真。
// isEmpty(): 检查循环队列是否为空。
// isFull(): 检查循环队列是否已满。


// 通过数组还是通过链表来实现队列呢？
// 通过数组实现队列，需要注意每次的移动
// 不过js的数组本身就有很多的队列特性了。。。。 从某种程度来说实现上本来就很简单了，根本不需要什么指针指过来指过去
// 因此这个题目的原意还是希望使用链表来实现

// 简易版本实现
export class MyCircularQueue1 {
  max: number
  list: number[] = []
  constructor(k: number) {
    this.max = k
  }

  enQueue(value: number): boolean {
    if (this.list.length === this.max) return false
    this.list.push(value)
    return true
  }

  deQueue(): boolean {
    if (this.list.length <= 0) return false
    this.list.shift()
    return true
  }

  Front(): number {
    const len = this.list.length
    return len ? this.list[0] : -1
  }

  Rear(): number {
    const len = this.list.length
    return len ? this.list[len - 1] : -1
  }

  isEmpty(): boolean {
    return this.list.length === 0
  }

  isFull(): boolean {
    return this.list.length === this.max
  }
}

// 数组实现
// 数组实现得话就需要有两个指针，一个表示头，一个表示尾部 对于数组来说，可以使用下标作为指针了
// 默认填充 
// 这里的关键点还是在于this的指向以及head跟tail的指向，其实没有必要非要进行一个限定到一个范围内，只要取值是对的就好了

export class MyCircularQueue {
  max: number
  list: number[] = []
  head: number = 0
  tail: number = 0
  size: number = 0
  constructor(k: number) {
    this.max = k
    this.list = Array(k).fill(null)
  }

  enQueue(value: number): boolean {
    if (this.isFull()) {
      return false
    }
    // tail开始往后面走
    this.list[(this.tail + 1) % this.max] = value
    ++this.size
    this.tail += 1
    return true
  }

  deQueue(): boolean {
    if (this.isEmpty()) {
      return false
    }
    this.list[(this.head + 1) % this.max] = -1
    this.head += 1
    this.size--
    return true
  }

  Front(): number {
    return this.isEmpty() ? -1 : this.list[(this.head + 1) % this.max]
  }

  Rear(): number {
    return this.isEmpty() ? -1 : this.list[(this.tail) % this.max]
  }

  isEmpty(): boolean {
    return this.size === 0
  }

  isFull(): boolean {
    return this.size === this.max
  }
}

test('MyCircularQueue2', () => {
  const circularQueue = new MyCircularQueue(2); // 设置长度为 2
  circularQueue.enQueue(1)
  circularQueue.enQueue(2)
  circularQueue.deQueue()
  circularQueue.enQueue(3)
  circularQueue.deQueue()
  circularQueue.enQueue(3)
  circularQueue.deQueue()
  circularQueue.enQueue(3)
  circularQueue.deQueue()
  expect(
    circularQueue.Front()
  ).toBe(3)
})

test('MyCircularQueue', () => {
  const circularQueue = new MyCircularQueue(3); // 设置长度为 3
  expect(
    circularQueue.enQueue(1)
  ).toBeTruthy()
  expect(
    circularQueue.deQueue()
  ).toBeTruthy()
  expect(
    circularQueue.enQueue(1)
  ).toBeTruthy()
  expect(
    circularQueue.deQueue()
  ).toBeTruthy()
  expect(
    circularQueue.Front()
  ).toBe(-1)
  expect(
    circularQueue.enQueue(1)
  ).toBeTruthy()
  expect(
    circularQueue.Rear()
  ).toBe(1)
  expect(
    circularQueue.Front()
  ).toBe(1)
  expect(
    circularQueue.enQueue(2)
  ).toBeTruthy()
  expect(
    circularQueue.enQueue(3)
  ).toBeTruthy()
  expect(
    circularQueue.enQueue(4)
  ).toBeFalsy()
  expect(
    circularQueue.Rear()
  ).toBe(3)
  expect(
    circularQueue.isFull()
  ).toBeTruthy()
  expect(
    circularQueue.deQueue()
  ).toBeTruthy()
  expect(
    circularQueue.enQueue(4)
  ).toBeTruthy()
  expect(
    circularQueue.Rear()
  ).toBe(4)
  // circularQueue.enQueue(1);  // 返回 true
  // circularQueue.enQueue(2);  // 返回 true
  // circularQueue.enQueue(3);  // 返回 true
  // circularQueue.enQueue(4);  // 返回 false，队列已满
  // circularQueue.Rear();  // 返回 3
  // circularQueue.isFull();  // 返回 true
  // circularQueue.deQueue();  // 返回 true
  // circularQueue.enQueue(4);  // 返回 true
  // circularQueue.Rear();  // 返回 4

})