export default {}
/*
 * @lc app=leetcode.cn id=684 lang=typescript
 *
 * [684] 冗余连接
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


// 通过构建多次并查集得到结果 删除掉一条边以后还可以构建出来一个只有一个根节点的并查集
// 那就表示去掉没有关系，否则就表示不能去掉

// 但是这个方案需要创建太多的并查集了 可以不这样做
function findRedundantConnection1(edges: number[][]): number[] {
  let result = edges[0]
  let maxLength = 0
  for (let i = 0; i < edges.length; i++) {
    const uf = new UnionFind(0)
    for (let j = 0; j < edges.length; j++) {
      if (i !== j) {
        uf.add(edges[j][0] - 1)
        uf.add(edges[j][1] - 1)
        uf.unionElements(edges[j][0] - 1, edges[j][1] - 1)
      }
    }
    // 进行比较
    let map = new Map<number, boolean>()
    maxLength = Math.max(maxLength, uf.parents.length)
    for (let i = 0; i < maxLength; i++) {
      const x = uf.find(i)
      if (map.get(x) === undefined) {
        map.set(x, true)
      }
    }
    if (map.size === 1 && uf.parents.length >= maxLength) {
      result = edges[i]
    }
  }
  return result
};


function findRedundantConnection(edges: number[][]): number[] {
  let result = edges[0]
  const uf = new UnionFind(0)
  for (let i = 0; i < edges.length; i++) {
    const a = edges[i][0] - 1
    const b = edges[i][1] - 1
    uf.add(a)
    uf.add(b)

    // 判断一下是否是联通的 假如不联通就联通 联通表示这个时候再加一条就有问题了
    if (uf.find(a) === uf.find(b)) {
      result = edges[i]
    } else {
      uf.unionElements(a, b)
    }
  }
  return result
};

// @lc code=end


test('findRedundantConnection', () => {
  expect(
    findRedundantConnection([[1, 2], [1, 3], [2, 3]])
  ).toEqual([2, 3])

  expect(
    findRedundantConnection([[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]])
  ).toEqual([1, 4])

  expect(
    findRedundantConnection(
      [[3, 4], [1, 2], [2, 4], [3, 5], [2, 5]]
    )
  ).toEqual([2, 5])
})