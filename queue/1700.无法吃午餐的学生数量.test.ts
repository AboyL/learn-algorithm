/*
 * @lc app=leetcode.cn id=1700 lang=typescript
 *
 * [1700] 无法吃午餐的学生数量
 */

// @lc code=start

// 学校的自助午餐提供圆形和方形的三明治，分别用数字 0 和 1 表示。
// 所有学生站在一个队列里，每个学生要么喜欢圆形的要么喜欢方形的。
// 餐厅里三明治的数量与学生的数量相同。所有三明治都放在一个 栈 里，每一轮：

// 如果队列最前面的学生 喜欢 栈顶的三明治，那么会 拿走它 并离开队列。
// 否则，这名学生会 放弃这个三明治 并回到队列的尾部。
// 这个过程会一直持续到队列里所有学生都不喜欢栈顶的三明治为止。
// 给你两个整数数组 students 和 sandwiches ，
// 其中 sandwiches[i] 是栈里面第 i​​​​​​ 个三明治的类型（i = 0 是栈的顶部）， 
// students[j] 是初始队列里第 j​​​​​​ 名学生对三明治的喜好（j = 0 是队列的最开始位置）。
// 请你返回无法吃午餐的学生数量。


// 代码不是很难写 问题是怎么进行循环结束的判断
// 当没有学生的时候一定结束循环 但是假如所有的学生都不喜欢，此时是进行一个什么样子的判断呢？
// 需要有一个len的判断， 假如这个len===长度了，那么就代表所有的学生都不喜欢了
function countStudents(students: number[], sandwiches: number[]): number {
  let dontLikeStudentNumber = 0
  while (students.length && dontLikeStudentNumber !== students.length) {
    const first = sandwiches[0]
    if (first === students[0]) {
      // 表示匹配了，进行下一步
      dontLikeStudentNumber = 0
      sandwiches.shift()
      students.shift()
    } else {
      ++dontLikeStudentNumber
      const s = students.shift()
      if (s!==undefined) {
        students.push(s)
      } else {
        return 0
      }
    }
  }
  return students.length
};


test('countStudents', () => {
  expect(
    countStudents(
      [0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0]
    )
  ).toBe(1)
})
// @lc code=end

