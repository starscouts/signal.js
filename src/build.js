const fs = require('fs');
fs.copyFileSync(__dirname + "/package.json", __dirname + "/package.json.old");

let id = require('child_process').execSync("git rev-parse HEAD", { cwd: __dirname }).toString().trim().substring(0, 7);

const pkg = require(__dirname + "/package.json");
const child_process = require("child_process");
pkg.version = pkg.version.split("-")[0] + "-dev." + Math.round(new Date().getTime() / 1000).toString() + "-" + id + ".0";
fs.writeFileSync(__dirname + "/package.json", JSON.stringify(pkg, null, 2));

child_process.execSync("npm publish --tag dev", { cwd: __dirname, stdio: "inherit" });
process.env.NODE_AUTH_TOKEN = fs.readFileSync(__dirname + "/../.token").toString().trim();
child_process.execSync("npx npm-deprecate -p @equestria.dev/signal.js -n *-dev.* --message \"This version of Signal.js was built automatically and is not the latest version. No support will be provided.\"", { cwd: __dirname, stdio: "inherit" });
fs.copyFileSync(__dirname + "/package.json.old", __dirname + "/package.json");
fs.unlinkSync(__dirname + "/package.json.old");