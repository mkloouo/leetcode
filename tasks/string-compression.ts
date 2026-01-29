function compress(chars: string[]): number {
  let newLength = 0;

  for (let i = 0, char, charCount; i <= chars.length; ++i) {
    const currentChar = chars[i];
    if (currentChar === char) {
      charCount++;
      continue;
    }

    if (char) {
      chars[newLength++] = char;

      if (charCount > 1) {
        const charCountString = String(charCount).split("");
        for (const digit of charCountString) {
          chars[newLength++] = digit;
        }
      }
    }

    char = currentChar;
    charCount = 1;
  }

  return newLength;
}

module.exports = compress;
