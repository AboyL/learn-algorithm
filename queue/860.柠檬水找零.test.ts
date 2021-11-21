// 2021-11-21
// 在柠檬水摊上，每一杯柠檬水的售价为 5 美元。顾客排队购买你的产品，（按账单 bills 支付的顺序）一次购买一杯。
// 每位顾客只买一杯柠檬水，然后向你付 5 美元、10 美元或 20 美元。
// 你必须给每个顾客正确找零，也就是说净交易是每位顾客向你支付 5 美元。
// 注意，一开始你手头没有任何零钱。
// 给你一个整数数组 bills ，其中 bills[i] 是第 i 位顾客付的账。
// 如果你能给每位顾客正确找零，返回 true ，否则返回 false 。

/*
 * @lc app=leetcode.cn id=860 lang=typescript
 *
 * [860] 柠檬水找零
 */

// @lc code=start

// 感觉使用hash表进行处理会更加好 将金额作为key 有多少作为表格
// 实际上不用hash表也可以，只用两个变量来维护就好了
// 在找零的时候可以根据计算来进行找零
function lemonadeChange1(bills: number[]): boolean {
  const currentMoneyMap = new Map()
  currentMoneyMap.set(5, 0)
  currentMoneyMap.set(10, 0)
  // currentMoneyMap.set(20, 0) 20 必定找不开 不处理也没有关系
  for (let bill of bills) {
    if (bill === 5) {
      currentMoneyMap.set(5, currentMoneyMap.get(5) + 1)
      continue
    }
    if (bill === 10) {
      // 此时只能找零5元
      const n5 = currentMoneyMap.get(5)
      if (n5 > 0) {
        currentMoneyMap.set(5, n5 - 1)
        currentMoneyMap.set(10, currentMoneyMap.get(10) + 1)
        continue
      }
      // 没有5元则找零失败
      return false
    }

    if (bill === 20) {
      // 分情况讨论需要，肯定是要先处理10 再处理5元的
      // 两种情况 
      // 10+5
      // 5*3
      const n5 = currentMoneyMap.get(5)
      const n10 = currentMoneyMap.get(10)
      if (n10 >= 1 && n5 >= 1) {
        currentMoneyMap.set(5, n5 - 1)
        currentMoneyMap.set(10, n10 - 1)
        // currentMoneyMap.set(20, n10 - 1)
        continue
      }

      if (n5 >= 3) {
        currentMoneyMap.set(5, n5 - 3)
        continue
      }
      return false
    }
  }
  // 全部找零成功了
  return true
};
function lemonadeChange(bills: number[]): boolean {
  let n5 = 0
  let n10 = 0

  // currentMoneyMap.set(20, 0) 20 必定找不开 不处理也没有关系
  for (let bill of bills) {
    if (bill === 5) {
      n5++
      continue
    }
    if (bill === 10) {
      // 此时只能找零5元
      if (n5 > 0) {
        n5--
        n10++
        continue
      }
      // 没有5元则找零失败
      return false
    }

    if (bill === 20) {
      // 分情况讨论需要，肯定是要先处理10 再处理5元的
      // 两种情况 
      // 10+5
      // 5*3
      if (n10 >= 1 && n5 >= 1) {
        n5--
        n10--
        continue
      }

      if (n5 >= 3) {
        n5 = n5 - 3
        continue
      }
      return false
    }
  }
  // 全部找零成功了
  return true
};

test('lemonadeChange', () => {
  expect(lemonadeChange([5, 5, 10])).toBeTruthy()
  expect(lemonadeChange([5, 5, 10, 20,20])).toBeFalsy()
})
// @lc code=end

