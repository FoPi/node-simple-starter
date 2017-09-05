const config = require("config");
const router = require("./router");
const http = require("http");

http.createServer(router).listen(config.server.port);

console.log("Server listening on port " + config.server.port);