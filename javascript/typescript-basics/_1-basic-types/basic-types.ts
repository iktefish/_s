/* BASIC TYPES */

let whoIsIt: string = "It's a Tepa";
let isSweet: boolean = true;
let age: number = 12;
let myRegex: RegExp = /foo/;

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

/* ARRAYS */

let names: string[] = whoIsIt.split(" "); //~~> Strings as arrays
let myGenericVal: Array<number> = [1, 2, 3];

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

/* OBJECTS */

const justAPersonObj: { first: string; middle: string; last: string } = {
    first: "Leav",
    middle: "Choloro",
    last: "Phil",
};

interface Person {
    first: string;
    middle: string;
    last: string;
}

const andAnotherPersonObj: Person = {
    first: "Red",
    middle: "Ironbound",
    last: "Bloodseeker",
};

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

/* RECORDS */

const ids: Record<number, string> = {
    10: "A",
    20: "B",
};

ids[30] = "C";

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

/* MAP FUNCTION */

[1, 2, 3, 4, 5].forEach((v) => console.log(v));
["A", "B", "C"].map((v) => console.log(v + "!"));

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

/* REDUCE FUNCTION */

/*
    Consider the following array, `numbers`. Say we want to compute the sum of every
    elements of that array.
*/

const numbers = [1, -1, 3, 5];

/*
    We can achieve this by looping over the array, and adding each element to an
    accumulator, defined outside the loop.
*/

let acc = 0;
for (let n of numbers) acc += n;

console.log(acc);

/*
    We can achieve the same results using the Reduce() function. Reduce takes 2 args:

    1. A function that takes an accumulator and a value.
    2. Starting state of the accumulator.

    NOTE: The second argument is optional, if we donot pass it, then Reduce will start
    from the first element of the array.

    Reduce returns the final state of the accumulator.
*/

acc = numbers.reduce((acc, val) => {
    return acc + val;
}, 0);

console.log(acc);

/*
    # Why use Reduce?

    Reduce allows us to iterate over an iterable construct (for example objects, arrays,
    etc.) and get the result of arbitrary computation without modifying the state of the
    program directly. The higher-order function we pass into the Reduce function has to
    be defined by us.
*/
