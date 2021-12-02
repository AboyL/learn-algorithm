// 2021-12-2
export default {}
/*
 * @lc app=leetcode.cn id=227 lang=typescript
 *
 * [227] 基本计算器 II
 */

// @lc code=start
// s 由整数和算符 ('+', '-', '*', '/') 组成，中间由一些空格隔开
// s 表示一个 有效表达式
// 表达式中的所有整数都是非负整数，且在范围 [0, 231 - 1] 内

// 肯定需要使用栈来进行处理
// 计算器的规则
// 注意这个题目是没有括号的
// 那么就是 - + 是延迟计算 */是立刻计算
// 1+2*3
const calculateMap = {
  '+': (a: number, b: number) => a + b,
  '-': (a: number, b: number) => a - b,
  '*': (a: number, b: number) => a * b,
  '/': (a: number, b: number) => Math.floor(a / b),
}

type CalculateSymbol = keyof typeof calculateMap

// 需要多个栈，但是这个快一些，因为不需要两次遍历，每次都在计算的时候就算完了
function calculate(s: string): number {
  const numberStacks: number[] = []
  const symbolStacks: CalculateSymbol[] = []

  let strNum: string = ''
  for (let i=0;i<s.length;i++) {
    const v = s[i]
    if (v) {
      if (!isNaN(+v)) {
        strNum = strNum + v
      } else {
        // 此时可以塞入一个数字了
        numberStacks.unshift(+strNum)
        strNum = ''
        let preSymbol = symbolStacks.shift()
        if (preSymbol) {
          if (v === '+' || v === '-') {
            // 此时不管前面的是什么都可以进行计算了，而且必定有两个数字
            symbolStacks.unshift(preSymbol)
            while (symbolStacks.length) {
              preSymbol = symbolStacks.shift()
              const n1 = numberStacks.shift()
              const n2 = numberStacks.shift()
              const n3: number = calculateMap[preSymbol!](n2!, n1!)
              numberStacks.unshift(n3)
            }
            symbolStacks.unshift(v)
          }
          if (v === '*' || v === '/') {
            // 如果前面的值也是 * | / 那么就可以理解计算，否则延后计算
            if (preSymbol === '*' || preSymbol === '/') {
              const n1 = numberStacks.shift()
              const n2 = numberStacks.shift()
              const n3: number = calculateMap[preSymbol](n2!, n1!)
              numberStacks.unshift(n3)
            } else {
              symbolStacks.unshift(preSymbol!)
            }
            symbolStacks.unshift(v)
          }
        } else {
          symbolStacks.unshift(v as CalculateSymbol)
        }
      }
    }
  }
  numberStacks.unshift(+strNum)

  while (symbolStacks.length) {
    const symbol = symbolStacks.shift()
    const n1 = numberStacks.shift()
    const n2 = numberStacks.shift()
    // if (n1 && n2) {
    const n3: number = calculateMap[symbol!](n2!, n1!)
    numberStacks.unshift(n3)
    // }
  }
  // 开始对剩余的内容进行计算
  return Math.floor(numberStacks[0] || 0)
};


// 其实在第一轮只需要计算乘除就好了,不需要计算加减
// 只需要一个stacks就好了 最后进行加减计算的时候完全可以顺序计算
function calculate1(s: string): number {
  const stacks: Array<CalculateSymbol | number> = []

  let strNum: string = ''
  let preSymbol: CalculateSymbol | null = null
  for (let i=0;i<s.length;i++) {
    const v = s[i]
    if (v) {
      if (!isNaN(+v)) {
        strNum = strNum + v
      } else {
        stacks.unshift(+strNum)
        strNum = ''
        // 如果符号是+ - 并且前面的preSymbol不是*/ 就可以直接入栈了
        if (preSymbol) {
          if (preSymbol === '*' || preSymbol === '/') {
            const n1 = stacks.shift() as number
            const symbol = stacks.shift() as CalculateSymbol
            const n2 = stacks.shift() as number
            const n3 = calculateMap[symbol](n2, n1)
            stacks.unshift(n3)
          }
        }
        preSymbol = v as CalculateSymbol
        stacks.unshift(preSymbol)
      }
    }
  }

  stacks.unshift(+strNum)
  if (preSymbol === '*' || preSymbol === '/') {
    const n1 = stacks.shift() as number
    const symbol = stacks.shift() as CalculateSymbol
    const n2 = stacks.shift() as number
    const n3 = calculateMap[symbol](n2, n1)
    stacks.unshift(n3)
  }
  while (stacks.length !== 1) {
    const n1 = stacks.pop() as number
    const symbol = stacks.pop() as CalculateSymbol
    const n2 = stacks.pop() as number
    const n3: number = calculateMap[symbol!](n1!, n2!)
    stacks.push(n3)
  }
  // 开始对剩余的内容进行计算
  return Math.floor(stacks[0] as number || 0)
};

test('calculate', () => {
  expect(calculate("42")).toBe(42)

  expect(calculate("1+2*5/3+6/4*2")).toBe(6)
  expect(calculate('1+1-1')).toBe(1)
  expect(calculate('1+2*3')).toBe(7)
  expect(calculate('1+2*3+7')).toBe(14)
  expect(calculate('1+4/2')).toBe(3)
  expect(calculate('1+4/2+1')).toBe(4)
  expect(calculate('0-1')).toBe(-1)
  expect(calculate("0-2147483647")).toBe(-2147483647)

  expect(calculate("1*2-3/4+5*6-7*8+9/10")).toBe(-24)


})
// @lc code=end

