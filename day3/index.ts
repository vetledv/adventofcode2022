import fs from "fs";

const rucksack = fs.readFileSync("day3/input.txt", "utf-8").split("\r\n");

const stringToCharArray = (string: string) => {
    return string.split("");
};

//A-Z: 1-26, a-z: 27-52
const getPriority = (char: string) => {
    const charCodeValue = char.charCodeAt(0);
    //A = 65, a = 97
    const isUpperCase = charCodeValue > 96 ? false : true;
    return isUpperCase ? charCodeValue - 38 : charCodeValue - 96;
};

const splitSack = (sack: string[]) => {
    return sack.map((items) => {
        const halfLength = items.length / 2;
        const firstHalf = stringToCharArray(items.slice(0, halfLength));
        const secondHalf = stringToCharArray(items.slice(halfLength));
        const commonChar = firstHalf.find((char) => secondHalf.includes(char));
        if (!commonChar) return 0;
        return getPriority(commonChar);
    });
};
const partOne = () => {
    const resultArr = splitSack(rucksack);
    const result = resultArr.reduce((prev, curr) => prev + curr, 0);
    console.log(result);
};
partOne();

const groupByThree = (arr: string[]) => {
    const result: string[][] = [];
    for (let i = 0; i < arr.length; i += 3) {
        result.push([arr[i], arr[i + 1], arr[i + 2]]);
    }
    return result;
};

const partTwo = () => {
    const groups = groupByThree(rucksack);
    const resultArr = groups.map((group) => {
        const [first, second, third] = group.map((item) =>
            stringToCharArray(item)
        );
        const [commonInAllThree] = first.filter(
            (char) => second.includes(char) && third.includes(char)
        );
        if (!commonInAllThree) return 0;
        return getPriority(commonInAllThree);
    });
    const result = resultArr.reduce((prev, curr) => prev + curr, 0);
    console.log(result);
};
partTwo();
