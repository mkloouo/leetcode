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

function calculateNextSteps(cost: number[]) {
  let [first, second, third, fourth] = cost;

  first = first ?? 0;
  second = second ?? 0;
  third = third ?? 0;
  fourth = fourth ?? 0;

  const options = [
    {
      indexes: [0, 2],
      sum: first + third,
    },
    {
      indexes: [0, 1, 3],
      sum: first + second + fourth,
    },
    {
      indexes: [1, 2],
      sum: second + third,
    },
    {
      indexes: [1, 3],
      sum: second + fourth,
    },
  ];

  options.sort((a, b) => a.sum - b.sum);

  const minCostOption = options[0]!;

  return minCostOption.indexes;
}

function minCostClimbingStairs(cost: number[]): number {
  let totalCost = 0;

  while (cost.length !== 0) {
    const nextSteps = calculateNextSteps(cost);

    for (const step of nextSteps) {
      if (step >= cost.length) {
        break;
      }

      totalCost += Number(cost[step]);
    }

    cost = cost.slice(Number(nextSteps[nextSteps.length - 1]) + 1);
  }

  return totalCost;
}

module.exports = minCostClimbingStairs;
