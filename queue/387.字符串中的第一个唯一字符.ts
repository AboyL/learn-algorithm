/*
 * @lc app=leetcode.cn id=387 lang=typescript
 *
 * [387] 字符串中的第一个唯一字符
 */

// @lc code=start

// 简单解法就直接map的，但是我们可以采取更加简单的做法 比如直接通过char数组来进行判断
// charCodeAt a的ascll码为97
// 进行两次遍历是必然的
function firstUniqChar1(str: string): number {
  const list: number[] = Array(26).fill(0)
  for (let i = 0; i < str.length; i++) {
    list[str.charCodeAt(i) - 97] += 1
  }

  // 再进行一次遍历
  for (let i = 0; i < str.length; i++) {
    if (list[str.charCodeAt(i) - 97] === 1) {
      return i
    }
  }

  return -1
};

// 也可以使用队列

function firstUniqChar(str: string): number {
  const map: {
    [k: string]: number
  } = {

  }
  const list: [string, number][] = []
  for (let i = 0; i < str.length; i++) {
    if (!map[str[i]]) {
      map[str[i]] = 1
      list.push([str[i], i])
    } else {
      map[str[i]] = -1
      while (list.length && map[list[0][0]] === -1) {
        list.shift()
      }
    }
  }
  return list.length ? list[0][1] : -1
};
// @lc code=end

