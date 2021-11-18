/*
 * @lc app=leetcode.cn id=859 lang=typescript
 *
 * [859] 亲密字符串
 */

// @lc code=start
// 一般的想法是进行遍历处理，但是这个很明显很耗费时间
// 换一个思路，假如对每个字符都进行位置比较，假如出现了三个不同位置的不同字符 那么必定不是亲密字符串
// 假如只有两个，那么这两个位置相比比较相等，那么就是亲密字符串了
function buddyStrings(s: string, goal: string): boolean {
  if (s.length !== goal.length) {
    return false
  }

  const sList: string[] = []
  const goalList: string[] = []
  let diffNumber = 0
  // 这个只针对两个字符完全相同的情况， 假如两个字符完全相同，那么只要存在重复字符，那么必定可以对调
  let hasRepeat = false
  let chartMap = new Map()
  for (let index = 0; index < s.length; index++) {
    const v = s[index]

    if (chartMap.get(v)) {
      hasRepeat = true
    }
    chartMap.set(v, true)
    if (v !== goal[index]) {
      ++diffNumber
      sList.push(v)
      goalList.push(goal[index])
      if (diffNumber > 2) {
        return false
      }
    }
  }

  // aa 是可以的 ab是不可以的
  // aaa 是可以的 aba
  if (diffNumber === 0) {
    return hasRepeat
  }
  return (diffNumber === 2 && sList[0] === goalList[1] && sList[1] === goalList[0])
};

test('buddyStrings', () => {
  expect(buddyStrings('aa', 'aa')).toBeTruthy()
  expect(buddyStrings('ab', 'ba')).toBeTruthy()
  expect(buddyStrings('ab', 'ab')).toBeFalsy()
})
// @lc code=end

