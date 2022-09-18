/* READONLY */

/*
    TypeScript offers compile time immutability.
*/

/*
    Consider the interface below. We shouldn't be allows to mutate the name of a Cat
    after assigning the name. Therefore we use the `readonly` keyword to make the name
    immutable.
*/

interface Cat {
    //~~> Make the `name` field immutable -|
    //  v----------------------------------|
    readonly name: string;
    breed: string;
}

const makeCat = (name: string, breed: string): Cat => {
    return {
        name,
        breed,
    };
};

const usul = makeCat("Usul", "Tabbycat");

/*
    The following code will not work:
        usul.name = "Piter"; //~~> This will NOT work due to this field being immutable.
*/

/*
    Now say I want to make all the fields of Cat immutable. I can use the Readonly
    type and pass in Cat.
*/
type ReadonlyCat = Readonly<Cat>;

/* The type signature for ReadonlyCat is:
       type ReadOnlyCat = {
           readonly name : string;
           readonly breed: string;
       }
*/

//~~> We can return a Readonly<Cat> ------------------------v
const makeReadonlyCat = (name: string, breed: string): Readonly<Cat> => {
    return {
        name,
        breed,
    };
};

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

/* IMMUTABLE TUPLES */

const makeCoord = (
    x: number,
    y: number,
    z: number
    //~~> Return an immutable Tuple -|
    //            v------------------|
    // --------------------------
): readonly [number, number, number] => {
    return [x, y, z];
};

const coord = makeCoord(10, 20, 30);

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

/* IMMUTABLE CONSTANTS 🤣 */

//~~> The address where this array is stored is constant    -|
// v---------------------------------------------------------|
const usualConstant = [1, 2, 3];
usualConstant[0] = 1000; //~~> But the contents are still mutable.

//~~> Now the address along with its contents are constants -|
//                                    v----------------------|
const reallyConstant = [1, 2, 3] as const;

/*
    This following code will not run:
        reallyConstant[0] = 1000;
*/
