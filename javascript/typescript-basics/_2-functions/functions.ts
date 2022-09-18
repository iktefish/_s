/* FUNCTIONS */

//~~> Type annotation -v-------v--------v
function addNums(a: number, b: number): number {
    return a + b;
}

export default addNums;

export const addStr = (
    str_1: string, //~~> Type annotation
    str_2: string = "Kick de Brick" //~~> Default value in parameter
): string => `${str_1} ${str_2}`;

//~~> Union type -----------------------------------v
//                                     --------------------
export const format = (title: string, param: string | number): string =>
    `${title} ${param}`;

//~~> Returns nothing -----------------------------------------------v
export const printFormat = (title: string, param: string | number): void => {
    console.log(format(title, param));
};

//~~> Returns a Promise that resolves to a `string` --|
//                                                v---|
export const fetchData = (url: string): Promise<string> =>
    Promise.resolve(`Data from ${url}`);

//~~> Variadic parameter into array ----------v
//                                     ------------------
export const introduce = (salutation: string, ...names: string[]): string => {
    return `${salutation} ${names.join(" ")}`;
};

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

/*
    NOTE: TypeSCript only does compile time type checking, NOT runtime.
*/

export function getName(user: { first: string; last: string }): string {
    return `${user.first} ${user.last}`;
}
//~~> getName() will compile to the following JavsScript: --|
//              v-------------------------------------------|
// function getName(user) {
//     return "".concat(user.first, " ").concat(user.last);
// }

/*
    Using the optional Chaining operator `?`, we can make sure that `user`
    argument is defined first.
*/

export function getName_1(user: { first: string; last: string }): string {
    return `${user?.first} ${user?.last}`;
}
//~~> getName_1() will compile to the following JavsScript: --|
//              v---------------------------------------------|
// function getName_1(user) {
//     return ""
//         .concat(user === null || user === void 0 ? void 0 : user.first, " ")
//         .concat(user === null || user === void 0 ? void 0 : user.last);
// }

/*
    Using the Null Coalescing operator `??`, we can make specify values to
    default to, in the case that the item on the left hand side of the operator is
    `undefined`.
*/

export function getName_2(user: { first: string; last: string }): string {
    return `${user?.first ?? "first"} ${user?.last ?? "last"}`;
}
//~~> getName_1() will compile to the following JavsScript: --|
//              v---------------------------------------------|
// function getName_2(user) {
//     var _a, _b;
//     return ""
//         .concat(
//             (_a = user === null || user === void 0 ? void 0 : user.first) !==
//                 null && _a !== void 0
//                 ? _a
//                 : "first",
//             " "
//         )
//         .concat(
//             (_b = user === null || user === void 0 ? void 0 : user.last) !==
//                 null && _b !== void 0
//                 ? _b
//                 : "last"
//         );
// }
