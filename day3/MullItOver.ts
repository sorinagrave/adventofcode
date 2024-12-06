import * as fs from "node:fs";
const DATA_FILE = "day3/realInput.txt";
const REGEX_PATTERN = /mul\((\d{1,3}),(\d{1,3})\)/gm;

const loadTextFromFile = (): string => {
  return fs.readFileSync(DATA_FILE).toString();
};

const findPatterns = (text: string):number => {
  const matches = text.match(REGEX_PATTERN);
  return matches?.reduce((accumulator, current) => accumulator + convertMulToResult(current),0)??0;

};

const convertMulToResult = (mulExpression:string):number =>{
  const number1 = mulExpression.substring(mulExpression.indexOf('(') + 1, mulExpression.indexOf(','));
  const number2 = mulExpression.substring(mulExpression.indexOf(',') + 1, mulExpression.indexOf(')'));
  return Number(number1)*Number(number2);
}
const text = loadTextFromFile();
console.log(findPatterns(text));
