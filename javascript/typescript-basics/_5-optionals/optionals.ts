/* OPTIONALS */

const printIngredient = (
    quantity: string,
    ingredient: string,
    extra?: string
) => {
    // console.log(`${quantity} ${ingredient}`);
    console.log(`${quantity} ${ingredient} ${extra ? `${extra}` : ""}`);
};

printIngredient("1 Cup", "Flour");

/*
    Say I want to pass another, optional, argument to printIngredient():

        printIngredient("1 Tablespoon", "Sugar", "Chemical X")

    We can do this by adding a `?` to a third parameter in our function
    signature. That satisfaction of that parameter optional.
*/

printIngredient("1 Tablespoon", "Sugar", "Chemical X");

/*
    Let's try optional fields.
*/

interface User {
    id: string;
    info?: {
        email?: string;
    };
}

//~~> Sig states function returns `string` but return type is `string | undefined`-|
//                                v------------------------------------------------|
const getEmail = (user: User): string => {
    if (user.info) {
        return user.info.email!;
        /*
            NOTE: We can use the `!` decorator to ensure TypeScript that the above expression
            wont evaluate to an `undefined`:
                return user.info.email!;

            But this is not recommended.
        */
    }
    return "";
};

/*
    The proper way of doing this, which reduces a lot of the complexity of the
    above method is shown below:
*/

const getEmailProper = (user: User): string => {
    //~~> This reads as follow:
    //    If `user` exists, give `info` and if `info` exists, give `email` -|
    //         v------------------------------------------------------------|
    //     -----------
    return user?.info?.email ?? "";
    //                       ^---------------------------|
    //~~> And if `email` is `null`, return empty string -|
};

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

/* OPTIONAL CALLBACKS */

//~~> Let's say that we want a function that takes an optional callback -|
//                                                     v-----------------|
const addWithCallback = (x: number, y: number, callback?: () => void) => {
    console.log(x + y);

    /*
        We can have call `callback()` if it exists by wrapping it in a conditional.
    */
    if (callback) {
        callback();
    }

    /*
        We can achieve the same outcome by doing the following (they are synonymous):
    */
    callback?.();
};
