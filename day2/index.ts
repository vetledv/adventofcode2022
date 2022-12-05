import fs from "fs";

const file = fs.readFileSync("day2/input.txt", "utf-8").split("\r\n");

const games = file.map((input) => {
    const [opp, me] = input.split(" ");
    return { opp, me };
});

const Outcome = ["X", "Y", "Z"] as const;
const Moves = ["A", "B", "C"] as const;
type TMoves = typeof Moves[number];
type TOutcome = typeof Outcome[number];

const R = 1;
const P = 2;
const S = 3;

const LOSE = 0;
const DRAW = 3;
const WIN = 6;

const winMovesByNum = {
    [R]: S,
    [P]: R,
    [S]: P,
} as const;

const moveValue = {
    A: R,
    B: P,
    C: S,
} as const;

const winMoves = {
    A: "C",
    B: "A",
    C: "B",
} as const;

const loseMoves = {
    A: "B",
    B: "C",
    C: "A",
} as const;

const getGameScore = ({ opp, me }: { opp: TMoves; me: TMoves }) => {
    const myMove = moveValue[me];
    const oppMove = moveValue[opp];
    if (winMovesByNum[myMove] === oppMove) return myMove + WIN;
    if (myMove === oppMove) return myMove + DRAW;
    return myMove + LOSE;
};

const convertMyMove = (move: TOutcome) => {
    if (move === "X") return "A";
    if (move === "Y") return "B";
    return "C";
};

const partOne = () => {
    const myScorePerGame = games.map((game) => {
        const { opp, me } = game as { opp: TMoves; me: TOutcome };
        const newMe = convertMyMove(me);
        return getGameScore({ opp, me: newMe });
    });
    const myTotalScore = myScorePerGame.reduce((a, b) => a + b, 0);
    console.log(myTotalScore);
};

const getLosingMove = (outcome: TOutcome, oppMove: TMoves) => {
    if (outcome === "X") return winMoves[oppMove]; // lose
    if (outcome === "Z") return loseMoves[oppMove]; // win
    return oppMove; //draw
};

const partTwo = () => {
    const newGames = games.map((game) => {
        const { opp, me: condition } = game as { opp: TMoves; me: TOutcome };
        const newMe = getLosingMove(condition, opp);
        return { opp, me: newMe };
    });
    const myScorePerGame = newGames.map((game) => getGameScore(game));
    const myTotalScore = myScorePerGame.reduce((a, b) => a + b, 0);
    console.log(myTotalScore);
};

partOne();
partTwo();
