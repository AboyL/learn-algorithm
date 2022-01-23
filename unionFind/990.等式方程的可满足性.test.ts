export default {}
/*
 * @lc app=leetcode.cn id=990 lang=typescript
 *
 * [990] 等式方程的可满足性
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


// 看起来很复杂其实很简单
// 总而言之，假如两个字母相等，又不相等，那么就存在问题
// 还是要用并查集来解决
// 可以考虑先把==的判断完再判断不等的
// 问题是怎么构建这个呢？可以借助map来实现 字符 ==> 关系
function equationsPossible(equations: string[]): boolean {
  const map = new Map<string, number>()
  const uf = new UnionFind(0)
  let notEqualArr: string[] = []
  equations.forEach(equation => {
    if (equation.includes('!=')) {
      notEqualArr.push(equation)
    } else {
      // 对 字符进行 编码以及入队
      const a = equation.split('==')[0]
      const b = equation.split('==')[1]
      if (map.get(a) === undefined) {
        map.set(a, map.size)
      }
      if (map.get(b) === undefined) {
        map.set(b, map.size)
      }
      uf.add(map.get(a)!)
      uf.add(map.get(b)!)
      // 进行合并
      uf.unionElements(map.get(a)!, map.get(b)!)
    }
  })
  // 开始进行判断
  for (let i = 0; i < notEqualArr.length; i++) {
    const equation = notEqualArr[i]
    const a = equation.split('!=')[0]
    const b = equation.split('!=')[1]
    if (a === b) {
      return false
    }
    if (map.get(a) !== undefined && map.get(b) !== undefined) {
      if (uf.isConnected(map.get(a)!, map.get(b)!)) {
        return false
      }
    }
  }
  return true
};

test('equationsPossible', () => {
  // expect(
  //   equationsPossible(["a==b", "b!=a"])
  // ).toBeFalsy()
  // expect(
  //   equationsPossible(["a==b", "b!=c", "c==a"])
  // ).toBeFalsy()

  // expect(
  //   equationsPossible(["c==c", "b==d", "x!=z"])
  // ).toBeTruthy()

  expect(
    equationsPossible(["c==c", "b==d", "x!=z"])
  ).toBeTruthy()


})
// @lc code=end

