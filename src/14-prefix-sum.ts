// The prefix sum pattern is used when you need to calculate the sum of elements within different ranges of an array many times. Instead of calculating the sum again and again using a loop for each query, we first preprocess the array to create a new array where each position stores the total sum from the beginning up to that index. This is called a running total or prefix sum array. After this preprocessing step, we can find the sum of any range in constant time by subtracting two prefix values. It is very useful in problems involving multiple range sum queries, performance optimization, and competitive programming.

class NumArray {
  private prefixSums: number[];

  constructor(nums: number[]) {
    this.prefixSums = new Array(nums.length);

    if (nums.length > 0) {
      this.prefixSums[0] = nums[0] as number;

      for (let i = 1; i < nums.length; i++) {
        const prevTotal = this.prefixSums[i - 1] as number;
        this.prefixSums[i] = prevTotal + (nums[i] as number);
      }
    }
  }

  // for calculating sum
  public sumRange(leftIndex: number, rightIndex: number) {
    if (leftIndex === 0) {
      return this.prefixSums[rightIndex] as number;
    }

    const rightTotal = this.prefixSums[rightIndex] as number;
    const leftCutOff = this.prefixSums[leftIndex - 1] as number;

    return rightTotal - leftCutOff;
  }
}

const dailyTraffic = [10, 20, 15, 30, 25, 10];
const analyticsEngine = new NumArray(dailyTraffic);

//  Days 0 to 2 (10 + 20 + 15 = 45)
const q1 = analyticsEngine.sumRange(0, 2);
console.log(`Traffic from Day 0 to 2: ${q1}`);

const q2 = analyticsEngine.sumRange(2, 5);
console.log(`Traffic from Day 2 to 5: ${q2}`);

const q3 = analyticsEngine.sumRange(1, 3);
console.log(`Traffic from Day 1 to 3: ${q3}`);
