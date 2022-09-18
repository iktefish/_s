const pluck = <DataType, KeyType extends keyof DataType>(
    items: DataType[],
    key: KeyType
): DataType[KeyType][] => {
    return items.map((item) => item[key]);
};

const dogs = [
    { name: "Yuna", age: 5 },
    { name: "Blacky", age: 5 },
    { name: "Brown", age: 1 },
    { name: "Marley", age: 3 },
];

console.log(pluck(dogs, "age"));
console.log(pluck(dogs, "name"));

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

interface BaseEvent {
    time: number;
    user: string;
}

interface EventMap {
    addToCart: BaseEvent & { quantity: number; productId: string };
    checkout: BaseEvent;
}

const sendEvent = <Name extends keyof EventMap>(
    name: Name,
    data: EventMap[Name]
): void => {
    console.log(name, data);
};

sendEvent("addToCart", {
    productId: "foo",
    user: "bar",
    quantity: 100,
    time: 60,
});

sendEvent("checkout", { time: 30, user: "bob" });
