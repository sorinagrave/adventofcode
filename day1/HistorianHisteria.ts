import * as fs from "node:fs";

const DATA_FILE = "day1/realInput.txt";
const LINE_DELIMITER = "\n";
const ARRAY_DELIMITER = "   ";

const arrayLeft: number[] = [];
const arrayRight: number[] = [];

const loadArrays = () => {
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
};

const calculateDistances = () => {
  const sortedLeft = arrayLeft.sort((n1, n2) => n1 - n2);
  const sortedRight = arrayRight.sort((n1, n2) => n1 - n2);

  const sumOfDifferences = sortedLeft.reduce(
    (accumulator, currentValue, currentIndex) =>
      accumulator + Math.abs(currentValue - (sortedRight[currentIndex] ?? 0)),
    0,
  );

  console.log("DISTANCES:");
  console.log(sumOfDifferences);
};

const calculateSimilarities = () => {
  const sims = arrayLeft.reduce(
    (accumulator, currentValue) =>
      accumulator +
      currentValue *
        arrayRight.filter((currentRight) => currentRight === currentValue)
          .length,
    0,
  );

  console.log("SIMILARITIES:");
  console.log(sims);
};

loadArrays();
calculateDistances();
calculateSimilarities();
