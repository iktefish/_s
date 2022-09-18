/* PASSING FUNCTIONS AS ARGUMENTS */

//~~> Function as args ----------------------v
export const printToFile = (text: string, callback: () => void): void => {
    //                                            -------------
    //~~> Type specification for parameter --------------^
    console.log(text);
    callback();
};

export const arrayMutate = (
    numbers: number[],
    mutate: (n: number) => number //~~> This is how we annotate signature of function in parameter.
): number[] => {
    return numbers.map(mutate);
};

console.log(arrayMutate([1, 2, 3, 4, 5], (n) => n * 10));

/*
    NOTE: We can create types so that we don't have to annotate function
    signature in parameters, since they are often not easy to read.
*/

type MutationFunction = (n: number) => number;

export const arrayMutate_New = (
    numbers: number[],
    mutate: MutationFunction //~~> We can use the predefined type.
): number[] => {
    return numbers.map(mutate);
};

console.log(arrayMutate_New([1, 2, 3, 4, 5], (n) => n * 10));

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

/* RETURNING FUNCTIONS, AKA CLOSURES */

const createAdder = (num: number): ((val: number) => number) => {
    return (val: number) => num + val; //~~> Returns a function.
};

const addOne = createAdder(1);
console.log(addOne(10));
