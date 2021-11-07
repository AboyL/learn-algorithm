function swap<T = number>(arr: T[], a: number, b: number) {
  const t: T = arr[a]
  arr[a] = arr[b]
  arr[b] = t
}

class MaxHeap {
  private data: number[] = []
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

  heapify(arr: number[]) {
    // 对数组进行一次堆化
    this.data = []
    this.count = arr.length
    arr.forEach((v, i) => {
      this.data[i + 1] = v
    })

    for (let i = Math.floor(arr.length / 2); i >= 1; i--) {
      this.shiftDown(i)
    }
  }
  
  // 对叶子节点进行操作
  private shiftUp(k: number) {
    // 对元素位置进行调整
    // 对于堆 永远有父节点大于子节点
    // 对子节点i 有 parent=Math.floor(i/2) 
    // 对父节点i 有 left child=i*2  right child =i*2+1
    // 进行替换位置的时候 需要对比的初始值为 子节点 i= this.count
    while (k > 1 && this.data[Math.floor(k / 2)] < this.data[k]) {
      swap(this.data, Math.floor(k / 2), this.data[k])
      // 改变k
      k = Math.floor(k / 2)
    }
  }

  // 添加元素
  insert(item: number) {

    // 注意 data[0] 应该永远是undefined 便于计算
    this.data[++this.count] = item
    // 调整位置
    this.shiftUp(this.count)
  }

  // 对非叶子节点进行操作
  private shiftDown(k: number) {
    // 先比较左右两边的子节点 找到最大的子节点 假如最大的子节点比父元素小
    // 则不交换
    // 否则交换
    // 考虑有子节点没有子节点的情况 有子节点必定有左子节点

    if (k * 2 < this.count) {
      let i = k * 2
      let leftChild = this.data[k * 2]

      if (k * 1 + 1 < this.count) {
        // 存在右节点
        let rightChild = this.data[k * 2 + 1]
        i = leftChild > rightChild ? k * 2 : k * 2 + 1
      }

      if (this.data[k] < this.data[i]) {
        swap(this.data, k, i)
        k = i
        // 对下一轮的节点进行判断
        this.shiftDown(k)
      }
    }


  }

  // 取出元素 必定为最大的元素
  extractMax(): number {

    if (this.count === 0) {
      throw new Error('没有元素了')
    }

    const max = this.data[1]
    swap(this.data, 1, this.count)
    this.data.pop()
    this.count--
    this.shiftDown(1)
    return max
  }
}

export default MaxHeap