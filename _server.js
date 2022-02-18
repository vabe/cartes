import express from "express";
import { createServer } from "http";
import next from "next";
import * as socketio from "socket.io";

const CONNECT_EVENT = "connection";
const DISCONNECT_EVENT = "disconnect";
const NEW_VOTE_EVENT = "newVoteEvent";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = parseInt(process.env.PORT || "4000", 10);
const nextApp = next({ dev, hostname, port });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
  const app = express();
  const server = createServer(app);
  const io = new socketio.Server();
  io.attach(server);

  io.on(CONNECT_EVENT, (socket) => {
    const { roomId } = socket.handshake.query;
    socket.join(roomId);

    socket.on(NEW_VOTE_EVENT, (data) => {
      io.in(roomId).emit(NEW_VOTE_EVENT, data);
    });

    socket.on(DISCONNECT_EVENT, () => {
      socket.leave(roomId);
    });
  });

  app.all("*", (req, res) => nextHandler(req, res));

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
