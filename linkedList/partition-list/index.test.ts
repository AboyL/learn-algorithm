// 2021-11-14
// 86. 分隔链表
// 给你一个链表的头节点 head 和一个特定值 x ，
// 请你对链表进行分隔，使得所有 小于 x 的节点都出现在 大于或等于 x 的节点之前。
// 你应当 保留 两个分区中每个节点的初始相对位置。



export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}


// 实现思路应该就是一个快排的子集了
function partition(head: ListNode | null, x: number): ListNode | null {
  if (!head) {
    return null
  }
  const dummyLeft = new ListNode(-1, null)
  let left = dummyLeft
  const dummyRight = new ListNode(-1, null)
  let right = dummyRight

  let current: ListNode | null = head
  while (current) {
    if (current.val >= x) {
      right.next = current;
      right = current;
    } else {
      left.next = current;
      left = current;
    }
    current = current.next
  }
  right.next = null
  left.next = dummyRight.next
  return dummyLeft.next
};

const generateLinkedList = (arr: number[]) => {
  const head = new ListNode(arr[0], null)
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i], null)
    current = current.next
  }
  return head
}

test('partition', () => {
  expect(partition(generateLinkedList([5, 6, 1, 3, 2, 4]), 3))
    .toEqual(generateLinkedList([1, 2, 5, 6, 3, 4]))
})