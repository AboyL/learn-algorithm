// 2021-12-4
/*
 * @lc app=leetcode.cn id=1021 lang=typescript
 *
 * [1021] 删除最外层的括号
 */

// @lc code=start

// 这个题目挺难理解的 但是其实算法的思路是还是可以推测出来的
// 一个栈 先把第一个元素放进去，开始 (入栈 )出栈 直到这个栈空了
// 那么就表示去掉最后一个元素跟第一个元素，他就是一个原语言
// 然后再继续下去
function removeOuterParentheses1(s: string): string {
  const stacks: string[] = []
  const strList: string[] = []
  let currentStrArr: string[] = []
  for (let i = 0; i < s.length; i++) {
    const char = s[i]
    currentStrArr.push(char)
    if (char === ')') {
      stacks.pop()
      // 如果pop以后空栈了 表示存在第一个原语了
      if (stacks.length === 0) {
        strList.push(currentStrArr.filter((_, index) => index !== 0 && index !== currentStrArr.length - 1).join(''))
        currentStrArr = []
      }
    } else {
      stacks.push(char)
    }
  }

  return strList.join('')
};


// 更加简洁的做法
function removeOuterParentheses(s: string): string {

  let str = ''
  let count = 0
  for (let i = 0; i < s.length; i++) {
    const char = s[i]
    if (char === ')') {
      --count
      // 当什么时候不进行计算？ 当count为0的时候
      if (count !== 0) {
        str += char
      }
    } else {
      // 当什么时候不进行计算？ 当count为0的时候
      if (count !== 0) {
        str += char
      }
      ++count
    }
  }

  return str
};


test('removeOuterParentheses', () => {
  expect(removeOuterParentheses('(()())(())')).toBe("()()()")
  expect(removeOuterParentheses('(()())(())(()(()))')).toBe("()()()()(())")
  expect(removeOuterParentheses('()()')).toBe("")

})
// @lc code=end

