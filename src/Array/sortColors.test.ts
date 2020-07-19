// 给定一个有个n元素的数组，取值只有0,1,2三个可能，为这个数组进行排序
// 给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

// 此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

// 三路排序
function sortColors(nums: number[]): void {

  let zero = -1 // [0,zero]
  let two = nums.length // [two,num.length-1]

  for (let i = 0; i < two;) {
    if (nums[i] === 1) {
      i++
    } else if (nums[i] === 2) {
      two--
      const tem = nums[two]
      nums[two] = nums[i]
      nums[i] = tem
    } else {
      zero++
      const tem = nums[zero]
      nums[zero] = nums[i]
      nums[i] = tem
      // 此时数据已经处理过了
      i++
    }
  }
};


test('sortColors', () => {
  const num1 = [2, 0, 2, 1, 1, 0]
  sortColors(num1)
  expect(num1).toEqual([0, 0, 1, 1, 2, 2])
})