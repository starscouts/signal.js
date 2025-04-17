const fs = require('fs');
const path = require("path");

let classes = fs.readdirSync("./classes").filter(i => i.endsWith(".ts"));
let types = fs.readdirSync("./types").filter(i => i.endsWith(".ts"));
let enums = fs.readdirSync("./enums").filter(i => i.endsWith(".ts"));

let index = "// Classes\n";

for (let c of classes) {
    index += "export {" + path.basename(c, path.extname(c)) + "} from \"./classes/" + path.basename(c, path.extname(c)) + "\";\n";
}

index += "\n// Types\n";

for (let c of types) {
    index += "export {" + path.basename(c, path.extname(c)) + "} from \"./types/" + path.basename(c, path.extname(c)) + "\";\n";
}

index += "\n// Enums\n";

for (let c of enums) {
    index += "export {" + path.basename(c, path.extname(c)) + "} from \"./enums/" + path.basename(c, path.extname(c)) + "\";\n";
}

fs.writeFileSync("./index.ts", index);