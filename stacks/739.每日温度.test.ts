export default {}
/*
 * @lc app=leetcode.cn id=739 lang=typescript
 *
 * [739] 每日温度
 */

// @lc code=start

// 一样是使用单调栈的思想来进行处理
// 只不过这里要返回的是长度
// 加入一个index进行判断
function dailyTemperatures(temperatures: number[]): number[] {
  const result: number[] = []
  const stacks: [number, number][] = []

  for (let i = temperatures.length - 1; i >= 0; i--) {
    while (stacks.length > 0 && stacks[0][0] <= temperatures[i]) {
      stacks.shift()
    }
    result[i] = stacks.length === 0 ? 0 : stacks[0][1] - i;
    // 加入index进行判断
    stacks.unshift([temperatures[i], i])
  }
  return result
};



// @lc code=end

