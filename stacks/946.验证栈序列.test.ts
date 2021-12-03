/*
 * @lc app=leetcode.cn id=946 lang=typescript
 *
 * [946] 验证栈序列
 */


// 给定 pushed 和 popped 两个序列，每个序列中的 值都不重复，
// 只有当它们可能是在最初空栈上进行的推入 push 和弹出 pop 操作序列的结果时，
// 返回 true；否则，返回 false 。

// 输入：pushed = [1,2,3,4,5], popped = [4,5,3,2,1]
// 输出：true
// 解释：我们可以按以下顺序执行：
// push(1), push(2), push(3), push(4), pop() -> 4,
// push(5), pop() -> 5, pop() -> 3, pop() -> 2, pop() -> 1


// 输入：pushed = [1,2,3,4,5], popped = [4,3,5,1,2]
// 输出：false
// 解释：1 不能在 2 之前弹出

// @lc code=start

// 注意点是，栈的数据不重复
// 那么出栈的顺序必定是固定的，比如出现了4那么当这个值不是4的时候一定是入栈
// 假如是4得话，那么必定是进去以后马上出来了，这个时候只需要进行下一步操作，下一步假如栈顶元素与pop栈的第一个元素相同
// 那么就出栈，否则继续入栈，pushed长度为空的时候 此时顺序必定是固定的
function validateStackSequences(pushed: number[], popped: number[]): boolean {
  if (pushed.length !== popped.length) {
    return false
  }
  const stacks: number[] = []

  while (pushed.length) {
    const v = stacks.pop()
    if (v!==undefined) {
      if (v === popped[0]) {
        popped.shift()
      } else {
        stacks.push(v)
        const pushedItem = pushed.shift()
        stacks.push(pushedItem!)
      }
    } else {
      const pushedItem = pushed.shift()
      stacks.push(pushedItem!)
    }
  }
  while (stacks.length) {
    const s = stacks.shift()
    const p = popped.pop()
    if (s !== p) {
      return false
    }
  }
  return popped.length === 0
};

test('validateStackSequences',()=>{
  expect(validateStackSequences([1,2],[2,1])).toBeTruthy()
  expect(validateStackSequences([1,2],[1,2])).toBeTruthy()
  expect(validateStackSequences([1,2,3,4,5],[4,5,3,2,1])).toBeTruthy()
  expect(validateStackSequences([1,2,3,4,5],[4,3,5,1,2])).toBeFalsy()
  expect(validateStackSequences([0,1],[0,1])).toBeTruthy()
  expect(validateStackSequences([0,1],[1,0])).toBeTruthy()

})

// @lc code=end

