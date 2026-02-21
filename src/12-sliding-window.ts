// The sliding window approach is a way to look at part of something step by step without starting over each time. We use two pointers to create a small “window” that moves through the data. One pointer moves forward to include new items, and if something becomes invalid (like a duplicate), the other pointer moves forward to remove items until everything is valid again. This way, we adjust the window as we go, making the solution simple and efficient.

// The sliding window approach is used when you are working with a sequence like an array or string and need to find something within a continuous portion of it. It is especially helpful when the problem involves subarrays or substrings, such as finding the longest substring without repeating characters, the maximum sum of a fixed-size subarray, or the smallest window that satisfies a condition.

class SlidingWindowAlgorithms {
  public static lengthOfLongestSubstring(s: string): number {
    const windowMemory = new Set<string>();
    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
      const currentChar = s.charAt(right);

      if (windowMemory.has(currentChar)) {
        windowMemory.delete(s.charAt(left));
        left++;
      }

      windowMemory.add(currentChar);
      const currentWindowSize = right - left + 1;
      maxLength = Math.max(maxLength, currentWindowSize);
    }

    return maxLength;
  }
}

// We scan the string exactly once, dropping our time complexity down to a lightning-fast O(N)

const result1 = SlidingWindowAlgorithms.lengthOfLongestSubstring("abcabcbb");
console.log(`\n Final Result 1: ${result1}\n`);

const result2 = SlidingWindowAlgorithms.lengthOfLongestSubstring("pwwkew");
console.log(`\nFinal Result 2: ${result2}\n`);
