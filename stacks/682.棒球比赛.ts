/*
 * @lc app=leetcode.cn id=682 lang=typescript
 *
 * [682] 棒球比赛
 */

// @lc code=start
function calPoints(ops: string[]): number {
  const scoreList: number[] = []
  ops.forEach((v: string) => {

    if (v === '+') {
      if (scoreList[0] !== undefined && scoreList[1] !== undefined) {
        scoreList.unshift(scoreList[0] + scoreList[1])
      }
      return
    }
    if (v === 'D') {
      if (scoreList[0] !== undefined) {
        scoreList.unshift(scoreList[0] * 2)
      }
      return

    }

    if (v === 'C') {
      scoreList.shift()
      return
    }

    if (+v !== NaN) {
      scoreList.unshift(+v)
    }
  })

  return scoreList.reduce((a, b) => a + b, 0)
};
// @lc code=end

