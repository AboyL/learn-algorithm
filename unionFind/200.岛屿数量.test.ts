export default {}
/*
 * @lc app=leetcode.cn id=200 lang=typescript
 *
 * [200] 岛屿数量
 */

// @lc code=start


class UnionFind {
  parents: number[] = []
  rank: number[] = []
  count: number = 0
  constructor(n: number) {
    this.count = n
    for (let i = 0; i < n; i++) {
      this.parents[i] = i
      this.rank[i] = 1
    }
  }

  find(n: number) {
    while (this.parents[n] !== n) {
      // 指向改变
      this.parents[n] = this.parents[this.parents[n]]
      n = this.parents[n]
    }
    return n
  }

  isConnected(p: number, q: number) {
    return this.find(p) === this.find(q)
  }

  // 合并两个组
  // 合并的操作是n级别，比较慢
  unionElements(p: number, q: number) {
    const pRoot: number = this.find(p)
    const qRoot: number = this.find(q)

    if (qRoot === pRoot) {
      return
    }

    if (this.rank[pRoot] < this.rank[qRoot]) {
      this.parents[pRoot] = qRoot
    } else if (this.rank[pRoot] > this.rank[qRoot]) {
      this.parents[qRoot] = pRoot
    } else {
      // 只有等于的时候需要维护数组
      this.parents[pRoot] = qRoot
      this.rank[qRoot]++
    }
  }
}

// 一样是构建一个并查集
// 怎么判断是不是相连的？
// 谁跟谁进行连接？ 以坐标是否有值来进行连接
// 换句话说，root是啥？ 以左上角的作为root 值为 [i][j] 坐标
// 将二维数组转换成一维数组
// 最后怎么进行判断？记录一下0的个数，那么就是对并查集里面所有的数据进行查找后去重-0的个数的值
function numIslands(grid: string[][]): number {
  if (grid.length === 0 || grid[0].length === 0) {
    return 0
  }
  // 生成一个并查集
  let lenG = grid.length
  let lenG0 = grid[0].length
  let totalLen = lenG * lenG0
  const uf = new UnionFind(totalLen);
  let zeroCount: number = 0
  for (let i = 0; i < lenG; i++) {
    for (let j = 0; j < lenG0; j++) {
      if (grid[i][j] === '0') {
        zeroCount++
      } else {
        // 当上边不是0 此时是联通的
        if (i - 1 >= 0 && grid[i - 1][j] === '1') {
          // 进行merge
          uf.unionElements(i * lenG0 + j, (i - 1) * lenG0 + j)
        }
        // 不能加else 不然h会导致
        // ["1", "1", "1"],
        // ["0", "1", "0"],
        // ["1", "1", "1"] 汇总
        // [2,0] 没有进行连接 因为前面的判断是孤立的
        if (j - 1 >= 0 && grid[i][j - 1] === '1') {
          uf.unionElements(i * lenG0 + j, i * lenG0 + j - 1)
        }
      }
    }
  }

  let map = new Map<number, boolean>()
  for (let i = 0; i < totalLen; i++) {
    let p = uf.find(i)
    if (!map.get(p)) {
      map.set(p, true)
    }
  }
  return [...map.keys()].length - zeroCount

};

test('numIslands', () => {
  expect(numIslands([
    ["1", "1", "1"],
    ["0", "1", "0"],
    ["1", "1", "1"]
  ])).toBe(1)
})
// @lc code=end

