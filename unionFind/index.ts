export class UnionFind {
  ids: number[] = []
  count: number = 0
  constructor(n: number) {
    this.count = n
    for (let i = 0; i < n; i++) {
      this.ids[i] = i
    }
  }

  find(n: number) {
    return this.ids[n]
  }

  isConnected(p: number, q: number) {
    return this.find(p) === this.find(q)
  }

  // 合并两个组
  // 合并的操作是n级别，比较慢
  unionElements(p: number, q: number) {
    const pId: number = this.find(p)
    const qId: number = this.find(q)

    if (qId === pId) {
      return
    }

    // 也可以反过来
    for (let i = 0; i < this.count; i++) {
      if (this.ids[i] === qId) {
        this.ids[i] = pId
      }
    }
  }
}


// 优化合并的操作
export class UnionFind2 {
  parents: number[] = []
  count: number = 0
  constructor(n: number) {
    this.count = n
    for (let i = 0; i < n; i++) {
      this.parents[i] = i
    }
  }

  find(n: number) {
    while (this.parents[n] !== n) {
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

    // 也可以反过来
    this.parents[pRoot] = qRoot
  }
}

// 基于size的优化
export class UnionFind3 {
  parents: number[] = []
  sz: number[] = []
  count: number = 0
  constructor(n: number) {
    this.count = n
    for (let i = 0; i < n; i++) {
      this.parents[i] = i
      this.sz[i] = 1
    }
  }

  find(n: number) {
    while (this.parents[n] !== n) {
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

    if (this.sz[pRoot] < this.sz[qRoot]) {
      this.parents[pRoot] = qRoot
      this.sz[qRoot] += this.sz[pRoot]
    } else {
      this.parents[qRoot] = pRoot
      this.sz[pRoot] += this.sz[qRoot]
    }
  }
}


// 基于 rank 的优化

export class UnionFind4 {
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

// 路径压缩

export class UnionFind5 {
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
