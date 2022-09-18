/* TUPLES */

/*
    A tuple is essentially an array but it can hold different element of
    different types.
*/

type ThreeDimCoord = [x: number, y: number, z: number, s: string];

const add3DCoor = (c_1: ThreeDimCoord, c_2: ThreeDimCoord): ThreeDimCoord => {
    return [
        c_1[0] + c_2[0],
        c_1[1] + c_2[1],
        c_1[2] + c_2[2],
        "Just some random string that nobody wants",
    ];
};

console.log(add3DCoor([0, 0, 0, ""], [5, 15, 25, ""]));

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

/*
    Is React the most common type of tuple used is the `useState` tuple.
    The `useState` tuple returns a state and a state setter. Let's create
    a similar tuple:
*/

const simpleStrState = (
    initial: string
    //~~> Accessor -|       Setter-|
    //  v-----------|          v---|
): [() => string, (s: string) => void] => {
    let str: string = initial;

    /*
        We will be returning a tuple. First element of the tuple will be a function
        that returns a string, second element returns a function that takes a string
        and sets the state to the new string.
    */
    return [
        () => str,
        (s: string) => {
            str = s;
        },
    ];
};

const [str_1_Getter, str_1_Setter] = simpleStrState("Hello");
console.log("Initial value of str_1: ", str_1_Getter());

str_1_Setter("Nevermind, bye bye!");
console.log("Changed value of str_1: ", str_1_Getter());
