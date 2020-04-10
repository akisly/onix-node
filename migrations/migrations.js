const { spawn } = require("child_process");

const migrate = spawn("npx", [
    "migrate-mongo",
    "up",
    "-f",
    "./migrations/migrate-mongo-config.js"
]);

migrate.stdout.on("data", data => {
    console.log(data.toString("utf8"));
});

migrate.stderr.on("data", data => {
    console.log(data.toString("utf8"));
});

migrate.on("close", code => {
    console.log(`Migrations exited code: ${code}`);
});
