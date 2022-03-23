export default {}

/*
 * @lc app=leetcode.cn id=541 lang=typescript
 *
 * [541] 反转字符串 II
 */

// @lc code=start

// 反转
function reverseStr(s: string, k: number): string {
  let newSa: string[] = []
  let newS = ''
  let count = 0;
  let flag = true
  for (let str of s) {
    if (count < k && flag) {
      count++
      newS = str + newS
    } else {
      count--
      flag = false
      newS = newS + str
    }
    if (count === k) {
      newSa.push(newS)
      newS = ''
    }
    if (count === 0) {
      newSa.push(newS)
      newS = ''
      flag = true
    }
  }
  newSa.push(newS)

  return newSa.join('')
};

test('reverseStr', () => {
  expect(
    reverseStr("abcdefg", 2)
  ).toEqual("bacdfeg")
})
// @lc code=end

