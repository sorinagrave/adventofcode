import * as fs from "node:fs";

const DATA_FILE = "day2/realInput.txt";
const LINE_DELIMITER = "\n";
const ARRAY_DELIMITER = " ";

let arrayLines: string[] = [];

const loadArrayFromFile = () => {
  arrayLines = fs
    .readFileSync(DATA_FILE)
    .toString()
    .split(LINE_DELIMITER)
    .filter((line) => line.length > 0);
};
const isAscending = (left: number | undefined, right: number) =>
  left !== undefined && left < right;

const isDescending = (left: number | undefined, right: number) =>
  left !== undefined && left > right;

const isInRange = (left: number | undefined, right: number) =>
  left !== undefined &&
  Math.abs(left - right) > 0 &&
  Math.abs(left - right) <= 3;

const isSequenceSafe = (
  left: number | undefined,
  right: number,
  compareFunction: (leftSide: number | undefined, rightSide: number) => boolean,
) => {
  return compareFunction(left, right) && isInRange(left, right);
};

const isArraySafe = (
  numbers: number[],
  compareFunction: (left: number | undefined, right: number) => boolean,
): boolean => {
  return numbers.reduce(
    (accumulator, currentValue, currentIndex) =>
      accumulator &&
      (currentIndex < 1 ||
        isSequenceSafe(
          numbers[currentIndex - 1],
          currentValue,
          compareFunction,
        )),
    true,
  );
};

const processArrayByExcluding = (numbers: number[]) => {
  for (let i = 0; i < numbers.length; i++) {
    const numbersWithExclusion = [...numbers];
    numbersWithExclusion.splice(i, 1);
    if (isArraySafe(numbersWithExclusion, isAscending)) return true;
    if (isArraySafe(numbersWithExclusion, isDescending)) return true;
  }
  return false;
};

const processArrays = () => {
  const totalSafeArrays = arrayLines
    .map((arrayString) => {
      const arrayOfNumbers = arrayString
        .split(ARRAY_DELIMITER)
        .map((item: string) => Number(item));
      return (
        isArraySafe(arrayOfNumbers, isAscending) ||
        isArraySafe(arrayOfNumbers, isDescending)
      );
    })
    .filter(Boolean).length;
  console.log(`totalSafeArrays is ${totalSafeArrays}`);
};

const processArraysWithDampener = () => {
  const totalSafeArrays = arrayLines
    .map((arrayString) => {
      const arrayOfNumbers = arrayString
        .split(ARRAY_DELIMITER)
        .map((item: string) => Number(item));
      return processArrayByExcluding(arrayOfNumbers);
    })
    .filter(Boolean).length;
  console.log(`totalSafeArrays is ${totalSafeArrays}`);
};

loadArrayFromFile();
processArrays();
processArraysWithDampener();
