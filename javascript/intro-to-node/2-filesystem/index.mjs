// import fs from "fs";
import {readFile, writeFile} from "fs/promises";

// console.log("pwd ~~> ",import.meta.url);
let lipsum = await readFile(new URL("lipsum", import.meta.url));
lipsum = lipsum.toString()
console.log(lipsum);

const data = {
    title: "Learn Node.js",
    body: "This is the new file"
};

for (const [k, v] of Object.entries(data)) {
    lipsum = lipsum.replace(`{${k}}`, v)
};

await writeFile(new URL("changedLipsum", import.meta.url), lipsum);
