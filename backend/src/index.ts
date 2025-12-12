import express from "express";
import {createServer} from "node:http"
import { Server } from "socket.io";
import { HandleConnection } from "./services/connectionService";
const PORT = 5000
const app = express()

const server = createServer(app)
export const io = new Server(server)

app.get('/', (req,res)=>{
    console.log("httmp1");
})


io.on("connection", (socket) => {
    HandleConnection(socket)
});




server.listen(PORT,()=>{
    console.log("connected to ",PORT);
})