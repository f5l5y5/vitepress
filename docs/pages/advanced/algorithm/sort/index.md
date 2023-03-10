# 8 十大排序算法比较

## 8.1 冒泡排序（Bubble Sort）

### 8.1.1 思路

-   每次较两个相邻的元素
-   如果第一个比第二个大，互换位置
-   重复上述步骤, 最后一个不需要比较
    <br />
    ![image.png](/advanced/algorithm/81.webp)

### 8.1.2 实现

```js
function bubbleSort(arr) {
	console.time('改进前冒泡排序耗时')
	if (arr.length <= 1) return
	//1. 确定循环多少次
	for (let i = 0; i < arr.length - 1; i++) {
		//2. 循环起始点 每次循环j与后一位进行比较 大于则调换位置
		for (let j = 0; j < arr.length - i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
			}
		}
	}
	console.timeEnd('改进前冒泡排序耗时')
}
//优化版本 当某次冒泡操作已经没有数据交换时，说明已经达到完全有序，不用再继续执行后续的冒泡操作。
function bubbleSort1(arr) {
	console.time('改进后冒泡排序耗时')
	if (arr.length <= 1) return
	//1. 确定循环多少次
	for (let i = 0; i < arr.length - 1; i++) {
		// 确定内层循环是否是有序
		let hasChange = false
		//2. 循环起始点 每次循环j与后一位进行比较 大于则调换位置
		for (let j = 0; j < arr.length - i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
				hasChange = true
			}
		}
		//如果有序直接跳出当前循环
		if (!hasChange) break
	}
	console.timeEnd('改进后冒泡排序耗时')
}

//测试
const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
bubbleSort(arr) //改进前冒泡排序耗时: 0.106ms
bubbleSort1(arr) //改进后冒泡排序耗时: 0.006ms
```

### 8.1.3 分析

-   第一，冒泡排序是原地排序算法吗 ？
    -   冒泡的过程只涉及相邻数据的交换操作，只需要常量级的临时空间，所以它的空间复杂度为 O(1)，是一个原地排序算法。
-   第二，冒泡排序是稳定的排序算法吗 ？
    -   在冒泡排序中，只有交换才可以改变两个元素的前后顺序。
        为了保证冒泡排序算法的稳定性，当有相邻的两个元素大小相等的时候，我们不做交换，相同大小的数据在排序前后不会改变顺序。
        所以冒泡排序是稳定的排序算法。
-   第三，冒泡排序的复杂度是多少 ？
    -   时间复杂度 O(n^2)，空间复杂度 O(1)，稳定的内排序

## 8.2 插入排序（Insertion Sort）

插入排序又为分为 直接插入排序 和优化后的 拆半插入排序 与 希尔排序，我们通常说的插入排序是指直接插入排序。

### 8.2.1 思路

插入排序的工作原理：通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。
<br />

![image.png](/advanced/algorithm/82.webp)

步骤：

-   从第一个元素开始，该元素可以认为已经排序
-   取出下一个元素，在已经排序的序列中从后向前扫描
-   依次与之前的数进行比较，直到找到比自己小的的位置
-   重复 2-3

### 8.2.2 实现

```js
function insertionSort(arr) {
	console.time('快速排序耗时')
	const len = arr.length
	if (len <= 1) return
	// 每次比较元素的的索引 和当前元素的值
	let preIndex, current
	// 初始值定在数组第二个数
	for (let i = 1; i < len; i++) {
		//定义索引起始值
		preIndex = i - 1
		//定义第一个比较的数为第二个数
		current = arr[i]
		//当前索引大于等于0 说明对比完成 并且当前的数比之前的索引数值小才一直往前移动
		while (preIndex >= 0 && current < arr[preIndex]) {
			// 如果arr[preIndex]>current 移动过程中,不断的将前一个值赋值给后一个值
			// 例如 [1,5,6,4] current=4 ==> preIndex:2 6赋值给4 [1,5,6,6] ==> preIndex:1 接着比较 [1,5,5,6] ==> preIndex:0 不满足current<arr[preIndex] 跳出循环 ==>  将preIndex+1 位置赋值为current值
			arr[preIndex + 1] = arr[preIndex]
			preIndex--
		}
		//跳出循环后，说明找到一个值arr[preIndex] 比我current值小  将current值赋值给preIndex+1
		arr[preIndex + 1] = current
	}

	console.timeEnd('快速排序耗时')
}
function insertionSort1(arr) {
	console.time('快速排序耗时')
	const len = arr.length
	if (len <= 1) return
	// 初始值定在数组第二个数
	for (let i = 1; i < len; i++) {
		//定义索引起始值
		preIndex = i - 1
		//定义第一个比较的数为第二个数
		current = arr[i]
		//当前索引大于等于0 说明对比完成 并且当前的数比之前的索引数值小才一直往前移动
		while (preIndex >= 0 && current < arr[preIndex]) {
			preIndex--
		}
		//使用splice方法 不需要里面的两个赋值语句
		//跳出循环后，说明找到一个值arr[preIndex] 比我current值小
		//插入到preIndex索引后
		//删除原current的值
		arr.splice(i, 1)
		arr.splice(preIndex + 1, 0, current)
	}

	console.timeEnd('快速排序耗时')
}

//测试
const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
insertionSort(arr) //快速排序耗时: 0.075ms
insertionSort1(arr) //快速排序耗时: 0.188ms
```

### 8.2.3 分析

-   第一，插入排序是原地排序算法吗 ？
    -   插入排序算法的运行并不需要额外的存储空间，所以空间复杂度是 O(1)，所以，这是一个原地排序算法。
-   第二，插入排序是稳定的排序算法吗 ？
    -   在插入排序中，对于值相同的元素，我们可以选择将后面出现的元素，插入到前面出现元素的后面，这样就可以保持原有的前后顺序不变，所以插入排序是稳定的排序算法。
-   第三，插入排序的复杂度是多少 ？
    -   平均时间复杂度 O(n^2)，空间复杂度 O(1)，稳定的内排序

## 8.3 选择排序（Selection Sort）

### 8.3.1 思路

思路：选择排序算法的实现思路有点类似插入排序，也分已排序区间和未排序区间。但是选择排序每次会从未排序区间中找到最小的元素，将其放到已排序区间的末尾。<br />
步骤：

1.  首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置。
2.  再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
3.  重复第二步，直到所有元素均排序完毕。
    <br />
    ![image.png](/advanced/algorithm/83.webp)

### 8.3.2 实现

```js
function selectionSort(arr) {
	console.time('选择排序耗时')
	let len = arr.length
	let minIndex, temp
	for (let i = 0; i < len; i++) {
		//先定义最小的索引
		minIndex = i
		// 遍历找出最小的值保存索引
		for (j = i + 1; j < len; j++) {
			if (arr[minIndex] > arr[j]) {
				minIndex = j
			}
		}
		//获取到最小值索引，与当前的索引进行位置互换
		// [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]]
		temp = arr[minIndex]
		arr[minIndex] = arr[i]
		arr[i] = temp
	}
	console.timeEnd('选择排序耗时')
}

//测试
const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
selectionSort(arr) //选择排序耗时: 0.099ms
```

### 8.3.3 分析

-   第一，选择排序是原地排序算法吗 ？
    -   选择排序空间复杂度为 O(1)，是一种原地排序算法。
-   第二，选择排序是稳定的排序算法吗 ？
    -   选择排序每次都要找剩余未排序元素中的最小值，并和前面的元素交换位置，这样破坏了稳定性。所以，选择排序是一种不稳定的排序算法。
-   第三，选择排序的复杂度是多少 ？
    -   平均时间复杂度 O(n^2)，空间复杂度 O(1)，不稳定的内排序
    -   适合数据规模较小的排序

## 8.4 希尔排序（Shell Sort）

### 8.4.1 思路

希尔排序的核心在于间隔序列的设定。既可以提前设定好间隔序列，也可以动态的定义间隔序列。

-   先将整个待排序的记录序列分割成为若干子序列。
-   分别进行直接插入排序。
-   待整个序列中的记录基本有序时，再对全体记录进行依次直接插入排序。
    <br />
    ![image.png](/advanced/algorithm/84.gif)

    <br />
    例如：

    1. 举个易于理解的例子：[35, 33, 42, 10, 14, 19, 27, 44]，我们采取间隔 4。创建一个位于 4 个位置间隔的所有值的虚拟子列表。下面这些值是 { 35, 14 }，{ 33, 19 }，{ 42, 27 } 和 { 10, 44 }。
       ![image.png](/advanced/algorithm/841.webp)
    2. 我们比较每个子列表中的值，并在原始数组中交换它们（如果需要）。完成此步骤后，新数组应如下所示。
       ![image.png](/advanced/algorithm/842.webp)
    3. 然后，我们采用 2 的间隔，这个间隙产生两个子列表：{ 14, 27, 35, 42 }， { 19, 10, 33, 44 }。
       ![image.png](/advanced/algorithm/843.webp)
    4. 我们比较并交换原始数组中的值（如果需要）。完成此步骤后，数组变成：[14, 10, 27, 19, 35, 33, 42, 44]，图如下所示，10 与 19 的位置互换一下。
       ![image.png](/advanced/algorithm/844.webp)
    5. 最后，我们使用值间隔 1 对数组的其余部分进行排序，Shell sort 使用插入排序对数组进行排序。
       ![image.png](/advanced/algorithm/845.webp)

### 8.4.2 实现

```js
function shellSort(arr) {
	console.time('希尔排序耗时')
	let len = arr.length
	let gap = 1
	let temp
	// 定义动态间隔序列 3
	while (gap < len / 3) {
		gap = gap * 3 + 1
	}
	for (gap; gap > 0; gap = Math.floor(gap / 3)) {
		for (let i = gap; i < len; i++) {
			temp = arr[i]
			let j = i - gap
			for (; j >= 0 && arr[j] > temp; j -= gap) {
				arr[j + gap] = arr[j]
			}
			arr[j + gap] = temp
		}
	}

	console.timeEnd('希尔排序耗时')
}
//测试
const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
shellSort(arr) //希尔排序耗时: 0.078ms
```

### 8.4.3 分析

-   第一，希尔排序是原地排序算法吗 ？
    -   希尔排序过程中，只涉及相邻数据的交换操作，只需要常量级的临时空间，空间复杂度为 O(1) 。所以，希尔排序是原地排序算法。
-   第二，希尔排序是稳定的排序算法吗 ？
    -   我们知道，单次直接插入排序是稳定的，它不会改变相同元素之间的相对顺序，但在多次不同的插入排序过程中，相同的元素可能在各自的插入排序中移动，可能导致相同元素相对顺序发生变化。因此，希尔排序不稳定。
-   第三，希尔排序的复杂度是多少 ？
    -   平均时间复杂度为 O(n \* logn), 平均空间复杂度为 O(1)，不占用额外内存且是不稳定的

## 8.5 快速排序（Quick Sort）

快速排序的特点就是快，而且效率高！它是处理大数据最快的排序算法之一。

### 8.5.1 思路

-   先找到一个基准点（一般指数组的中部），然后数组被该基准点分为两部分，依次与该基准点数据比较，如果比它小，放左边；反之，放右边。
-   左右分别用一个空数组去存储比较后的数据。
-   最后递归执行上述操作，直到数组长度 <= 1;
    ![image.png](/advanced/algorithm/85.gif)

### 8.5.2 实现

```js
function quickSort(arr) {
	if (arr.length <= 1) return arr
	//取基准点
	const midIndex = Math.floor(arr.length / 2)
	//取基准点的值，并删除原数组的值
	const valArr = arr.splice(midIndex, 1)
	const midIndexVal = valArr[0]
	//定义存放左右的数组
	const left = []
	const right = []
	//遍历数组 进行判断分配
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] < midIndexVal) {
			left.push(arr[i]) //比基准点小的放在左边数组
		} else {
			right.push(arr[i]) //比基准点大的放在右边数组
		}
	}
	//递归执行以上操作，对左右两个数组进行操作，直到数组长度为 <= 1
	return quickSort(left).concat(midIndexVal, quickSort(right))
}

// 快速排序
const quickSort1 = (arr, left, right) => {
	let len = arr.length,
		partitionIndex
	left = typeof left != 'number' ? 0 : left
	right = typeof right != 'number' ? len - 1 : right

	if (left < right) {
		partitionIndex = partition(arr, left, right)
		quickSort1(arr, left, partitionIndex - 1)
		quickSort1(arr, partitionIndex + 1, right)
	}
	return arr
}

const partition = (arr, left, right) => {
	//分区操作
	let pivot = left, //设定基准值（pivot）
		index = pivot + 1
	for (let i = index; i <= right; i++) {
		if (arr[i] < arr[pivot]) {
			swap(arr, i, index)
			index++
		}
	}
	swap(arr, pivot, index - 1)
	return index - 1
}

const swap = (arr, i, j) => {
	let temp = arr[i]
	arr[i] = arr[j]
	arr[j] = temp
}

//测试
const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
console.time('快速排序耗时')
quickSort(arr) //快速排序耗时: 0.137ms
quickSort1(arr) //快速排序耗时: 0.118ms
console.timeEnd('快速排序耗时')
```

```js
// 快速排序  原地快排
//    i->       <-j
// [d,a,b,c,e,f,g,h]
// i找到一个比e大的
// j找到一个比e小的
// i和j交换位置
// 最后i和j遇见

function quick1(arr, start, end) {
	// 双指针
	//先存储start索引
	let init = start
	//定义start为标记位
	let flag = arr[init]
	// start++  1 此处+1 是因为后面end需要找一个比flag小的数 但是不能遍历到init 0 这个位置
	start++
	while (start <= end) {
		//一直遍历出小于flag的end索引
		while (arr[end] > flag) {
			end--
		}
		//遍历出大于flag的start索引
		while (arr[start] < flag) {
			start++
		}
		// 到了这一步说明找到了满足上述条件的start和end
		//如果start 小于end索引 进行交换
		if (start < end) {
			;[arr[start], arr[end]] = [arr[end], arr[start]]
			start++
			end--
		}
	}
	//遍历完没有找到对应索引 将起始位置索引 与遍历后start-1 索引进行互换位置
	;[arr[init], arr[start - 1]] = [arr[start - 1], arr[init]]
	return start
}

function quickSort1(arr, start, end) {
	// 默认start是0 end是最后一个元素
	//如果start小于end进行快排
	if (start < end) {
		let index = quick1(arr, start, end) //标志位的值
		quickSort1(arr, start, index - 1)
		quickSort1(arr, index, end)
	}
	return arr
}

//核心思想:定义起始位置0，0先进行排序 找出arr[0]    使用i进行右移找出大于arr[0],j向左移动找出小于arr[0]，如果找出了先判断start是不是小于end 是的话进行互换。
//不是的则将当前0位置与start-1位置进行互换位置

//测试
// const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
const arr = [2, 1, 3]
// quickSort(arr) //堆排序耗时: 0.103ms

console.time('快速排序')
console.log('打印***', quickSort1(arr, 0, arr.length - 1))
console.timeEnd('快速排序')
```

### 8.5.3 分析

-   第一，快速排序是原地排序算法吗 ？
    -   因为 partition() 函数进行分区时，不需要很多额外的内存空间，所以快排是原地排序算法。
-   第二，快速排序是稳定的排序算法吗 ？
    -   和选择排序相似，快速排序每次交换的元素都有可能不是相邻的，因此它有可能打破原来值为相同的元素之间的顺序。因此，快速排序并不稳定。
-   第三，快速排序的复杂度是多少 ？
    -   时间复杂度 n\*logn 空间复杂度 logn 不稳定

## 8.6 归并排序（Merge Sort）

### 8.6.1 思路

排序一个数组，我们先把数组从中间分成前后两部分，然后对前后两部分分别排序，再将排好序的两部分合并在一起，这样整个数组就都有序了。
归并排序采用的是分治思想。
分治，顾名思义，就是分而治之，将一个大问题分解成小的子问题来解决。小的子问题解决了，大问题也就解决了。

![image.png](/advanced/algorithm/861.webp)
<br />

![image.png](/advanced/algorithm/86.gif)

::: tip
注：x >> 1 是位运算中的右移运算，表示右移一位，等同于 x 除以 2 再取整，即 x >> 1 === Math.floor(x / 2) 。
:::

### 8.6.2 实现

```js
function mergeSort(arr) {
	//采用自上而下的递归方法
	const len = arr.length
	if (len < 2) {
		return arr
	}
	// length >> 1 和 Math.floor(len / 2) 等价
	let middle = Math.floor(len / 2),
		left = arr.slice(0, middle),
		right = arr.slice(middle) // 拆分为两个子数组
	return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
	const result = []
	while (left.length && right.length) {
		// 注意: 判断的条件是小于或等于，如果只是小于，那么排序将不稳定.
		if (left[0] <= right[0]) {
			result.push(left.shift())
		} else {
			result.push(right.shift())
		}
	}
	while (left.length) result.push(left.shift())
	while (right.length) result.push(right.shift())
	return result
}

//测试
const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
console.time('归并排序耗时')
mergeSort(arr) //归并排序耗时:  0.128ms
console.timeEnd('归并排序耗时')
```

### 8.6.3 分析

-   第一，归并排序是原地排序算法吗 ？
    -   这是因为归并排序的合并函数，在合并两个有序数组为一个有序数组时，需要借助额外的存储空间。实际上，尽管每次合并操作都需要申请额外的内存空间，但在合并完成之后，临时开辟的内存空间就被释放掉了。在任意时刻，CPU 只会有一个函数在执行，也就只会有一个临时的内存空间在使用。临时内存空间最大也不会超过 n 个数据的大小，所以空间复杂度是 O(n)。所以，归并排序不是原地排序算法。
-   第二，归并排序是稳定的排序算法吗 ？
    -   merge 方法里面的 left[0] <= right[0] ，保证了值相同的元素，在合并前后的先后顺序不变。归并排序是稳定的排序方法。
-   第三，归并排序的复杂度是多少 ？
    -   从效率上看，归并排序可算是排序算法中的佼佼者。假设数组长度为 n，那么拆分数组共需 logn 步，又每步都是一个普通的合并子数组的过程，时间复杂度为 O(n)，故其综合时间复杂度为 O(n log n)。平均时间复杂度 O(nlogn), 空间复杂度(n), 需要额外空间且是稳定的

## 8.7 堆排序（Heap Sort）

-   堆的定义
-   堆其实是一种特殊的树。只要满足这两点，它就是一个堆。
-   堆是一个完全二叉树。

    -   完全二叉树：除了最后一层，其他层的节点个数都是满的，最后一层的节点都靠左排列。
    -   堆中每一个节点的值都必须大于等于（或小于等于）其子树中每个节点的值。也可以说：堆中每个节点的值都大于等于（或者小于等于）其左右子节点的值。这两种表述是等价的。

-   对于每个节点的值都大于等于子树中每个节点值的堆，我们叫作大顶堆。
-   对于每个节点的值都小于等于子树中每个节点值的堆，我们叫作小顶堆。
    ![image.png](/advanced/algorithm/871.webp)
    其中图 1 和 图 2 是大顶堆，图 3 是小顶堆，图 4 不是堆。除此之外，从图中还可以看出来，对于同一组数据，我们可以构建多种不同形态的堆。

### 8.7.1 思路

1. 将初始待排序关键字序列 (R1, R2 .... Rn) 构建成大顶堆，此堆为初始的无序区；
2. 将堆顶元素 R[1] 与最后一个元素 R[n] 交换，此时得到新的无序区 (R1, R2, ..... Rn-1) 和新的有序区 (Rn) ，且满足 R[1, 2 ... n-1] <= R[n]。
3. 由于交换后新的堆顶 R[1] 可能违反堆的性质，因此需要对当前无序区 (R1, R2 ...... Rn-1) 调整为新堆，然后再次将 R[1] 与无序区最后一个元素交换，得到新的无序区 (R1, R2 .... Rn-2) 和新的有序区 (Rn-1, Rn)。不断重复此过程，直到有序区的元素个数为 n - 1，则整个排序过程完成。
   ![image.png](/advanced/algorithm/871.webp)

### 8.7.2 实现

```js
// 堆排序
const heapSort = array => {
	console.time('堆排序耗时')
	// 初始化大顶堆，从第一个非叶子结点开始
	for (let i = Math.floor(array.length / 2 - 1); i >= 0; i--) {
		heapify(array, i, array.length)
	}
	// 排序，每一次 for 循环找出一个当前最大值，数组长度减一
	for (let i = Math.floor(array.length - 1); i > 0; i--) {
		// 根节点与最后一个节点交换
		swap(array, 0, i)
		// 从根节点开始调整，并且最后一个结点已经为当前最大值，不需要再参与比较，
		//所以第三个参数为 i，即比较到最后一个结点前一个即可
		heapify(array, 0, i)
	}
	console.timeEnd('堆排序耗时')
	return array
}

// 交换两个节点
const swap = (array, i, j) => {
	let temp = array[i]
	array[i] = array[j]
	array[j] = temp
}

// 将 i 结点以下的堆整理为大顶堆，注意这一步实现的基础实际上是：
// 假设结点 i 以下的子堆已经是一个大顶堆，heapify 函数实现的
// 功能是实际上是：找到 结点 i 在包括结点 i 的堆中的正确位置。
// 后面将写一个 for 循环，从第一个非叶子结点开始，对每一个非叶子结点
// 都执行 heapify 操作，所以就满足了结点 i 以下的子堆已经是一大顶堆
const heapify = (array, i, length) => {
	let temp = array[i] // 当前父节点
	// j < length 的目的是对结点 i 以下的结点全部做顺序调整
	for (let j = 2 * i + 1; j < length; j = 2 * j + 1) {
		temp = array[i] // 将 array[i] 取出，整个过程相当于找到 array[i] 应处于的位置
		if (j + 1 < length && array[j] < array[j + 1]) {
			j++ // 找到两个孩子中较大的一个，再与父节点比较
		}
		if (temp < array[j]) {
			swap(array, i, j) // 如果父节点小于子节点:交换；否则跳出
			i = j // 交换后，temp 的下标变为 j
		} else {
			break
		}
	}
}

//测试
const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
heapSort(arr) //堆排序耗时: 0.103ms
```

### 8.7.3 分析

-   第一，堆排序是原地排序算法吗 ？
    -   整个堆排序的过程，都只需要极个别临时存储空间，所以堆排序是原地排序算法。
-   第二，堆排序是稳定的排序算法吗 ？
    -   因为在排序的过程，存在将堆的最后一个节点跟堆顶节点互换的操作，所以就有可能改变值相同数据的原始相对顺序。所以，堆排序是不稳定的排序算法。
-   第三，堆排序的复杂度是多少 ？
    -   堆排序包括建堆和排序两个操作，建堆过程的时间复杂度是 O(n)，排序过程的时间复杂度是 O(nlogn)，所以，堆排序整体的时间复杂度是 O(nlogn)。空间复杂度 n+k 不稳定

## 8.8 计数排序（Counting Sort）

### 8.8.1 思路

-   找出待排序的数组中最大和最小的元素。
-   统计数组中每个值为 i 的元素出现的次数，存入新数组 countArr 的第 i 项。
-   对所有的计数累加（从 countArr 中的第一个元素开始，每一项和前一项相加）。
-   反向填充目标数组：将每个元素 i 放在新数组的第 countArr[i] 项，每放一个元素就将 countArr[i] 减去 1 。
    关键在于理解最后反向填充时的操作。

1. 使用条件
    - 只能用在数据范围不大的场景中，若数据范围 k 比要排序的数据 n 大很多，就不适合用计数排序。
    - 计数排序只能给非负整数排序，其他类型需要在不改变相对大小情况下，转换为非负整数。

-   比如如果考试成绩精确到小数后一位，就需要将所有分数乘以 10，转换为整数。

![image.png](/advanced/algorithm/88.gif)

### 8.8.2 实现

```js
const countingSort = array => {
	let len = array.length,
		result = [],
		countArr = [],
		min = (max = array[0])
	console.time('计数排序耗时')
	for (let i = 0; i < len; i++) {
		// 获取最小，最大 值
		min = min <= array[i] ? min : array[i]
		max = max >= array[i] ? max : array[i]
		countArr[array[i]] = countArr[array[i]] ? countArr[array[i]] + 1 : 1
	}
	console.log('countArr :', countArr)
	// 从最小值 -> 最大值,将计数逐项相加
	for (let j = min; j < max; j++) {
		countArr[j + 1] = (countArr[j + 1] || 0) + (countArr[j] || 0)
	}
	console.log('countArr 2:', countArr)
	// countArr 中,下标为 array 数值，数据为 array 数值出现次数；反向填充数据进入 result 数据
	for (let k = len - 1; k >= 0; k--) {
		// result[位置] = array 数据
		result[countArr[array[k]] - 1] = array[k]
		// 减少 countArr 数组中保存的计数
		countArr[array[k]]--
		// console.log("array[k]:", array[k], 'countArr[array[k]] :', countArr[array[k]],)
		console.log('result:', result)
	}
	console.timeEnd('计数排序耗时')
	return result
}
const array = [2, 2, 3, 8, 7, 1, 2, 2, 2, 7, 3, 9, 8, 2, 1, 4, 2, 4, 6, 9, 2]
console.log('原始 array: ', array)
const newArr = countingSort(array)
console.log('newArr: ', newArr)
// 原始 array:  [2, 2, 3, 8, 7, 1, 2, 2, 2, 7, 3, 9, 8, 2, 1, 4, 2, 4, 6, 9, 2]
// 计数排序耗时:   5.6708984375ms
// newArr:  	 [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 6, 7, 7, 8, 8, 9, 9]
```

```js
const countingSort2 = (arr, maxValue) => {
	console.time('计数排序耗时')
	maxValue = maxValue || arr.length
	let bucket = new Array(maxValue + 1),
		sortedIndex = 0
	;(arrLen = arr.length), (bucketLen = maxValue + 1)

	for (let i = 0; i < arrLen; i++) {
		if (!bucket[arr[i]]) {
			bucket[arr[i]] = 0
		}
		bucket[arr[i]]++
	}

	for (let j = 0; j < bucketLen; j++) {
		while (bucket[j] > 0) {
			arr[sortedIndex++] = j
			bucket[j]--
		}
	}
	console.timeEnd('计数排序耗时')
	return arr
}
const array2 = [2, 2, 3, 8, 7, 1, 2, 2, 2, 7, 3, 9, 8, 2, 1, 4, 2, 4, 6, 9, 2]
console.log('原始 array2: ', array2)
const newArr2 = countingSort2(array2, 21)
console.log('newArr2: ', newArr2)
// 原始 array:  [2, 2, 3, 8, 7, 1, 2, 2, 2, 7, 3, 9, 8, 2, 1, 4, 2, 4, 6, 9, 2]
// 计数排序耗时:   0.043212890625ms
// newArr:  	 [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 6, 7, 7, 8, 8, 9, 9]
```

### 8.8.3 分析

-   第一，计数排序是原地排序算法吗 ？
    -   因为计数排序的空间复杂度为 O(k)，k 桶的个数，所以不是原地排序算法。
-   第二，计数排序是稳定的排序算法吗 ？
    -   计数排序不改变相同元素之间原本相对的顺序，因此它是稳定的排序算法。
-   第三，计数排序的复杂度是多少 ？
    -   平均时间复杂度 O(n + k)，空间复杂度 O(k)，占用额外内存且是稳定的

## 8.9 基数排序（Radix Sort）

基数排序是一种非比较型整数排序算法，其原理是将整数按位数切割成不同的数字，然后按每个位数分别比较。

### 8.9.1 思路

按照优先从高位或低位来排序有两种实现方案:

-   MSD：由高位为基底，先按 k1 排序分组，同一组中记录, 关键码 k1 相等，再对各组按 k2 排序分成子组, 之后，对后面的关键码继续这样的排序分组，直到按最次位关键码 kd 对各子组排序后，再将各组连接起来，便得到一个有序序列。MSD 方式适用于位数多的序列。
-   LSD：由低位为基底，先从 kd 开始排序，再对 kd - 1 进行排序，依次重复，直到对 k1 排序后便得到一个有序序列。LSD 方式适用于位数少的序列。

![image.png](/advanced/algorithm/89.gif)

### 8.9.2 实现

```js
/**
 * name: 基数排序
 * @param  array 待排序数组
 * @param  max 最大位数
 */
const radixSort = (array, max) => {
	console.time('计数排序耗时')
	const buckets = []
	let unit = 10,
		base = 1
	for (let i = 0; i < max; i++, base *= 10, unit *= 10) {
		for (let j = 0; j < array.length; j++) {
			let index = ~~((array[j] % unit) / base) //依次过滤出个位，十位等等数字
			if (buckets[index] == null) {
				buckets[index] = [] //初始化桶
			}
			buckets[index].push(array[j]) //往不同桶里添加数据
		}
		let pos = 0,
			value
		for (let j = 0, length = buckets.length; j < length; j++) {
			if (buckets[j] != null) {
				while ((value = buckets[j].shift()) != null) {
					array[pos++] = value //将不同桶里数据挨个捞出来，为下一轮高位排序做准备，由于靠近桶底的元素排名靠前，因此从桶底先捞
				}
			}
		}
	}
	console.timeEnd('计数排序耗时')
	return array
}

const array = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
console.log('原始array:', array)
const newArr = radixSort(array, 2)
console.log('newArr:', newArr)
// 原始 array:  [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
// 堆排序耗时:   0.064208984375ms
// newArr:  	 [2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
```

### 8.9.3 分析

-   第一，基数排序是原地排序算法吗 ？
    -   因为计数排序的空间复杂度为 O(n + k)，所以不是原地排序算法。
-   第二，基数排序是稳定的排序算法吗 ？
    -   基数排序不改变相同元素之间的相对顺序，因此它是稳定的排序算法。
-   第三，基数排序的复杂度是多少 ？
    -   平均时间复杂度为 O(n \* k), 平均空间复杂度为 O(n + k)，占用额外内存且是稳定的

## 8.10 桶排序（Bucket Sort）

桶排序是计数排序的升级版，也采用了分治思想。

### 8.10.1 思路

-   将要排序的数据分到有限数量的几个有序的桶里。
-   每个桶里的数据再单独进行排序（一般用插入排序或者快速排序）。
-   桶内排完序之后，再把每个桶里的数据按照顺序依次取出，组成的序列就是有序的了。
    比如：
    ![image.png](/advanced/algorithm/8101.webp)

    桶排序利用了函数的映射关系，高效与否的关键就在于这个映射函数的确定。
    为了使桶排序更加高效，我们需要做到这两点：

-   在额外空间充足的情况下，尽量增大桶的数量。
-   使用的映射函数能够将输入的 N 个数据均匀的分配到 K 个桶中。

桶排序的核心：就在于怎么把元素平均分配到每个桶里，合理的分配将大大提高排序的效率。

![image.png](/advanced/algorithm/810.webp)

### 8.10.2 实现

```js
// 桶排序
const bucketSort = (array, bucketSize) => {
	if (array.length === 0) {
		return array
	}

	console.time('桶排序耗时')
	let i = 0
	let minValue = array[0]
	let maxValue = array[0]
	for (i = 1; i < array.length; i++) {
		if (array[i] < minValue) {
			minValue = array[i] //输入数据的最小值
		} else if (array[i] > maxValue) {
			maxValue = array[i] //输入数据的最大值
		}
	}

	//桶的初始化
	const DEFAULT_BUCKET_SIZE = 5 //设置桶的默认数量为 5
	bucketSize = bucketSize || DEFAULT_BUCKET_SIZE
	const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1
	const buckets = new Array(bucketCount)
	for (i = 0; i < buckets.length; i++) {
		buckets[i] = []
	}

	//利用映射函数将数据分配到各个桶中
	for (i = 0; i < array.length; i++) {
		buckets[Math.floor((array[i] - minValue) / bucketSize)].push(array[i])
	}

	array.length = 0
	for (i = 0; i < buckets.length; i++) {
		quickSort(buckets[i]) //对每个桶进行排序，这里使用了快速排序
		for (var j = 0; j < buckets[i].length; j++) {
			array.push(buckets[i][j])
		}
	}
	console.timeEnd('桶排序耗时')

	return array
}

// 快速排序
const quickSort = (arr, left, right) => {
	let len = arr.length,
		partitionIndex
	left = typeof left != 'number' ? 0 : left
	right = typeof right != 'number' ? len - 1 : right

	if (left < right) {
		partitionIndex = partition(arr, left, right)
		quickSort(arr, left, partitionIndex - 1)
		quickSort(arr, partitionIndex + 1, right)
	}
	return arr
}

const partition = (arr, left, right) => {
	//分区操作
	let pivot = left, //设定基准值（pivot）
		index = pivot + 1
	for (let i = index; i <= right; i++) {
		if (arr[i] < arr[pivot]) {
			swap(arr, i, index)
			index++
		}
	}
	swap(arr, pivot, index - 1)
	return index - 1
}

const swap = (arr, i, j) => {
	let temp = arr[i]
	arr[i] = arr[j]
	arr[j] = temp
}

const array = [4, 6, 8, 5, 9, 1, 2, 5, 3, 2]
console.log('原始array:', array)
const newArr = bucketSort(array)
console.log('newArr:', newArr)
// 原始 array:  [4, 6, 8, 5, 9, 1, 2, 5, 3, 2]
// 堆排序耗时:   0.133056640625ms
// newArr:  	 [1, 2, 2, 3, 4, 5, 5, 6, 8, 9]
```

### 8.10.3 分析

-   第一，桶排序是原地排序算法吗 ？
    -   因为桶排序的空间复杂度，也即内存消耗为 O(n)，所以不是原地排序算法。
-   第二，桶排序是稳定的排序算法吗 ？
    -   取决于每个桶的排序方式，比如：快排就不稳定，归并就稳定。
-   第三，桶排序的复杂度是多少 ？
    -   时间复杂度 n+k 空间复杂度 n+k 稳定
    -   因为桶内部的排序可以有多种方法，是会对桶排序的时间复杂度产生很重大的影响。所以，桶排序的时间复杂度可以是多种情况的。总的来说最佳情况：当输入的数据可以均匀的分配到每一个桶中。最差情况：当输入的数据被分配到了同一个桶中。
    -   以下是桶的内部排序为快速排序的情况：如果要排序的数据有 n 个，我们把它们均匀地划分到 m 个桶内，每个桶里就有 k =n / m 个元素。每个桶内部使用快速排序，时间复杂度为 O(k _ logk)。m 个桶排序的时间复杂度就是 O(m _ k * logk)，因为 k = n / m，所以整个桶排序的时间复杂度就是 O(n*log(n/m))。当桶的个数 m 接近数据个数 n 时，log(n/m) 就是一个非常小的常量，这个时候桶排序的时间复杂度接近 O(n)。

## 8.11 总结

![image.png](/advanced/algorithm/sortCompare.webp)

## 算法可视化工具

1. 算法可视化工具 algorithm-visualizer 算法可视化工具 algorithm-visualizer 是一个交互式的在线平台，可以从代码中可视化算法，还可以看到代码执行的过程。旨在通过交互式可视化的执行来揭示算法背后的机制。

![image.png](/advanced/algorithm/8121.webp)

2. 算法可视化动画网站 visualgo.net/en 效果如下图：

![image.png](/advanced/algorithm/8122.webp)

3. 算法可视化动画网站 www.ee.ryerson.ca 效果如下图：

![image.png](/advanced/algorithm/8123.webp)

4. illustrated-algorithms 变量和操作的可视化表示增强了控制流和实际源代码。您可以快速前进和后退执行，以密切观察算法的工作方式。 效果如下图：

![image.png](/advanced/algorithm/8124.webp)
