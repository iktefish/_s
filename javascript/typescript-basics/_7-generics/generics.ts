/* GENERIC TYPES */

/*
    Consider the useState we created in "../_6-tuples/tuples.ts". But say we
    want to use arbitrary type T, instead of a string. The type T will be replaced
    with whatever the type of the `initial` argument it.
*/

//~~> Generic type T ---v
const simpleGenState = <T>(initial: T): [() => T, (s: T) => void] => {
    let val: T = initial;
    return [
        () => val,
        (s: T) => {
            val = s;
        },
    ];
};

/*
    NOTE: The function signature initially is:

        const simpleGenState: <unknown>(initial: unknown) => [() => unknown, (s: unknown) => void]

    But, when we put an argument of type `number`, it later changes to:
        const simpleGenState: <number>(initial: number) => [() => number, (s: number) => void]
*/

const [state_1_Getter, state_1_Setter] = simpleGenState(111);
console.log(state_1_Getter());

state_1_Setter(333);
console.log(state_1_Getter());

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

/* EXPLICITLY DECLARE GENERIC TYPES */

/*
    Say we provide an initial argument of type `null`. And we then want to provide an argument
    of type `number`:

        const [state_2_Getter, state_2_Setter] = simpleGenState(null);

    The generic type has already been set to `null` due to our initial argument. In order to pass
    a number now, we will have to explicitly declare generic types.
*/

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

//~~> Explicit generic type declaration -----------------------v
//                                                     ---------------
const [state_2_Getter, state_2_Setter] = simpleGenState<number | null>(null);
console.log(state_2_Getter());

state_2_Setter(555);
console.log(state_2_Getter());

/*
    Let's create a function that will take a list of items and a ranking algorithm,
    and return a sorted list of all those items based on their rank.
*/

interface Rank<RankItem> {
    item: RankItem;
    rank: number;
}

const ranker = <RankItem>(
    items: RankItem[],
    rank: (val: RankItem) => number
): RankItem[] => {
    // interface Rank {
    //     item: RankItem; //~> NOTE: `RankItem` is declared in this scope. Therefore if we choose to declare the interface outside this scope, `RankItem` wouldn't exist.
    //     rank: number;
    // }

    /*
        To pass `RankItem` to an interface declared outside the current scope, we can pass `RankItem`
        as a type argument to `Rank` and have the interface take `RankItem` in as a type argument as
        well.
    */

    const ranks: Rank<RankItem>[] = items.map((item) => ({
        item,
        rank: rank(item),
    }));

    ranks.sort((a, b) => a.rank - b.rank);
    return ranks.map((rank) => rank.item);
};

/* TESTING THE RANKER */

interface Pokemon {
    name: string;
    hp: number;
}

const pokemons: Pokemon[] = [
    {
        name: "Salamance",
        hp: 625,
    },
    {
        name: "Garchopm",
        hp: 650,
    },
];

const ranks = ranker(pokemons, ({ hp }) => hp);
console.log(ranks);
