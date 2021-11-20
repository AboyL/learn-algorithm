// 2021-11-20

// 有些数的素因子只有 3，5，7，请设计一个算法找出第 k 个数。
// 注意，不是必须有这些素因子，而是必须不包含其他的素因子。
// 例如，前几个数按顺序应该是 1，3，5，7，9，15，21。

// 这个题目的思路是真的很麻烦 看了题解才知道的
// 总得来说，每个数都是 3a*5b*7c
// 但是3*3*3*3 小于 3*3*7
// 也就是说并不是乘数越多越大
// 这里就需要一步步提高a b c的值来进行寻找
function getKthMagicNumber(k: number): number {

  const list = [1] // 第一个数字是1
  let p3 = 0
  let p5 = 0
  let p7 = 0

  for (let i = 1; i < k; i++) {
    const v3 = list[p3] * 3
    const v5 = list[p5] * 5
    const v7 = list[p7] * 7

    list[i] = Math.min(v3, Math.min(v5, v7))
    if (list[i] === v3) {
      p3++
    }
    if (list[i] === v5) {
      p5++
    }
    if (list[i] === v7) {
      p7++
    }
  }

  return list[k - 1]
};

test('getKthMagicNumber', () => {
  // expect(getKthMagicNumber(1)).toBe(1)
  // expect(getKthMagicNumber(2)).toBe(3)
  // expect(getKthMagicNumber(3)).toBe(5)
  // expect(getKthMagicNumber(4)).toBe(7)
  // expect(getKthMagicNumber(5)).toBe(9)
  // expect(getKthMagicNumber(6)).toBe(15)
  expect(getKthMagicNumber(7)).toBe(21)
  // expect(getKthMagicNumber(8)).toBe(27)
})