import * as fs from "node:fs";
const DATA_FILE = "day3/realInput.txt";
const REGEX_PATTERN = /mul\((\d{1,3}),(\d{1,3})\)/gm;
const REGEX_PATTERN_WITH_DO = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/gm;

const loadTextFromFile = (): string => {
  return fs.readFileSync(DATA_FILE).toString();
};

const calculateTotal = (text: string) => {
  const matches = text.matchAll(REGEX_PATTERN);
  let current = matches.next();
  let total = 0;
  while (current?.value !== undefined) {
    if (current.value[1] !== undefined && current.value[2] !== undefined) {
      total = total + Number(current?.value[1]) * Number(current?.value[2]);
    }
    current = matches.next();
  }
  console.log(`calculateTotal is ${total}`);
};

const calculateTotalWithDosAndDonts = (text: string) => {
  const matches = text.matchAll(REGEX_PATTERN_WITH_DO);
  let current = matches.next();
  let allowed = true;
  let total = 0;
  while (current?.value !== undefined) {
    // flip the allowed?
    if (current?.value[0] === "don't()" || current.value[0] === "do()") {
      allowed = current.value[0] === "do()";
    }
    if (
      allowed &&
      current.value[1] !== undefined &&
      current.value[2] !== undefined
    ) {
      total = total + Number(current?.value[1]) * Number(current?.value[2]);
    }
    current = matches.next();
  }
  console.log(`calculateTotalWithDosAndDonts is ${total}`);
};

const text = loadTextFromFile();
calculateTotal(text);
calculateTotalWithDosAndDonts(text);
