import * as fs from "node:fs";

const DATA_FILE = "day1/realInput.txt";
const LINE_DELIMITER = "\n";
const ARRAY_DELIMITER = "   ";

const calculateDistances = () => {
  const arrayLeft: number[] = [];
  const arrayRight: number[] = [];

  const arrayLines = fs
    .readFileSync(DATA_FILE)
    .toString()
    .split(LINE_DELIMITER);

  arrayLines.map((element) => {
    if (element.length > 0) {
      const [left, right] = element.split(ARRAY_DELIMITER);
      arrayLeft.push(Number(left));
      arrayRight.push(Number(right));
    }
  });

  const sortedLeft = arrayLeft.sort((n1, n2) => n1 - n2);
  const sortedRight = arrayRight.sort((n1, n2) => n1 - n2);

  const sumOfDifferences = sortedLeft.reduce(
    (accumulator, currentValue, currentIndex) =>
      accumulator + Math.abs(currentValue - (sortedRight[currentIndex] ?? 0)),
    0,
  );

  console.log(sumOfDifferences);
};

calculateDistances();
