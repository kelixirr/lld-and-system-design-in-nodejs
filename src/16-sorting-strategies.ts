// Quick Sort is one of the most important algorithms to know. It works by choosing a pivot element, placing smaller elements on one side and larger ones on the other, and then recursively sorting the two sides. On average it runs in O(n log n) time and is very fast in practice. Interviewers like it because it tests partitioning logic and understanding of recursion and worst-case scenarios.

// Merge Sort is another highly important algorithm. It divides the array into halves, recursively sorts each half, and then merges them back together in sorted order. It always runs in O(n log n) time, which makes it predictable and reliable. It is also stable, meaning equal elements keep their original order. It tests divide-and-conquer thinking and recursion clearly.

// Heap Sort is important because it uses a heap (a special tree structure) to sort elements. It first builds a max heap, then repeatedly removes the largest element to place it at the end. It runs in O(n log n) time and does not require extra memory like merge sort. It shows understanding of heap data structures.

// Insertion Sort is simpler but still important. It builds the sorted array one element at a time by inserting each element into its correct position. It runs in O(n²) in the worst case but performs well for small or nearly sorted arrays. Interviewers may ask it to test basic algorithmic thinking.

// Bubble Sort is mainly educational. It repeatedly swaps adjacent elements if they are in the wrong order. It is easy to understand but inefficient with O(n²) time complexity. It is rarely used in real applications but may appear in beginner interviews.

// Selection Sort repeatedly selects the smallest element and places it at the correct position. Like bubble sort, it runs in O(n²) time and is mainly used to understand sorting basics rather than for performance.

// Every sorting algorithm must adhere to this strict contract.
interface ISortStrategy {
  sort(arr: number[]): number[];
}

class SelectionSort implements ISortStrategy {
  public sort(arr: number[]): number[] {
    const data = [...arr];

    for (let i = 0; i < data.length - 1; i++) {
      let minIndex = i;

      // Scan everything to the right of 'i'
      for (let j = i + 1; j < data.length; j++) {
        const currentMinVal = data[minIndex] as number;
        const scanVal = data[j] as number;

        if (scanVal < currentMinVal) {
          minIndex = j;
        }
      }

      // If the smallest item we found isn't the one we started with, swap them!
      if (minIndex !== i) {
        const temp = data[i] as number;
        data[i] = data[minIndex] as number;
        data[minIndex] = temp;
      }
    }

    return data;
  }
}

class InsertionSort implements ISortStrategy {
  public sort(arr: number[]): number[] {
    const data = [...arr];

    // At the beginning, the first element is considered sorted by itself.
    for (let i = 1; i < data.length; i++) {
      const current = data[i] as number;
      let j = i - 1; // 0 to i -1 already sorted

      while (j >= 0 && (data[j] as number) > current) {
        data[j + 1] = data[j] as number;
        j--;
      }
      data[j + 1] = current;
    }

    return data;
  }
}

class BubbleSort implements ISortStrategy {
  public sort(arr: number[]): number[] {
    const data = [...arr]; // prevents modifying the input directly
    let isSwapped = true;

    while (isSwapped) {
      isSwapped = false;

      for (let i = 0; i < data.length - 1; i++) {
        const current = data[i] as number;
        const next = data[i + 1] as number;

        if (current > next) {
          data[i] = next;
          data[i + 1] = current;
          isSwapped = true;
        }
      }
    }

    return data;
  }
}

class MergeSort implements ISortStrategy {
  public sort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const leftHalf = arr.slice(0, mid);
    const rightHalf = arr.slice(mid);

    // here we are jut chopping array in single elemet array then merging

    // Split Phase:
    //                    [8, 3, 5, 4]
    //                    /            \
    //              [8, 3]            [5, 4]
    //             /      \          /      \
    //           [8]      [3]      [5]      [4]

    // Merge Phase:
    // [8] + [3] → [3, 8]
    // [5] + [4] → [4, 5]
    // [3, 8] + [4, 5] → [3, 4, 5, 8]

    // sort([8,3,5,4])
    //  → sort([8,3])
    //     → sort([8])
    //     → sort([3])
    //     → merge([8], [3]) → [3,8]
    //  → sort([5,4])
    //     → sort([5])
    //     → sort([4])
    //     → merge([5], [4]) → [4,5]
    //  → merge([3,8], [4,5]) → [3,4,5,8]

    return this.merge(this.sort(leftHalf), this.sort(rightHalf));
  }

  // This method assumes it is receiving two arrays that are already sorted, and its job is to zip them together.
  private merge(left: number[], right: number[]): number[] {
    const result: number[] = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      const leftVal = left[i] as number;
      const rightVal = right[j] as number;

      if (leftVal < rightVal) {
        result.push(leftVal);
        i++;
      } else {
        result.push(rightVal);
        j++;
      }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
  }
}

// QuickSort works like this:

// [8, 3, 5, 4]
// First, QuickSort picks one number as the pivot.
// Let’s say we choose the last number, 4.
// Now we rearrange the array so that: All numbers smaller than 4 go to the left. All numbers bigger than 4 go to the right

// So we compare each number with 4:

// 8 → bigger → stays on the right side
// 3 → smaller → move to the left side
// 5 → bigger → right side

// After rearranging around 4, the array becomes:
// [3, 4, 5, 8]
// Now 4 is in its final correct position. We never touch it again.
// Next, QuickSort repeats the same process on the left part and right part separately:
// Left side: [3] → already sorted
// Right side: [5, 8]
// Now for [5, 8], pick pivot 8:
// 5 → smaller → stays left
// Result stays [5, 8]
// Now 8 is also fixed in place.
// At this point, everything is sorted.

class QuickSort implements ISortStrategy {
  public sort(arr: number[]): number[] {
    const data = [...arr];
    this.quickSortHelper(data, 0, data.length - 1);
    return data;
  }

  // This function sorts only the portion of the array between left and right
  private quickSortHelper(arr: number[], left: number, right: number) {
    if (left < right) {
      const pivotIndex = this.partition(arr, left, right);
      this.quickSortHelper(arr, left, pivotIndex - 1);
      this.quickSortHelper(arr, pivotIndex + 1, right);
    }
  }

  // It rearranges the elements
  // first call quickSortHelper(arr, 0, 3) for [8, 3, 5, 4]
  // [8, 3, 5, 4]
  //           ↑
  //           pivot (4)
  //   [8, 3, 5, 4]
  //    ↑
  //    partitionIndex = 0 (8 < 4) -> No. 3 < 4 ->  Yes then we swap arr[1] with
  // arr [0] and move the partiion to plus 1. 5 < 4 -> do nothing. loop ends.

  //   Before: [3, 8, 5, 4]
  //   After : [3, 4, 5, 8]
  //               ↑
  //              pivot fixed

  // quickSortHelper(arr, 0, 0) -> [3]
  // quickSortHelper(arr, 2, 3) -> [5, 8]
  // This goes on - it works by shrinking unsorted regions

  private partition(arr: number[], left: number, right: number): number {
    const pivotValue = arr[right] as number; // last element as the pivot
    let partitionIndex = left; // This pointer tracks where the next smaller element should go.

    for (let i = left; i < right; i++) {
      const currentVal = arr[i] as number;

      // If the current value is smaller than the pivot. We swap
      if (currentVal < pivotValue) {
        this.swap(arr, i, partitionIndex);
        partitionIndex++;
      }
    }

    this.swap(arr, partitionIndex, right);
    return partitionIndex;
  }

  private swap(arr: number[], i: number, j: number): void {
    const temp = arr[i] as number;
    arr[i] = arr[j] as number;
    arr[j] = temp;
  }
}

class HeapSort implements ISortStrategy {
  public sort(arr: number[]): number[] {
    const data = [...arr];
    const n = data.length;

    // Build Max Heap
    // data = [4, 10, 3, 5, 1];
    // n = 5;
    // Math.floor(5/2) - 1 = 1. i starts at 1, then 0.

    // at i = 1 heapify(data, 5, 1)  then
    // largest = 1 -> value = 10
    // leftChild = 2*1+1 = 3 -> value = 5
    // rightChild = 2*1+2 = 4 -> value = 1
    // Compare:
    // 5 < 10  ->  No change.
    // 1 < 10  ->  No change.
    // array -> [4, 10, 3, 5, 1]

    // at i = 0 heapify(data, 5, 0)
    //  largest = 0 -> 4
    //  leftChild = 1 -> 10
    //  rightChild = 2 -> 3
    //  10 > 4 → largest = 1
    //  3 < 10 → ignore

    //  swap index 0 and 1 [10, 4, 3, 5, 1]  and recursisive heapify(data, 5, 1)

    //  largest = 1;
    //  leftChild = 3;
    //  rightChild = 4;
    // values (4, 5, 1);

    //  5 > 4 → swap -> [10, 5, 3, 4, 1] we then use second loop and do the same

    // for building the heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      this.heapify(data, n, i);
    }

    // for sorting - This loop turns the entire array into a max heap. A max heap means the biggest number is at the top (index 0). We start from the last non-leaf node and move upward, fixing each subtree using heapify. After this loop finishes, the array is not sorted yet  but it satisfies the heap rule. The largest value is now at index 0.
    for (let i = n - 1; i > 0; i--) {
      this.swap(data, 0, i);
      this.heapify(data, i, 0);
    }

    return data;
  }

  private heapify(arr: number[], n: number, i: number): void {
    let largest = i;
    const leftChild = 2 * i + 1;
    const rightChild = 2 * i + 2;

    // largest holds the index of the biggest value
    if (
      leftChild < n &&
      (arr[leftChild] as number) > (arr[largest] as number)
    ) {
      largest = leftChild;
    }

    if (
      rightChild < n &&
      (arr[rightChild] as number) > (arr[largest] as number)
    ) {
      largest = rightChild;
    }

    // One of the children is bigger than the parent → the heap rule is broken.
    if (largest !== i) {
      // This moves the bigger child up and pushes the smaller parent down.
      this.swap(arr, i, largest);
      // we recursively fix the subtree below.
      this.heapify(arr, n, largest);
    }
  }

  private swap(arr: number[], i: number, j: number): void {
    const temp = arr[i] as number;
    arr[i] = arr[j] as number;
    arr[j] = temp;
  }
}

class SortController {
  private strategy: ISortStrategy;

  constructor(strategy: ISortStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: ISortStrategy): void {
    this.strategy = strategy;
  }

  public executeSort(arr: number[]): number[] {
    return this.strategy.sort(arr);
  }
}

const rawData = [15, 3, 9, 8, 5, 2, 7, 1, 6];
console.log(`Unsorted Data: [${rawData.join(", ")}]\n`);

const sorter = new SortController(new BubbleSort());
console.log(`Bubble Sort: [${sorter.executeSort(rawData).join(", ")}]`);

sorter.setStrategy(new MergeSort());
console.log(`Merge Sort:  [${sorter.executeSort(rawData).join(", ")}]`);

sorter.setStrategy(new QuickSort());
console.log(` Quick Sort:  [${sorter.executeSort(rawData).join(", ")}]`);
