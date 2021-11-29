// 2021-11-29
// 实现一个MyQueue类，该类用两个栈来实现一个队列。

// 只能使用标准的栈操作 -- 也就是只有 push to top, 
// peek/pop from top, size 和 is empty 操作是合法的


// 通过两个栈来模拟队列
// 也就是只能使用 push 跟 pop
// 进入的时候先全都压入到一个栈之中
// 出的时候把这个栈里面的内容全部都pop到另外一个队列中再pop第一个出来
export class MyQueue {
  popList: number[] = []
  pushList: number[] = []
  constructor() {

  }

  push(x: number): void {
    // 假如当前是在popList里面 那么将popList里面的值全部pop出来并且push到pushList里面再进行一次push
    while (this.popList.length) {
      const v = this.popList.pop()
      if (v) {
        this.pushList.push(v)
      }
    }
    this.pushList.push(x)
  }

  pop(): number {
    // 把所有pushList里面都pop出来再进行一次pop
    while (this.pushList.length) {
      const v = this.pushList.pop()
      if (v) {
        this.popList.push(v)
      }
    }
    return this.popList.pop() || -1
  }

  peek(): number {
    while (this.pushList.length) {
      const v = this.pushList.pop()
      if (v) {
        this.popList.push(v)
      }
    }
    return this.popList[this.popList.length - 1] || -1
  }

  empty(): boolean {
    return this.pushList.length === 0 && this.popList.length === 0
  }
}

test('MyQueue', () => {

  var obj = new MyQueue()
  obj.push(4)
  obj.push(3)
  obj.push(2)
  var param_2 = obj.pop()
  var param_3 = obj.peek()
  var param_4 = obj.empty()

  expect(param_2).toBe(4)
  expect(param_3).toBe(3)
  expect(param_4).toBeFalsy()

})
