const ENGLISH_VOWELS = Object.freeze(["a", "e", "i", "o", "u"]);

function isVowel(char: string) {
  return ENGLISH_VOWELS.includes(char);
}

function calculateVowels(sChars: string[]) {
  let vowels = 0;
  for (const char of sChars) {
    if (isVowel(char)) {
      vowels++;
    }
  }

  return vowels;
}

function maxVowels(s: string, k: number): number {
  let sChars = s.split("");

  let vowels = calculateVowels(sChars.slice(0, k));
  let maxVowels = vowels;

  for (let i = 1; i + k <= s.length; ++i) {
    if (i === i + k - 1) {
      vowels = isVowel(sChars[i]!) ? 1 : 0;
    } else {
      if (isVowel(sChars[i - 1]!)) {
        vowels--;
      }

      if (isVowel(sChars[i + k - 1]!)) {
        vowels++;
      }
    }

    maxVowels = Math.max(maxVowels, vowels);
  }

  return maxVowels;
}

console.log(maxVowels(process.argv[2]!, Number(process.argv[3])));
