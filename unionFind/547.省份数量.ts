export default {}
/*
 * @lc app=leetcode.cn id=547 lang=typescript
 *
 * [547] 省份数量
 */

// @lc code=start

// 问题是如何构建这个并查集

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

function findCircleNum(isConnected: number[][]): number {
  const len = isConnected.length
  const uf = new UnionFind(len)

  // 假如是有连接的，那就连接到一起去
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (isConnected[i][j] === 1) {
        uf.unionElements(i, j)
      }
    }
  }

  let map = new Map<number, boolean>()
  for (let i = 0; i < len; i++) {
    let p = uf.find(i)
    if (!map.get(p)) {
      map.set(p, true)
    }
  }

  return [...map.keys()].length
};
// @lc code=end

