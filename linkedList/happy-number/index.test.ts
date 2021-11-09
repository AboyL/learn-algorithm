// 2021-11-08
// 202.快乐数
// 编写一个算法来判断一个数 n 是不是快乐数。

// 「快乐数」定义为：

// 对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
// 然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
// 如果 可以变为  1，那么这个数就是快乐数。
// 如果 n 是快乐数就返回 true ；不是，则返回 false 。

// 1. 直接存入到数组里面然后进行判断 最次
// 2. 从map里面进行判断 空间复杂度高
// 3. 双指针 链表 较优 虽然时间复杂度一样高，但是安全不会内存爆炸
// 双指针解法
function isHappy(n: number): boolean {
  if (n === 1) {
    return true
  }

  let fast = n // 快指针
  let slow = n // 慢指针
  let offset = 2 // 偏移量
  let currentOffset = 0 // 当前偏移值

  // 获取新一轮循环
  const getHappy = (num: number) => {
    const str = `${num}`
    const arr = str.split('')
    let temp = 0
    arr.forEach(a => {
      temp += (Number(a) ** 2)
    })
    return temp
  }
  while (fast !== 1) {
    fast = getHappy(fast)
    if (currentOffset === offset) {
      slow = getHappy(slow)
      currentOffset = 0
    } else {
      currentOffset++
    }
    if (fast === slow) {
      return false
    }
  }
  return true
};

// map解法
function isHappy1(n: number): boolean {
  const map = new Map()
  let iterationNumber = n
  while (iterationNumber !== 1) {
    const str = `${iterationNumber}`
    const arr = str.split('')
    let temp = 0
    arr.forEach(a => {
      temp += (Number(a) ** 2)
    })
    iterationNumber = temp
    if (!map.get(iterationNumber)) {
      map.set(iterationNumber, true)
    } else {
      return false
    }
  }
  return true
};

test('isHappy', () => {
  expect(isHappy(19)).toBeTruthy()
})