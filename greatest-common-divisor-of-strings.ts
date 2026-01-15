/**
 * @link https://leetcode.com/problems/greatest-common-divisor-of-strings/description/?envType=study-plan-v2&envId=leetcode-75
 *
 * @description For two strings s and t, we say "t divides s" if and only if s = t + t + t + ... + t + t (i.e., t is concatenated with itself one or more times).
 * Given two strings str1 and str2, return the largest string x such that x divides both str1 and str2.
 *
 * @example Example 1: Input: str1 = "ABCABC", str2 = "ABC" Output: "ABC"
 * @example Example 2: Input: str1 = "ABABAB", str2 = "ABAB" Output: "AB"
 * @example Example 3: Input: str1 = "LEET", str2 = "CODE" Output: ""
 * @example Example 4: Input: str1 = "AAAAAB", str2 = "AAA" Output: ""
 *
 * @constraints 1 <= str1.length, str2.length <= 1000, str1 and str2 consist of English uppercase letters.
 */

function divides(s: string, t: string) {
  return s.split(t).every((r) => r === "");
}

function gcdOfStrings(str1: string, str2: string): string {
  const biggerStr = str1.length >= str2.length ? str1 : str2;
  const smallerStr = str1.length < str2.length ? str1 : str2;
  let gcd = smallerStr.valueOf();

  while (gcd.length) {
    if (divides(biggerStr, gcd) && divides(smallerStr, gcd)) {
      return gcd;
    }

    gcd = gcd.slice(1);
  }

  return gcd;
}

module.exports = gcdOfStrings;
