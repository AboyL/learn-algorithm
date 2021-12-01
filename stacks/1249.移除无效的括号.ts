export default {}
/*
 * @lc app=leetcode.cn id=1249 lang=typescript
 *
 * [1249] 移除无效的括号
 */

// @lc code=start

// 给你一个由 '('、')' 和小写字母组成的字符串 s。

// 你需要从字符串中删除最少数目的 '(' 或者 ')' （可以删除任意位置的括号)，使得剩下的「括号字符串」有效。

// 请返回任意一个合法字符串。

// 有效「括号字符串」应当符合以下 任意一条 要求：

// 空字符串或只包含小写字母的字符串
// 可以被写作 AB（A 连接 B）的字符串，其中 A 和 B 都是有效「括号字符串」
// 可以被写作 (A) 的字符串，其中 A 是一个有效的「括号字符串」

// 需要的是一个对应关系 也就括号跟index的对应关系
// 一个栈，入队的不仅仅是括号更是括号与index
// 当所有的循环都走完的时候，假如还存在值得话，表示这些括号是无效的，应该被剔除的
function minRemoveToMakeValid(s: string): string {
  const parenthesesStacks: { symbol: '(' | ')', index: number }[] = []
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      parenthesesStacks.unshift({
        symbol: '(',
        index: i
      })
    } else if (s[i] === ')') {
      if (parenthesesStacks[0] && parenthesesStacks[0].symbol === '(') {
        parenthesesStacks.shift()
      } else {
        parenthesesStacks.unshift({
          symbol: ')',
          index: i
        })
      }
    }
  }

  // 将所有在 parenthesesStacks 中的字符串进行排除
  let newS = ''
  const arr = parenthesesStacks.map(v => v.index)
  for (let i = 0; i < s.length; i++) {
    if (!arr.includes(i)) {
      newS += s[i]
    }
  }

  return newS
};
// @lc code=end

