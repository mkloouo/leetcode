/*
link: https://leetcode.com/problems/non-overlapping-intervals/description/?envType=study-plan-v2&envId=leetcode-75
description: Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

Note that intervals which only touch at a point are non-overlapping. For example, [1, 2] and [2, 3] are non-overlapping.

Example 1:

Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1
Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.
Example 2:

Input: intervals = [[1,2],[1,2],[1,2]]
Output: 2
Explanation: You need to remove two [1,2] to make the rest of the intervals non-overlapping.
Example 3:

Input: intervals = [[1,2],[2,3]]
Output: 0
Explanation: You don't need to remove any of the intervals since they're already non-overlapping.


Constraints:

1 <= intervals.length <= 105
intervals[i].length == 2
-5 * 104 <= starti < endi <= 5 * 104
*/

import process from "process";
import fs from "fs";

type ProcessedInterval = {
  values: Set<number>;
  maxDistance?: number;
};

type IntervalsMap = Map<number, ProcessedInterval>;

function getIntervalsMap(intervals: number[][]): IntervalsMap {
  const intervalsMap = new Map<number, ProcessedInterval>();

  for (const interval of intervals) {
    const [from, to] = interval;
    if (from === undefined || to === undefined) {
      continue;
    }

    let connection = intervalsMap.get(from);
    if (!connection) {
      connection = {
        values: new Set(),
      };
    }

    connection.values.add(to);

    intervalsMap.set(from, connection);
  }

  return new Map([...intervalsMap.entries()].sort((a, b) => a[0] - b[0]));
}

function findPathFrom(
  intervalsMap: IntervalsMap,
  from: number,
  tabs = 0
): number {
  function log(...args: any[]) {
    // console.log("\t".repeat(tabs), ...args);
  }

  const intervalMapItem = intervalsMap.get(from);
  if (!intervalMapItem) {
    log("x->", from, "=", 1);
    return 1;
  }

  let maxDistance = 0;

  function findPathAndMaxDistance(direction: number) {
    const directionMapItem = intervalsMap.get(direction);
    if (!directionMapItem) {
      maxDistance = Math.max(1, maxDistance);
      return;
    }

    if (directionMapItem.maxDistance === undefined) {
      const maxDistanceForGivenDirection = findPathFrom(
        intervalsMap,
        direction,
        tabs + 1
      );
      directionMapItem.maxDistance = maxDistanceForGivenDirection;
    }

    maxDistance = Math.max(directionMapItem.maxDistance! + 1, maxDistance);
  }

  for (const direction of intervalMapItem.values) {
    log(from, "->", direction, "=");

    const keys = [...intervalsMap.keys()];
    const indexOfPathFrom = keys.findIndex((v) => v === from);

    for (let i = indexOfPathFrom + 1; i < keys.length; ++i) {
      const nextKey = keys[i];
      if (nextKey && nextKey >= direction) {
        const nextKey = Number(keys[i]);
        findPathAndMaxDistance(nextKey);
      }
    }

    findPathAndMaxDistance(direction);
  }

  log("\t", maxDistance);

  return maxDistance;
}

function eraseOverlapIntervals(intervals: number[][]): number {
  const intervalMap = getIntervalsMap(intervals);
  // console.log(intervalMap);
  const maxDistance = intervalMap.size;
  let maxTravelledDistance = 0;

  for (const [key, value] of intervalMap) {
    const travelDistance = findPathFrom(intervalMap, key);
    maxTravelledDistance = Math.max(maxTravelledDistance, travelDistance);
    value.maxDistance = travelDistance;

    if (maxTravelledDistance === maxDistance) {
      break;
    }
  }

  console.log(intervals.length, maxTravelledDistance, maxDistance);

  return intervals.length - maxTravelledDistance;
}

let fileOrInput = process.argv[2]!;

if (fs.existsSync(fileOrInput)) {
  fileOrInput = fs.readFileSync(fileOrInput, "utf-8");
}

console.log(eraseOverlapIntervals(JSON.parse(fileOrInput)));
