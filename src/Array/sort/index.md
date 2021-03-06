## 排序算法

## 选择排序 Selection Sort
1. 找到最小的值
2. 将最小的值置为第一位
3. 移动index，重复1

## 插入排序
为arr[i]找到正确的位置，第二层循环可以提前结束，理论上插入排序比选择排序要快。<br>
在处理接近有序的序列的时候,效率可以解决`On` 可以作为一个子过程进行优化
1. 将当前的元素逐步与前面的元素进行对比
2. 假如满足交换条件 进行一次交换
3. 交换成功后 重复1 直到不能交换
4. 效率影响 交换是一种很影响效率的方案，可以进行一次先计算

1. 2 5 7 4    i=3
2. 2 5 7 4 4  
3. 2 5 7 7 4  
3. 2 5 5 7 4  
3. 2 4 5 7 


### 了解
- 冒泡排序
- 希尔排序


### 高级算法

### 归并排序 Merge Sort
非原地排序，必须开辟新的空间

自底向下的归并排序
nlog(N)级别的算法。
怎么来的
1. 将n个数字划分为log(N)个层级
2. 使用O(n)级别的算法对每层进行排序
3. 不断进行递归操作

对 左半部分以及右半部分都排好序的 数组 进行进行一次合并？
需要开辟一个临时空间。但是时间效率大于空间效率。
使用三个索引进行跟踪。
k表示正在拍的。l表示左边的，r表示右边的，一步步进行对比 一步步进行移动。


还有一个自底部向下的排序。这个是使用循环来代替递归。


### 快速排序
核心思想
一样是类似插入排序一样，为arr[i]找到正确的位置,但是实现方式不一样。使用快速排序，可以在一次周期内找到对应的位置。

原理
快速排序每次从当前考虑的数组中选择一个元素，以这个元素为基点，将这个元素移动到排序完成后所处的位置，并且使得，左边的所有的元素小于该元素，右边的所有的元素大于该元素。随后**递归**对左边与右边的数组进行排序。这个将数组分成两部分的过程叫做**partition(分区)**，通常使用第一个元素作为分界点。
partition的变量定义:
* v为当前的基准变量
* i为第一个位置(left)
* j为小于v与大于v的分界点,最终也是v的位置
* i为当前访问的元素，因此有
对于 数组 arr[l....r]
arr[l....j]<v
arr[l+1,i-1]>v


1. **一次排序后，保证 arr[i] 坐标的元素小于 arr[i] 右边的元素大于 arr[i]**
2. 再依次在左边选择一个元素进行排序 在右边选择一个元素进行排序

快速排序的优化方案
优化要考虑的Neri
1. 小数据的情况
2. 近乎有序的情况
3. 大量重复值 


1. 使用插入排序进行优化 对少数量的内容使用插入排序
2. 随机化。快速排序最差情况是 **O(n^2)** 在近乎有序的情况下 使用最左边的那个，可以使用中间的那个或者随机的一个，最后会得到一个期望值是 Nlog(N)
3. 双路快速排序 可以解决多重复值的问题，将=v的元素进行左右两边的分散
4. 三路排序 一样针对多值重复问题 将数组分成三部分 <v \=v >v
![](http://aboyl.org/2020-11-21-120732.png)


这两种算法都是分治算法。
将原问题分解成同等结构的子问题，子问题解决后，原问题也就解决了。
归并排序在合。快速排序在分