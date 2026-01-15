/**
 * @link https://leetcode.com/problems/min-cost-climbing-stairs/?envType=study-plan-v2&envId=leetcode-75
 * @description You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.

  You can either start from the step with index 0, or the step with index 1.

  Return the minimum cost to reach the top of the floor.



  Example 1:

  Input: cost = [10,15,20]
  Output: 15
  Explanation: You will start at index 1.
  - Pay 15 and climb two steps to reach the top.
  The total cost is 15.
  Example 2:

  Input: cost = [1,100,1,1,1,100,1,1,100,1]
  Output: 6
  Explanation: You will start at index 0.
  - Pay 1 and climb two steps to reach index 2.
  - Pay 1 and climb two steps to reach index 4.
  - Pay 1 and climb two steps to reach index 6.
  - Pay 1 and climb one step to reach index 7.
  - Pay 1 and climb two steps to reach index 9.
  - Pay 1 and climb one step to reach the top.
  The total cost is 6.

 */

function minCostClimbingStairs(cost: number[]): number {
  let totalCost = 0;
  let position = 0;

  const winPositions = [cost.length - 1, cost.length - 2];

  while (!winPositions.includes(position)) {
    console.log("pos::", position, "cost:", totalCost);

    const first = cost[position];
    const second = cost[position + 1];

    if (first === undefined || second === undefined) {
      return 0;
    }

    if (first < second) {
      totalCost += first;
      position++;
    } else {
      totalCost += second;
      position += 2;
    }
  }

  return totalCost;
}

module.exports = minCostClimbingStairs;
