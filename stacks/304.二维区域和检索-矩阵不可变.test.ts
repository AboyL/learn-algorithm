/*
 * @lc app=leetcode.cn id=304 lang=typescript
 *
 * [304] 二维区域和检索 - 矩阵不可变
 */

// @lc code=start
// 多重前缀和
class NumMatrix1 {
  preMatrixSum: number[][] = []
  constructor(matrix: number[][]) {
    for (let i = 0; i < matrix.length; i++) {
      this.preMatrixSum[i] = [0]
      let sum: number = 0
      for (let j = 0; j < matrix[i].length; j++) {
        sum += matrix[i][j]
        this.preMatrixSum[i].push(sum)
      }
    }
  }

  // 怎么确定方位
  sumRegion(row1: number, col1: number, row2: number, col2: number): number {
    let sum = 0

    for (let i = row1; i <= row2; i++) {
      sum += this.preMatrixSum[i][col2 + 1] - this.preMatrixSum[i][col1]
    }
    return sum
  }
}

// 优化方案
// f(i,j)=f(i−1,j)+f(i,j−1)−f(i−1,j−1)+matrix[i][j]​

class NumMatrix {
  preMatrixSum: number[][] = []
  constructor(matrix: number[][]) {
    const m = matrix.length
    if (m > 0) {
      const n = matrix[0].length;
      this.preMatrixSum = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
      for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
          this.preMatrixSum[i + 1][j + 1] =
            this.preMatrixSum[i][j + 1] + this.preMatrixSum[i + 1][j]
            - this.preMatrixSum[i][j] + matrix[i][j]
        }
      }
    }
  }

  // 怎么确定方位
  // 为什么有一个加法 确定指向位置
  sumRegion(row1: number, col1: number, row2: number, col2: number): number {

    return this.preMatrixSum[row2 + 1][col2 + 1]
      - this.preMatrixSum[row2 + 1][col1]
      - this.preMatrixSum[row1][col2 + 1]
      + this.preMatrixSum[row1][col1]
  }
}
test('NumMatrix', () => {
  const nm = new NumMatrix([[-4, -5]])
  expect(nm.sumRegion(0, 0, 0, 1)).toBe(-9)
})
/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */
// @lc code=end

