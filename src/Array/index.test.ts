// 一个优秀的数组的数据结构应该有的内容
// 1. 如何在数组最后加一个元素 O(1)
// 2. 如何在数组最前面添加一个元素 O(n) 
// 3. 如何在数组的中间插入一个元素 O(n/2)=O(n)
// 4. 如何查询数组中某个位置的元素
// 5. 如何判断数组中是否有某个元素
// 6. 如何获取到某个元素的index下标
// 7. 如何获取到某个元素的全部index下标
// 8. 如何从数组中删除元素，指定索引
// 9. 如何删除某个元素,指定元素，只删除一个
// 10. 如何删除某个元素,指定元素，全部删除

test('should ', () => {
  let arr: number[] = []
  arr.push(1)
  expect(arr[0]).toBe(1)
  arr.unshift(2)
  expect(arr[0]).toBe(2)
  expect(arr[1]).toBe(1)
  arr.unshift(4)
  arr.splice(1, 0, 3) // 从当前下标开始 删除的个数 ...插入的数据
  expect(arr[0]).toBe(4)
  expect(arr[1]).toBe(3)
  expect(arr[2]).toBe(2)
  expect(arr[3]).toBe(1)
  expect(arr).toHaveLength(4)
  expect(arr.includes(1)).toBeTruthy()
  expect(arr.includes(5)).toBeFalsy()
  expect(arr.indexOf(1)).toBe(3)
  arr.splice(1, 1) // 从当前下标开始 删除的个数 ...插入的数据
  expect(arr[0]).toBe(4)
  expect(arr[1]).not.toBe(3)
  expect(arr[1]).toBe(2)
  expect(arr[2]).toBe(1)
  expect(arr).toHaveLength(3)

  // 没有根据元素进行删除的方案 只能通过 先找到index再进行删除
  // 也么有删除全部的方案 但是可以使用filter进行过滤
  arr.push(0)
  arr.push(0)
  arr.push(0)
  expect(arr.lastIndexOf(0)).toBe(5)
  arr = arr.filter(v => v !== 0)
  expect(arr.indexOf(0)).toBe(-1)

})

