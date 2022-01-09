export default {}
/*
 * @lc app=leetcode.cn id=692 lang=typescript
 *
 * [692] 前K个高频单词
 */

// @lc code=start

// 给一非空的单词列表，返回前 k 个出现次数最多的单词。
// 返回的答案应该按单词出现频率由高到低排序。如果不同的单词有相同出现频率，按字母顺序排序。

// 感觉上hash表做比较快的样子
// 但是hash表的一个问题是没有办法做第二个判断，所以还是需要最大堆来处理
// 判断依据需要进行一下改变
// 1 不相等大的在前面
// 2 假如相等，比较字符大小
function topKFrequent(words: string[], k: number): string[] {
  const hashMap = new Map<string, number>()
  for (let i of words) {
    hashMap.set(i, hashMap.get(i) ? hashMap.get(i)! + 1 : 1)
  }
  // 返回最大的几个数据

  // 通过堆来解决
  function swap<T = number>(arr: T[], a: number, b: number) {
    const t: T = arr[a]
    arr[a] = arr[b]
    arr[b] = t
  }

  const compare = (a: string, b: string) => {
    if (hashMap.get(a) !== hashMap.get(b)) {
      return hashMap.get(a)! < hashMap.get(b)!
    }
    return a > b
  }

  class MaxHeap {
    private data: string[] = []
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

    heapify(arr: string[]) {
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
      if (k > 0 && compare(this.data[pIndex], this.data[k])) {
        // 进行位置的交换
        swap(this.data, k, pIndex)
        this.shiftUp(pIndex)
      }
    }

    // 添加元素
    insert(item: string) {
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
      const compareIndex = !compare(leftC, rightC) ? k * 2 + 1 : k * 2 + 2
      if (compare(current, this.data[compareIndex])) {
        // 进行位置的交换
        swap(this.data, k, compareIndex)
        this.shiftDown(compareIndex)
      }
    }

    // 取出元素 必定为最大的元素
    extractTarget(): string {

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

  const maxHeap = new MaxHeap()
  maxHeap.heapify([...hashMap.keys()])

  const reusult: string[] = []
  while (k > 0 && !maxHeap.isEmpty()) {
    reusult.push(maxHeap.extractTarget())
    k--
  }
  return reusult
};

test('topKFrequent', () => {
  expect(
    topKFrequent(["i", "love", "leetcode", "i", "love", "coding"], 2)
  ).toEqual(
    ["i", "love"]
  )
})
// @lc code=end

