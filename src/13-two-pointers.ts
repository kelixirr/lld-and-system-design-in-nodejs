// The two pointers pattern is a simple and efficient way to solve problems involving arrays or strings, especially when the data is sorted. Instead of using two nested loops to compare every pair of elements, we place one pointer at the start and another at the end. Based on the condition (like checking if their sum equals a target), we move one of the pointers inward. This allows us to scan the collection in just one pass, making it fast with linear time and no extra memory. It is commonly used to find pairs that add up to a target number in a sorted array, remove duplicates, or check if a string is a palindrome.

class TwoPointerAlgorithms {
  // receive sorted array
  public static findPairWithTargetSum(arr: number[], target: number): number[] {
    const length = arr.length;

    let left = 0; // start postion for the pointer
    let right = length - 1; // end position for the pointer

    while (left < right) {
      const leftVal = arr[left];
      const rightVal = arr[right];

      if (leftVal === undefined || rightVal === undefined) {
        break;
      }
      const currentSum = leftVal + rightVal;

      if (currentSum === target) {
        return [left, right];
      }

      if (currentSum > target) {
        right--;
      } else {
        left++;
      }
    }

    return [];
  }

  public static isPalindrome(s: string): boolean {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
      if (s.charAt(left) !== s.charAt(right)) {
        return false;
      }
      left++;
      right--;
    }

    return true;
  }
}

const numbers = [1, 2, 3, 4, 6];
const resultIndices = TwoPointerAlgorithms.findPairWithTargetSum(numbers, 6);

console.log(
  `Indices found: [${resultIndices}] (Values: ${numbers[resultIndices[0]!]} and ${numbers[resultIndices[1]!]})\n`,
);

console.log(
  `Is 'racecar' a palindrome? ${TwoPointerAlgorithms.isPalindrome("racecar")}`, // true
);
console.log(
  `Is 'hello' a palindrome? ${TwoPointerAlgorithms.isPalindrome("hello")}`, // false
);
