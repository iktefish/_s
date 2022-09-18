/* UTILITY TYPES */

/*
    Lets establish a user.
*/
interface MyUser {
    id: string;
    name: string;
    email?: string;
}

/*
    We will create another interface that should have all fields present
    in `MyUser` but they will all be optional.
*/
interface MyUserOptionals {
    id?: string;
    name?: string;
    email?: string;
}

/*
    Lets create a merge function that will take a `MyUser` and `MyUserOptionals` and
    return a `MyUser`. We will return an object which will have fields provided by
    `MyUserOptionals` override fields provided by `MyUser`.
*/
const merge = (user: MyUser, overrides: MyUserOptionals): MyUser => {
    return {
        ...user,
        ...overrides,
    };
};

console.log(
    merge(
        {
            name: "Solas",
            id: "egg",
            email: "imdumb@smart.maybe",
        },
        { email: "maybesmart@im.dumb" }
    )
);

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

/* PARTIAL<> */

/*
    NOTE: At this stage, if I want to add another field in `MyUser`, I will also have to
    add the same field to `MyUserOptionals`. Repititions like these are always a bad practice.
    We can create what is called a Partial type.
*/

interface MyNewUser {
    id: string;
    name: string;
    email?: string;
    anotherField: string;
}

//~~> Partial type of `MyNewUser`-----v
type MyNewUserOptionals = Partial<MyNewUser>;

/*
    The type signature for `MyNewUserOptionals` is:
        type MyNewUserOptionals = {
            id?          : string | undefined;
            name?        : string | undefined;
            email?       : string | undefined;
            anotherField?: string | undefined;
        }
*/

const mergeNew = (
    user: MyNewUser,
    overrides: MyNewUserOptionals
): MyNewUser => {
    return {
        ...user,
        ...overrides,
    };
};

console.log(
    merge(
        {
            name: "Bolas",
            id: "bag",
            email: "elvenhypocrite@egg.crack",
        },
        { email: "hehasaplan@he.says" }
    )
);

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

/* REQUIRED<> */

/*
    Instead of having each types be optional, as is the case with Partial types, we can
    have all types required. We do this by using the Required type.
*/

interface MyRequiredUser {
    id: string;
    name: string;
    email?: string;
    anotherField: string;
}

//~~> Utility type  --------------v
type MyRequiredUserOptionals = Required<MyRequiredUser>;

/*
    The type signature for `MyRequiredUserOptionals` is:
        type MyRequiredUserOptionals = {
            id          : string;
            name        : string;
            email       : string;
            anotherField: string;
        }
*/

const mergeRequired = (
    user: MyRequiredUser,
    overrides: MyRequiredUserOptionals
): MyRequiredUser => {
    return {
        ...user,
        ...overrides,
    };
};

console.log(
    merge(
        {
            name: "Popeye",
            id: "forearms",
            email: "spinach@sail.or",
        },
        { email: "spinach@pop.i" }
    )
);

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

/* PICK<> */

/*
    We can create a type based on our `MyNewUser` type and just pick the fields that we
    want to exist in our new type.
*/

//~~> Pick type  --------v
type JustEmailAndName = Pick<MyNewUser, "id" | "name">;

/*
    The type signature for `JustEmailAndName` is:
        type JustEmailAndName = {
            id  : string;
            name: string;
        }
*/

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

/* RECORD<> */

/*
    We can create a type based on our `MyNewUser` type and just pick the fields that we
    want to exist in our new type.
*/

//~~> Pick type  --------v
const mapById = (users: MyUser[]): Record<string, MyUser> => {
    return users.reduce((acc, val) => {
        return {
            ...acc,
            [val.id]: val,
        };
    }, {});
};

/*
    The type signature for `JustEmailAndName` is:
        type JustEmailAndName = {
            id  : string;
            name: string;
        }
*/

console.log(
    mapById([
        {
            id: "foo",
            name: "Mr. Egg",
        },
        {
            id: "bar",
            name: "Sr. Pole",
        },
    ])
);
