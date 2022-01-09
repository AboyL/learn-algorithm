export default {}
/*
 * @lc app=leetcode.cn id=373 lang=typescript
 *
 * [373] 查找和最小的K对数字
 */

// @lc code=start

// 怎么感觉有点像是前缀和的处理，但是前缀和是针对一个数组的
// 用堆来解
// k*k个数对的添加可以更有顺序一些。

// 数组1的下标用i1表示，数组2的下标用i2表示。数对用[i1,i2]=[xx,xx]表示。

// 1、初始化堆：首先添加k个数对[0~k-1,0]到容量为k的最小堆中；

// 2、选出和最小的数对[m,n],输出到结果并从堆中删除；

// 3、添加新数对[m,n+1]到堆中；

// 4、重复2、3直到获得k个结果。



function swap<T = number>(arr: T[], a: number, b: number) {
  const t: T = arr[a]
  arr[a] = arr[b]
  arr[b] = t
}

const compare = (a: number, b: number) => {
  return a > b
}

interface ItemI {
  val: number,
  index: number
}
type Item = [ItemI, ItemI]

const getVal = (v: Item) => {
  if (!v) {
    return Infinity
  }
  return v[0].val + v[1].val
}

class MinHeap {
  private data: Item[] = []
  private count: number = 0;

  size() {
    return this.count
  }

  isEmpty() {
    return this.count === 0
  }

  getData() {
    return this.data
  }

  heapify(arr: Item[]) {
    this.data = []
    this.count = arr.length
    if (arr.length <= 1) {
      this.data = arr
      return arr
    }
    arr.forEach((v, i) => {
      this.data[i] = v
    })
    for (let i = Math.floor((arr.length - 2) / 2); i >= 0; i--) {
      this.shiftDown(i)
    }
  }

  // 对叶子节点进行操作
  private shiftUp(k: number) {
    // 对元素位置进行调整
    // 对于堆 永远有父节点大于子节点
    // 对子节点i 有 parent=Math.floor((i-1)/2) 
    // 对父节点i 有 left child=i*2+1  right child =i*2+2
    // 进行替换位置的时候 需要对比的初始值为 子节点 i= this.count
    const pIndex = Math.floor((k - 1) / 2)
    if (k > 0 && compare(getVal(this.data[pIndex]), getVal(this.data[k]))) {
      // 进行位置的交换
      swap(this.data, k, pIndex)
      this.shiftUp(pIndex)
    }
  }

  // 添加元素
  insert(item: Item) {
    // 注意 data[0] 应该永远是undefined 便于计算
    this.data[this.count++] = item
    // 调整位置
    this.shiftUp(this.count - 1)
  }

  // 对非叶子节点进行操作
  private shiftDown(k: number) {
    // 向下进行比较
    const leftC = this.data[k * 2 + 1]
    const rightC = this.data[k * 2 + 2]
    const current = this.data[k]
    if (leftC === undefined && rightC === undefined) {
      return
    }
    const compareIndex = !compare(getVal(leftC), getVal(rightC)) ? k * 2 + 1 : k * 2 + 2
    if (compare(getVal(current), getVal(this.data[compareIndex]))) {
      // 进行位置的交换
      swap(this.data, k, compareIndex)
      this.shiftDown(compareIndex)
    }
  }

  // 取出元素 必定为最大的元素
  extractTarget(): Item {

    if (this.data.length === 0) {
      throw new Error('没有元素了')
    }
    // 先跟最后一个元素调换一个位置再逐步进行下走
    swap(this.data, 0, --this.count)
    const target = this.data.pop()
    this.shiftDown(0)
    return target!
  }
}


function kSmallestPairs(nums1: number[], nums2: number[], k: number): number[][] {
  const minHeap = new MinHeap()
  let first = 0
  let second = 0
  // 构造最开始的结构
  for (let i = 0; i < k && i < nums1.length; i++) {
    minHeap.insert([{ index: i, val: nums1[i] }, { index: 0, val: nums2[0] }])
  }
  let index = 0
  // 当拿出来了k个或者里面已经没有其他元素的时候 也就是first跟second都是最后一个数的时候
  first = 0
  second = 0
  let result: number[][] = []
  while (index < k && !minHeap.isEmpty()) {
    const i = minHeap.extractTarget()
    result.push([i[0].val, i[1].val])
    first = i[0].index
    second = i[1].index
    if (second < nums2.length - 1) {
      minHeap.insert([{ val: nums1[first], index: first }, { val: nums2[second + 1], index: second + 1 }])
    }
    //  else if (first < nums1.length - 1) {
    //   minHeap.insert([{ val: nums1[first + 1], index: first + 1 }, { val: nums2[second], index: second }])
    // }
    index++
  }

  return result
};

test('kSmallestPairs', () => {
  // expect(
  //   kSmallestPairs([1, 7, 11], [2, 4, 6], 3)
  // ).toEqual(
  //   [[1, 2], [1, 4], [1, 6]]
  // )

  // expect(
  //   kSmallestPairs([1, 2], [3], 3)
  // ).toEqual(
  //   [[1, 3], [2, 3]]
  // )


  expect(
    kSmallestPairs([1, 1, 2], [1, 2, 3], 10)
  ).toEqual(
    [[1, 1], [1, 1], [2, 1], [1, 2], [1, 2], [2, 2], [1, 3], [1, 3], [2, 3]]
  )

})
// @lc code=end

