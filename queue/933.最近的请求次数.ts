/*
 * @lc app=leetcode.cn id=933 lang=typescript
 *
 * [933] 最近的请求次数
 */

// @lc code=start
// 就一个数组然后进行判断就完事了
class RecentCounter {
    list: number[]
    max: number = 3000
    constructor() {
        this.list = []
    }

    ping(t: number): number {
        this.list.push(t)
        this.list = this.list.filter(v => v <= t && v >= t - this.max)
        return this.list.length
    }
}

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */
// @lc code=end

