/* MAPPED TYPES */

/*
    Let's create a "flexible dog info". Essentially we want to create a data structure to
    store information about a dog, but we will do it *Flexibly*.
*/

type myFlexibleInfo = {
    name: string;
} & Record<string, string>; //~~> This means that this type also has a field: { string: string }

const dog: myFlexibleInfo = {
    name: "LG",
    breed: "Neomutt",
};

/*
    We can achieve the save as the above with the following syntax.
*/

type myFlexibleInfoAnother = {
    name: string;
    //~~> For any key of type string, we can have a string or a number -|
    //    v---------------v---------------------------------------------|
    //  -------       ---------
    [key: string]: string | number;
};

const dogAnother: myFlexibleInfoAnother = {
    name: "LG",
    breed: "Neomutt",
    age: 4,
};

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

interface DogInfo {
    name: string;
    age: number;
}

//~~> Will take a type in the parameter: -|
//                  v---------------------|
type OptionsFlags<Type> = {
    //~~> Map property to key of type take in parameter -|
    //          v----------------------------------------|
    // -------------------
    [Property in keyof Type]: boolean; //~~> Sets the type of property, this can be what we want -|
    //                           ^----------------------------------------------------------------|
};

type DogInfoOptions = OptionsFlags<DogInfo>;

/*
    The type signature of `DogInfoOptions` is as follows:
        type DogInfoOptions = {
            name: boolean;
            age: boolean;
        }

    NOTE: The type `DogInfo` was passed to `OptionsFlags`, which returned
    a new type with the same fields as `DogInfo` but all field types have
    been set to boolean.
*/

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

/* A practical example */

type Listeners<Type> = {
    [Property in keyof Type as `on${Capitalize<string> & Property>}Change`]?: (newValue: Type[Property]) => void;
};

const ListenToObj = <T>(obj: T, listeners: Listeners<T>): void => {
    throw "This needs to be implemented";
};

const dogo: DogInfo = {
    name: "Dogo",
    age: 3,
};

type DogInfoListeners = Listeners<DogInfo>;

ListenToObj(dogo, {
    onNameChange: (v: string) => {},
    onAgeChange: (v: number) => {},
});
