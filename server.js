const http = require("http");
const app = require("./app");
const port = 3000;
const dotenv = require("dotenv");
dotenv.config();

const server = http.createServer(app);

server.listen(port);
console.log(process.env.DB_HOST);
