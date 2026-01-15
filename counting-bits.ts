function countOnes(a: number) {
    // 4 = 100

    let count = 0;
    while (a !== 0) {
        count += a % 2 === 1 ? 1 : 0;
        a >>>= 1;
    }

    return count;
}

function countBits(n: number): number[] {
    const ans = [];

    for (let i = 0; i <= n; ++i) {
        ans.push(countOnes(i));
    }

    return ans;
};

module.exports = countBits;
