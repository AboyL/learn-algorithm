/*
 * @lc app=leetcode.cn id=844 lang=typescript
 *
 * [844] 比较含退格的字符串
 */

// @lc code=start
function backspaceCompare(s: string, t: string): boolean {
  const sArr: string[] = []
  const tArr: string[] = []

  for (let i of s) {
    if (i === '#') {
      sArr.shift()
    } else {
      sArr.unshift(i)
    }
  }
  for (let i of t) {
    if (i === '#') {
      tArr.shift()
    } else {
      tArr.unshift(i)
    }
  }

  return sArr.join('') === tArr.join('')
};

// @lc code=end

