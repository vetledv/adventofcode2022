import fs from "fs";

const file = fs.readFileSync("day4/input.txt", "utf-8").split("\r\n");

const rangePairs = file.map((line) => {
    const [rangeA, rangeB] = line.split(",").map((range) => {
        const [start, end] = range.split("-").map((num) => parseInt(num));
        return { start, end };
    });
    return { rangeA, rangeB };
});

const isInRange = ({ rangeA, rangeB }: typeof rangePairs[0]) => {
    const { start: startA, end: endA } = rangeA;
    const { start: startB, end: endB } = rangeB;
    const inRangeA = startB >= startA && endB <= endA;
    const inRangeB = startA >= startB && endA <= endB;
    if (inRangeA || inRangeB) return true;
    return false;
};

const isRangesOverlapping = ({ rangeA, rangeB }: typeof rangePairs[0]) => {
    const { start: startA, end: endA } = rangeA;
    const { start: startB, end: endB } = rangeB;
    return startB <= endA && endB >= startA;
};

const partOne = () => {
    const fullyContainedRanges = rangePairs.filter((pair) => isInRange(pair));
    console.log("Part 1: ", fullyContainedRanges.length);
};

const partTwo = () => {
    const overlappingRanges = rangePairs.filter((pair) =>
        isRangesOverlapping(pair)
    );
    console.log("Part 1: ", overlappingRanges.length);
};

partOne();
partTwo();
