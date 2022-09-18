import houses from "./houses";

interface House {
    name: string;
    planets: string | string[];
}

//~~> The following is equivalent to -|
//                 v------------------|
// interface HouseWithID {
//     id: number;
//     name: string;
//     planets: string | string[];
// }
interface HouseWithID extends House {
    id: number;
}

function findHouses(houses: string): HouseWithID[];
function findHouses(
    houses: string,
    filter: (house: House) => boolean
): HouseWithID[];
function findHouses(houses: House[]): HouseWithID[];
function findHouses(
    houses: House[],
    filter: (house: House) => boolean
): HouseWithID[];

function findHouses(
    input: string | House[],
    filter?: (house: House) => boolean
): HouseWithID[] {
    const houses: House[] =
        typeof input === "string" ? JSON.parse(input) : input;
    return (filter ? houses.filter(filter) : houses).map((house) => ({
        id: houses.indexOf(house),
        ...house,
    }));
}

console.log(
    findHouses(JSON.stringify(houses), ({ name }) => name === "Atreides")
);

console.log(findHouses(houses, ({ name }) => name === "Harkonnen"));
