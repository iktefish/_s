/* FUNCTION OVERLOADING */

/*
    Let's create a function that parses co-ordinates.
*/

//~> Firstly we want to establish what a co-ordinate is.
interface Coordinate {
    x: number;
    y: number;
}

const parseCoorFromObj = (obj: Coordinate): Coordinate => {
    return {
        ...obj,
    };
};

const parseCoroFromNums = (x: number, y: number): Coordinate => {
    return {
        x,
        y,
    };
};

/*
    NOTE: Instead of declaring 2 functions, like done above, we can achieve
    the same goal using function overloading.
*/

function parseCoordinate(obj: Coordinate): Coordinate;
function parseCoordinate(x: number, y: number): Coordinate;
function parseCoordinate(str_1: string, str_2: string): Coordinate;

/*
    NODE: The first signature expects 1 arg and the second expects 2. Therefore
    we must make the second arg optional.
*/

//~~> Make `arg_2` optional ------------------v
function parseCoordinate(arg_1: unknown, arg_2?: unknown): Coordinate {
    /*
        # What is `unknown`?

        The `unknown` type is similar to `any` but it has to be cast before
        its used. Therefore it's essentially a safer `any`.
    */

    let coord: Coordinate = {
        x: 0,
        y: 0,
    };

    /*
        NOTE: Type is expected to be `object` rather than `Coordinate` is due to
        TypeScript only checking types at compile time, not runtime.
    */
    if (typeof arg_1 === "object") {
        coord = {
            ...(arg_1 as Coordinate),
        };
    } else if (typeof arg_1 === "number" && typeof arg_2 === "number") {
        coord = {
            x: arg_1 as number,
            y: arg_2 as number,
        };
    } else if (typeof arg_1 === "string" && typeof arg_2 === "string") {
        coord = {
            x: parseInt(arg_1) as number,
            y: parseInt(arg_2) as number,
        };
    }

    return coord;
}

console.log(parseCoordinate(10, 20));
console.log(parseCoordinate({ x: 10, y: 20 }));
console.log(parseCoordinate("10", "10"));
