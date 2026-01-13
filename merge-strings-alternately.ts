import process from "process";

function mergeAlternatelyA(word1: string, word2: string): string {
  const totalLength = Math.max(word1.length, word2.length);
  const alternatingArray = [];
  for (let i = 0; i < totalLength; ++i) {
    if (word1[i]) {
      alternatingArray.push(word1[i]);
    }
    if (word2[i]) {
      alternatingArray.push(word2[i]);
    }
  }

  return alternatingArray.join("");
}

function mergeAlternatelyB(word1: string, word2: string): string {
  const totalLength = Math.max(word1.length, word2.length);
  const baseLength = Math.min(word1.length, word2.length);
  const alternatingArray = Array(baseLength * 2 + (totalLength - baseLength));

  for (let i = 0, j = i * 2; i < baseLength; ++i, j = i * 2) {
    if (word1[i]) {
      alternatingArray[j] = word1[i];
    }
    if (word2[i]) {
      alternatingArray[j + 1] = word2[i];
    }
  }

  for (let i = baseLength, j = i * 2; i < totalLength; ++i, j = i * 2) {
    alternatingArray[j] = word1[i] ? word1[i] : word2[i];
  }

  return alternatingArray.join("");
}

console.log(mergeAlternatelyB(process.argv[2]!, process.argv[3]!));
