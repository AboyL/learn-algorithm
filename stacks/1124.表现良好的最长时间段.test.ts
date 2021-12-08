/*
 * @lc app=leetcode.cn id=1124 lang=typescript
 *
 * [1124] 表现良好的最长时间段
 */

// @lc code=start
// 给你一份工作时间表 hours，上面记录着某一位员工每天的工作小时数。
// 我们认为当员工一天中的工作小时数大于 8 小时的时候，那么这一天就是「劳累的一天」。
// 所谓「表现良好的时间段」，意味在这段时间内，「劳累的天数」是严格 大于「不劳累的天数」。
// 请你返回「表现良好时间段」的最大长度。

// 感觉一个栈就能解决了
// 大于8就入栈 小于8就出栈，栈空了就表示应该进行记录了
// 但是并不是在0的时候就结束了，而是要考虑后续的
// 假如是 9666999 实际上整个时间段都是需要饱和的 因此总时间不是3而是7
// 对这种我们可以正反遍历两次
// 也可以再使用一个栈来记录
// 以上思路存在问题
// 直接看题解，使用单调栈加上前缀和进行处理
function longestWPI(hours: number[]): number {
  if (!hours) {
    return 0
  }

  // 可以将hours数组表示 为 [1,-1,xxxx] 的形式 1表示大于8个小时，-1表示小于8个小时
  const list: number[] = hours.map(v => v > 8 ? 1 : -1)
  const presumList: number[] = [0]
  let sum = 0
  // 生成前缀和 注意前缀和比原来的数组多一个数字
  for (let i of list) {
    sum += i
    presumList.push(sum)
  }
  // 对于对于时间段 [i,j] presumList[j]-presumList[i] 那么就表示这个时间段是饱和的
  // 例如 [6,9] 转化成 [-1,1]
  // preSum为 [0,-1,0] 这个时候就不需要再管 hours 这个数组了，这里只有 0 - -1是大于0的
  // 所以只有对应的索引 2-1=1 也就是只有一个空闲时间单位
  // 假如 presumList[j]-presumList[i]>0 那么我们就不需要检查 presumList[j]-presumList[i+1] 了
  // 而就需要检查presumList[j]-presumList[i-1] 
  // 按照这样一个检查，那么需要检查的就是 o^2 对每一个 j-i 都进行检测
  // 但是认真思考一下
  // presumList[j]-presumList[i] 肯定是 presumList[i] 越大越没有可能 那么假如我们对presumList进行一次遍历
  // 是的存在 单调栈 addStacks[0,A1,A2,....] Ai<0 切 Ai<A(i-1)
  // 那么假如 presumList[j]-presumList[i] 大于0
  // 就只需要检查 presumList[j]-presumList[i-1] 了 此时一定会让我们的 j-i 的值变大
  // 而假如 presumList[j]-presumList[i]<=0 那么就可以用 presumList[j-1] 进行判断了
  // 同时，对于单调栈 [0,A1,A2,A3] 假如 presumList[j]- presumList[A3] >0  而 presumList[j]- presumList[A2] <0
  // 那么是否还有必要检查 presumList[j-1]-presumList[A3] ? 不需要，因此必定存在 j-A3>j-1-A3
  let min = 0
  let increaseStacks: number[] = [0]
  presumList.forEach((v, index) => {
    if (v < min) {
      increaseStacks.push(index)
      min = v
    }
  })
  let max = 0
  for (let i = presumList.length - 1; i >= 0; i--) {
    while (increaseStacks.length && presumList[i] - presumList[increaseStacks[increaseStacks.length - 1]] > 0) {
      max = Math.max(max, i - increaseStacks[increaseStacks.length - 1])
      increaseStacks.pop()
    }
  }
  return max
};

test('longestWPI', () => {
  expect(longestWPI([9, 9, 6, 0, 6, 6, 9])).toBe(3)
  expect(longestWPI([6, 6, 6])).toBe(0)
  expect(longestWPI([6, 6, 9])).toBe(1)
  expect(longestWPI([9, 9, 6])).toBe(3)
  expect(longestWPI([6, 9, 9])).toBe(3)
  expect(longestWPI([6])).toBe(0)
  expect(longestWPI([9])).toBe(1)
  expect(longestWPI([])).toBe(0)
})
// @lc code=end

