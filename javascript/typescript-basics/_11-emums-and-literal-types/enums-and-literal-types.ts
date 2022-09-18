/* ENUMS */

/*
    Consider that we have 3 constants to note the state of something.
*/

const beforeLoad = "beforeLoad";
const loading = "loading";
const loaded = "loaded";

const isLoading = (state: string) => state === loading;

/*
    This is best modelled using something called an Enumeration.
*/

enum LoadingState {
    beforeLoad = "beforeLoad",
    loading = "loading",
    loaded = "loaded",
}

const isLoadingUsingEnum = (state: string) => state === LoadingState.loading;

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

/* LITERAL TYPES */

/*
    Say we want to create a rollDice() function for something in DnD.
*/

const rollDice = (dice: number): number => {
    let pip = 0;
    for (let i = 0; i < dice; i++) {
        pip += Math.floor(Math.random() * 5) + 1;
    }

    return pip;
};

console.log(rollDice(4));

//~~> Instead of taking an arbitrary number type, we can specify
//    which numbers we want to allow       -|
//                              v-----------|
//                     -------------------
const roll6D = (dice: 1 | 2 | 3 | 4 | 5 | 6): number => {
    let pip = 0;
    for (let i = 0; i < dice; i++) {
        pip += Math.floor(Math.random() * 5) + 1;
    }

    return pip;
};

console.log(roll6D(4));

/*
    The following code:
        console.log(roll6D(7))

    Will throw the following error:
        Argument of type '7' is not assignable to parameter of type '4 | 1 | 2 | 3 | 5 | 6'
*/
