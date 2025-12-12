"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const node_http_1 = require("node:http");
const socket_io_1 = require("socket.io");
const connectionService_1 = require("./services/connectionService");
const PORT = 5000;
const app = (0, express_1.default)();
const server = (0, node_http_1.createServer)(app);
exports.io = new socket_io_1.Server(server);
app.get('/', (req, res) => {
    console.log("httmp1");
});
exports.io.on("connection", (socket) => {
    (0, connectionService_1.HandleConnection)(socket);
});
server.listen(PORT, () => {
    console.log("connected to ", PORT);
});
