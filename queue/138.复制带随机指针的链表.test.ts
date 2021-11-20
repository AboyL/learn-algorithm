// 2021-11-19
// 给你一个长度为 n 的链表，每个节点包含一个额外增加的随机指针 random ，该指针可以指向链表中的任何节点或空节点。

// 构造这个链表的 深拷贝。 深拷贝应该正好由 n 个 全新 节点组成，
// 其中每个新节点的值都设为其对应的原节点的值。
// 新节点的 next 指针和 random 指针也都应指向复制链表中的新节点，
// 并使原链表和复制链表中的这些指针能够表示相同的链表状态。复制链表中的指针都不应指向原链表中的节点 。


/*
 * @lc app=leetcode.cn id=138 lang=typescript
 *
 * [138] 复制带随机指针的链表
 */

// @lc code=start
export class Node {
  val: number
  next: Node | null
  random: Node | null
  constructor(val?: number, next?: Node, random?: Node) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
    this.random = (random === undefined ? null : random)
  }
}



// 思考 可以构建一个hash表，问题就是在深拷贝这里，因为有指针的原因，所以必须要存表
// 那么问题是怎么存？ 使用什么作为键值对来进行对应
// 数组或者map，可以使用数组进行一一对应，再来处理  使用多个数组进行处理

function copyRandomList2(head: Node | null): Node | null {
  if (!head) {
    return null
  }
  const oldList: Node[] = []
  const currentList: Node[] = []
  function genLinkedList(head: Node | null): Node | null {
    if (!head) {
      return null
    }
    oldList.push(head)
    const newNode = new Node(head.val)
    newNode.next = genLinkedList(head.next)
    currentList.unshift(newNode)
    return newNode
  };
  const newHead = genLinkedList(head)


  // 对
  let current = newHead
  let oldHead: Node | null = head

  while (current && oldHead) {
    // 检查
    if (oldHead.random === null) {
      current.random === null
    } else {
      const oldRandomIndex = oldList.indexOf(oldHead.random)
      current.random = currentList[oldRandomIndex]
    }
    current = current.next
    oldHead = oldHead.next
  }


  return newHead
};

// 这个解法的核心就是key与value的对应，实在是精妙
// 当时要搞清楚回溯是什么意思，其实主要还是要有一个对应表
var copyRandomList = function (head: Node | null, cachedNode = new Map()) {
  if (head === null) {
    return null;
  }
  if (!cachedNode.has(head)) {
    cachedNode.set(head, { val: head.val });
    Object.assign(cachedNode.get(head),
      {
        next: copyRandomList(head.next, cachedNode),
        random: copyRandomList(head.random, cachedNode)
      })
  }
  return cachedNode.get(head);
}

test('copyRandomList', () => {
  const a = new Node(1)
  const b = new Node(2)
  const c = new Node(3)
  a.next = b
  b.next = c
  c.next = null
  a.random = b
  b.random = b
  c.random = a

  // expect(copyRandomList(a)).toEqual(a)


  const newA=copyRandomList(a)

  expect(newA.next===a.next).toBeFalsy()

})

// @lc code=end

