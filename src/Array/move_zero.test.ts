// 每日一题中有进行练习


// 双指针解法
function moveZeroes0(nums: number[]): void {
  let last = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[last++] = nums[i]
    }
  }
  for (let i = last; i < nums.length; i++) {
    nums[i] = 0
  }
};

function moveZeroes1(nums: number[]): void {
  let last = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      // 为0做数据交换 避免自己跟自己进行交换
      if (i !== last) {
        const tem = nums[last]
        nums[last] = nums[i]
        nums[i] = tem
      }
      last++
    }
  }
};

const moveZeroes = moveZeroes1

test('moveZeroes', () => {
  const nums = [0, 1, 0, 3, 12]
  moveZeroes(nums)
  expect(nums).toEqual(
    [1, 3, 12, 0, 0]
  )

  const nums1 = [1, 2, 3, 0]
  moveZeroes(nums1)
  expect(nums1).toEqual(
    [1, 2, 3, 0]
  )

  const nums2 = [0, 0, 0]
  moveZeroes(nums2)
  expect(nums2).toEqual(
    [0, 0, 0]
  )

  const nums3 = [0, 0, 1]
  moveZeroes(nums3)
  expect(nums3).toEqual(
    [1, 0, 0]
  )

})