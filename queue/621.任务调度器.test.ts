// 2021-11-23
/*
 * @lc app=leetcode.cn id=621 lang=typescript
 *
 * [621] 任务调度器
 */

// @lc code=start

// 给你一个用字符数组 tasks 表示的 CPU 需要执行的任务列表。其中每个字母表示一种不同种类的任务。
// 任务可以以任意顺序执行，并且每个任务都可以在 1 个单位时间内执行完。在任何一个单位时间，CPU 可以完成一个任务，
// 或者处于待命状态。

// 然而，两个 相同种类 的任务之间必须有长度为整数 n 的冷却时间，因此至少有连续 n 个单位时间内 CPU 在执行不同的任务，
// 或者在待命状态。


// 尽量选择最多的且符合要求的
function leastInterval(tasks: string[], n: number): number {
  if (n == 0 || tasks.length == 0) {
    return tasks.length
  }
  const taskMap: {
    [k: string]: number
  } = {}
  for (let i of tasks) {
    taskMap[i] = (taskMap[i] || 0) + 1
  }
  // 此时我们得到了一个 {a:n,b:m,c:i}的数组 
  // 找到最长的并且进行对比，当最后只有一个的时候开始全部用间隔填充
  // 什么时候中介，当所有的都是0的时候终结
  let taskQueue: string[] = []
  let time = 0
  let flag = tasks.length // 每次去掉一个就-- 用来做最后的标记位置
  const taskKeys=Object.keys(taskMap)
  const getTime = () => {
    let task: string | null = null
    let max = 0
    taskKeys.forEach(k => {
      // 所以这个判断条件要继续变化 而是逐步进行判断 是否在队列中并且可以
      // 假如max还是0，表示所有的都走完了
      if (taskMap[k] > max) {
        const index = taskQueue.indexOf(k)
        if (index === -1 || index >= n) {
          max = taskMap[k]
          task = k
        }
      }
    })
    if (max === 0) {
      // 对于这种情况，应该塞入一个 free 空闲时间并且将数组向后移动一位 
      // 即使是只有一个数组有数据了，也统一使用这个进行处理，不做进行特殊处理
      taskQueue.unshift('free');
      return 1
    }
    // 删除taskQueue里面的task并且放到第一位
    const index = taskQueue.indexOf(task!)
    if (index !== -1) {
      taskQueue.splice(index, 1)
    }
    taskQueue.unshift(task!)
    // 因为数组长度最多为n+1后面的都可以不用计算了
    taskQueue = taskQueue.splice(0, n + 1)
    --taskMap[task!]
    // 这个操作可以优化掉
    // flag = Object.values(taskMap).some(v => v > 0)
    --flag
    return 1
  }

  while (flag) {
    time += getTime()
  }
  return time
};

test('leastInterval', () => {
  expect(leastInterval(["A", "A", "A", "B", "B", "B"], 2)).toBe(8)
  expect(leastInterval(["A", "A", "A", "A", "A", "A", "B", "C", "D", "E", "F", "G"], 2)).toBe(16)
})
// @lc code=end

