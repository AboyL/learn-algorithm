export default {}
/*
 * @lc app=leetcode.cn id=1319 lang=typescript
 *
 * [1319] 连通网络的操作次数
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

  add(n: number) {
    if (this.parents[n] === undefined) {
      // 进行初始化
      this.parents[n] = n
      this.rank[n] = 1
      this.count++
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

// 这个解题思路跟冗余连接是一样的 冗余的链接就是多出来的边
// 但是还要考虑没有连接在一起的 有可能有多个网络
function makeConnected(n: number, connections: number[][]): number {
  let redundant = 0
  const uf = new UnionFind(0)
  let s = new Set<number>()
  for (let i = 0; i < connections.length; i++) {
    const a = connections[i][0]
    const b = connections[i][1]
    uf.add(a)
    uf.add(b)
    s.add(a)
    s.add(b)

    // 判断一下是否是联通的 假如不联通就联通 
    // 联通表示这个时候再加一条是多余的，那么这条线就可以被拆下来
    if (uf.find(a) === uf.find(b)) {
      redundant += 1
    } else {
      uf.unionElements(a, b)
    }
  }

  let map = new Map<number, boolean>()
  for (let i of s) {
    let p = uf.find(i)
    if (!map.get(p)) {
      map.set(p, true)
    }
  }
  n = n + map.size - 1
  return redundant < n - uf.count ? -1 : n - uf.count
};
// @lc code=end

test('makeConnected', () => {
  // expect(
  //   makeConnected(4,
  //     [[0, 1], [0, 2], [1, 2]])
  // ).toBe(1)

  expect(
    makeConnected(
      100,
      [[17, 51], [33, 83], [53, 62], [25, 34], [35, 90], [29, 41], [14, 53], [40, 84], [41, 64], [13, 68], [44, 85], [57, 58], [50, 74], [20, 69], [15, 62], [25, 88], [4, 56], [37, 39], [30, 62], [69, 79], [33, 85], [24, 83], [35, 77], [2, 73], [6, 28], [46, 98], [11, 82], [29, 72], [67, 71], [12, 49], [42, 56], [56, 65], [40, 70], [24, 64], [29, 51], [20, 27], [45, 88], [58, 92], [60, 99], [33, 46], [19, 69], [33, 89], [54, 82], [16, 50], [35, 73], [19, 45], [19, 72], [1, 79], [27, 80], [22, 41], [52, 61], [50, 85], [27, 45], [4, 84], [11, 96], [0, 99], [29, 94], [9, 19], [66, 99], [20, 39], [16, 85], [12, 27], [16, 67], [61, 80], [67, 83], [16, 17], [24, 27], [16, 25], [41, 79], [51, 95], [46, 47], [27, 51], [31, 44], [0, 69], [61, 63], [33, 95], [17, 88], [70, 87], [40, 42], [21, 42], [67, 77], [33, 65], [3, 25], [39, 83], [34, 40], [15, 79], [30, 90], [58, 95], [45, 56], [37, 48], [24, 91], [31, 93], [83, 90], [17, 86], [61, 65], [15, 48], [34, 56], [12, 26], [39, 98], [1, 48], [21, 76], [72, 96], [30, 69], [46, 80], [6, 29], [29, 81], [22, 77], [85, 90], [79, 83], [6, 26], [33, 57], [3, 65], [63, 84], [77, 94], [26, 90], [64, 77], [0, 3], [27, 97], [66, 89], [18, 77], [27, 43]]
    )
  ).toBe(13)
})
