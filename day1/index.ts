import fs from "fs";

const file = fs.readFileSync("day1/input.txt", "utf-8");

const inputs = file
    .split("\r\n\r\n")
    .map((input) => input.split("\r\n").map((line) => parseInt(line)));

const getCaloriesPerElf = () => {
    const caloriesPerElf = inputs.map((elf) => elf.reduce((a, b) => a + b, 0));
    return caloriesPerElf;
};
const calories = getCaloriesPerElf();

const partOne = () => {
    const highestCalorie = Math.max(...calories);
    return highestCalorie;
};

const partTwo = () => {
    const sortedCalories = calories.sort((a, b) => b - a);
    return sortedCalories.slice(0, 3).reduce((a, b) => a + b, 0);
};

console.log("PART ONE: ", partOne());
console.log("PART TWO: ", partTwo());
