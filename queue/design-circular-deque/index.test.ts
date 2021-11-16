// 2021-11-16
// 641. 设计循环双端队列
// 设计实现双端队列。
// 你的实现需要支持以下操作：

// MyCircularDeque(k)：构造函数,双端队列的大小为k。
// insertFront()：将一个元素添加到双端队列头部。 如果操作成功返回 true。
// insertLast()：将一个元素添加到双端队列尾部。如果操作成功返回 true。
// deleteFront()：从双端队列头部删除一个元素。 如果操作成功返回 true。
// deleteLast()：从双端队列尾部删除一个元素。如果操作成功返回 true。
// getFront()：从双端队列头部获得一个元素。如果双端队列为空，返回 -1。
// getRear()：获得双端队列的最后一个元素。 如果双端队列为空，返回 -1。
// isEmpty()：检查双端队列是否为空。
// isFull()：检查双端队列是否满了。

// 感觉就是循环队列加几个方法就完事了
// 需要对于队列的处理基本上是没有什么变化的，需要考虑的其实是 insertFront 本质上是在做减法，那么这里的问题就比较严重了
export class MyCircularDeque {
    max: number
    list: number[] = []
    head: number = 0
    tail: number = 0
    size: number = 0
    constructor(k: number) {
        this.max = k
        this.list = Array(k).fill(null)
    }

    insertFront(value: number): boolean {
        if (this.isFull()) {
            return false
        }
        this.list[this.head % this.max] = value
        const next = this.head - 1 < 0 ? this.max - 1 : this.head - 1
        this.head = next
        this.size++
        return true

    }

    insertLast(value: number): boolean {
        if (this.isFull()) {
            return false
        }
        // tail开始往后面走
        this.list[(this.tail + 1) % this.max] = value
        ++this.size
        this.tail += 1
        return true
    }

    deleteFront(): boolean {
        if (this.isEmpty()) {
            return false
        }
        this.list[(this.head + 1) % this.max] = -1
        this.head += 1
        this.size--
        return true
    }

    deleteLast(): boolean {
        if (this.isEmpty()) {
            return false
        }
        this.list[this.tail % this.max] = -1
        const next = this.tail - 1 < 0 ? this.max + this.tail - 1 : this.tail - 1

        this.tail = next
        this.size--
        return true
    }

    getFront(): number {
        return this.isEmpty() ? -1 : this.list[(this.head + 1) % this.max]

    }

    getRear(): number {
        return this.isEmpty() ? -1 : this.list[(this.tail) % this.max]

    }

    isEmpty(): boolean {
        return this.size === 0

    }

    isFull(): boolean {
        return this.size === this.max
    }
}

test('MyCircularDeque', () => {
    const circularDeque = new MyCircularDeque(3); // 设置容量大小为3
    expect(circularDeque.insertLast(1)).toBeTruthy()
    expect(circularDeque.insertLast(2)).toBeTruthy()
    expect(circularDeque.insertFront(3)).toBeTruthy()
    expect(circularDeque.insertFront(4)).toBeFalsy()
    expect(circularDeque.getRear()).toBe(2)
    expect(circularDeque.isFull()).toBeTruthy()
    expect(circularDeque.deleteLast()).toBeTruthy()
    expect(circularDeque.insertFront(4)).toBeTruthy()
    expect(circularDeque.getFront()).toBe(4)
})

test('MyCircularDeque', () => {
    const circularDeque = new MyCircularDeque(5); // 设置容量大小为3
    const testMethodArr = ["insertFront", "insertLast", "getFront",
        "insertLast", "getFront", "insertFront",
        "getRear", "getFront", "getFront", "deleteLast", "getRear"]

    const parameterArr = [[7], [0], [], [3], [], [9], [], [], [], [], []]

    const expectArr = [true, true, 7, true, 7, true, 3, 9, 9, true, 0]

    testMethodArr.forEach((v, index) => {
        expect((circularDeque as any)[v](...parameterArr[index])).toEqual(expectArr[index])
    })
})
