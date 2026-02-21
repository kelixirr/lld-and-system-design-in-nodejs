// Modified binary search is an improved version of regular binary search that works on sorted arrays, especially when duplicates are present. Instead of stopping as soon as the target is found, the algorithm keeps searching to locate the exact boundary either the first occurrence or the last occurrence of that target. It does this by adjusting the search range even after finding a match, moving left to find the first position or right to find the last. Because it keeps dividing the search space in half each time, it runs in logarithmic time, making it much faster than scanning the entire array one element at a time.

// Normal binary search stops as soon as it finds the target value in a sorted array. Its goal is simply to confirm whether the value exists and return its index. Once it finds a match, the search ends.

class BinarySearchAlgorithms {
  public static searchRange(nums: number[], target: number): [number, number] {
    const firstIndex = this.findBound(nums, target, true);

    // in case target is not in the array
    if (firstIndex === -1) {
      return [-1, -1];
    }

    const lastIndex = this.findBound(nums, target, false);

    return [firstIndex, lastIndex];
  }

  private static findBound(
    nums: number[],
    target: number,
    isSearchingLeft: boolean,
  ) {
    let left = 0;
    let right = nums.length - 1;
    let boundIndex = -1; // for not - found case

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midValue = nums[mid]!;

      if (midValue === target) {
        boundIndex = mid;

        if (isSearchingLeft) {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      } else if (midValue > target) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return boundIndex;
  }
}

const sortedData = [5, 7, 7, 8, 8, 8, 10];
const targetNumber = 8;

console.log(
  `Searching for boundaries of '${targetNumber}' in [${sortedData.join(", ")}]...`,
);

const result = BinarySearchAlgorithms.searchRange(sortedData, targetNumber);

console.log(
  `\n Result: First occurrence at index ${result[0]}, Last occurrence at index ${result[1]}\n`,
);

const missingTarget = 6;
const missingResult = BinarySearchAlgorithms.searchRange(
  sortedData,
  missingTarget,
);
console.log(
  `Searching for missing number '${missingTarget}': [${missingResult}]`,
);
