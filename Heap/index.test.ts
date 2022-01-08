import MaxHeap from "."

test('max heap', () => {
  const arr1 = [1, 2, 3]
  const maxHeap = new MaxHeap()
  arr1.forEach(value => {
    maxHeap.insert(value)
  })

  expect(maxHeap.getData()).toEqual([3, 1, 2])

  const arr2 = [1, 2, 3]
  const maxHeap2 = new MaxHeap()
  maxHeap2.heapify(arr2)

  expect(maxHeap2.getData()).toEqual([3, 2, 1])

  // 进行出队操作
  let arr3 = [];
  while (!maxHeap.isEmpty()) {
    arr3.push(maxHeap.extractTarget())
  }
  expect(arr3).toEqual([3, 2, 1])

})