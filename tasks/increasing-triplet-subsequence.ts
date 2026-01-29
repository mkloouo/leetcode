function increasingTriplet(nums: number[]) {
  if (nums.length < 3) {
    return false;
  }

  for (let i = 1, a = null, b = null; i < nums.length; ++i) {
    const prev = nums[i - 1];
    const curr = nums[i];

    if (prev === curr || prev === undefined || curr === undefined) {
      continue;
    }

    if (prev < curr) {
      if (!a || !b) {
        a = prev;
        b = curr;
        continue;
      }

      if (b < curr) {
        return true;
      }

      if (prev < a && curr < b) {
        a = prev;
        b = curr;
      } else if (a > prev && a > curr && b > prev && b > curr) {
        a = prev;
        b = curr;
      }
    } else {
      if (!a || !b) {
        continue;
      }

      if (curr < b && a < curr) {
        b = curr;
      }
    }
  }

  return false;
}

module.exports = increasingTriplet;
