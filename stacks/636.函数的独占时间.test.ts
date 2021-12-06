/*
 * @lc app=leetcode.cn id=636 lang=typescript
 *
 * [636] 函数的独占时间
 */

// @lc code=start
// 重点是如何判断当前这个任务的独占时间是多少
// 可以开三个栈 start 入栈 end 出栈
// 一个栈里面存index 一个存开始时间 一个存开始时间
// 那么当前这个任务的独占时间实际上是当前任务的结束时间-任务的开始时间
// 当startStacks.length的值为0的时候，那么就是减去最后的结束时间
// 那么两个栈就够了
// 不对，在start的时候就要开始计算时间了，end的时候没有办法取到没有进栈之前的时间进行计算
// 或者进行减法运算 直接减去前面的执行时间
// 但是需要注意处理start马上接上end的情况 也就是没有闭包的情况
// 但是这个也要考虑连环闭包的形式，所以也可能需要一个栈来进行存储gapTime，这样看来还不如第一种来的方便了
// ，走一步算一步
// 每一个任务都有自己的gapTime
function exclusiveTime(n: number, logs: string[]): number[] {
  const taskStacks: number[] = []
  const startStacks: number[] = []
  const list: number[] = Array(n).fill(0)
  let gapTimeArr: number[] = [] // 间隔时间

  for (let str of logs) {
    const strArr: string[] = str.split(':')
    const index: number = Number(strArr[0])
    const symbol: string = strArr[1]
    const time: number = Number(strArr[2])

    if (symbol === 'start') {
      // 计算上一个任务的开始时间
      taskStacks.push(index)
      startStacks.push(time)
      gapTimeArr.push(0) // 一个start就是代表会产生一个间隔
    } else {
      // 结束并且计算一轮值
      const startTime = startStacks.pop()
      const currentIndex = taskStacks.pop()
      if (currentIndex !== undefined && startTime !== undefined) {
        const t = time - startTime + 1
        const gapTime = gapTimeArr.pop() || 0
        list[currentIndex] += t - gapTime
        if (gapTimeArr.length > 0) {
          // 处理连环闭包
          gapTimeArr[gapTimeArr.length - 1] += t
        }
      }
    }
  }
  return list
};
test('exclusiveTime', () => {
  expect(exclusiveTime(1, ["0:start:0", "0:start:1", "0:start:2", "0:end:3", "0:end:4", "0:end:5"]))
    .toEqual([6])

  expect(exclusiveTime(2, ["0:start:0", "1:start:2", "1:end:5", "0:end:6"])).toEqual([3, 4])
  expect(exclusiveTime(1, ["0:start:0", "0:start:2", "0:end:5", "0:start:6", "0:end:6", "0:end:7"]))
    .toEqual([8])
  expect(exclusiveTime(2, ["0:start:0", "0:start:2", "0:end:5", "1:start:6", "1:end:6", "0:end:7"]))
    .toEqual([7, 1])
  expect(exclusiveTime(2, ["0:start:0", "0:start:2", "0:end:5", "1:start:7", "1:end:7", "0:end:8"]))
    .toEqual([8, 1])
  expect(exclusiveTime(1, ["0:start:0", "0:end:0"])).toEqual([1])

})
// @lc code=end

