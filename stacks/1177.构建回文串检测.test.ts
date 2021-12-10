/*
 * @lc app=leetcode.cn id=1177 lang=typescript
 *
 * [1177] 构建回文串检测
 */

// @lc code=start
// 怎么检查是否可以被构建成回文字符串?
// 通过hash表来构建 假如没有元素就+1，有元素就-1 那么只要最后hash表的值都是0，或者只有一个元素为1
// 那么就表示可以通过位置替换变成回文字符串
// 而对于可变换的也可以进行判断，假如hash表中有的数据为k+1 那么就表示可以进行变换

// 应该可以进行判断，但是会超出时间限制
function canMakePaliQueries1(s: string, queries: number[][]): boolean[] {
  const result: boolean[] = []

  for (let i = 0; i < queries.length; i++) {
    const left = queries[i][0]
    const right = queries[i][1]
    const k = queries[i][2]
    // 这一步可以考虑前缀和以及数组代替 因为考虑到 hashMap比数组可能要更加慢一点
    const hashMap = new Map<string, number>()
    for (let j = left; j <= right; j++) {
      const char = s[j]
      if (hashMap.get(char) === 1) {
        hashMap.set(char, 0)
      } else {
        hashMap.set(char, 1)
      }
    }
    let mapLength = 0;
    hashMap.forEach((v) => {
      if (v !== 0) {
        ++mapLength
      }
    })
    result[i] = Math.floor(mapLength / 2) <= k
  }
  return result
};

// 通过前缀和进一步思考
function canMakePaliQueries(s: string, queries: number[][]): boolean[] {
  const result: boolean[] = []
  const preSumList: number[][] = [Array(26).fill(0)]
  const offset = 97 // 'a'.codePointAt(0) // 97
  for (let i = 0; i < s.length; i++) {
    // 从0开始进行记录)
    const newArr: number[] = JSON.parse(JSON.stringify(preSumList[i]))
    const index = (s[i].codePointAt(0) || 0) - offset
    newArr[index] = newArr[index] + 1
    preSumList.push(newArr)
  }
  // 开始进行前缀和计算
  for (let i = 0; i < queries.length; i++) {
    const left = queries[i][0]
    const right = queries[i][1]
    const k = queries[i][2]

    const offsetSum = preSumList[right + 1].filter((v, index) => {
      return (v - preSumList[left][index]) % 2 !== 0
    })
    // 对offsetSum
    result.push(Math.floor(offsetSum.length / 2) <= k)
  }
  return result
};
test('canMakePaliQueries', () => {

  expect(canMakePaliQueries('abcda', [[3, 3, 0], [1, 2, 0], [0, 3, 1], [0, 3, 2], [0, 4, 1]]))
    .toEqual([true, false, false, true, true])
})

// @lc code=end

