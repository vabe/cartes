const express = require("express");
const path = require("path");
const next = require("next");
const socketio = require("socket.io");
const { createServer } = require("http");

const CONNECT_EVENT = "connection";
const DISCONNECT_EVENT = "disconnect";
const NEW_VOTE_EVENT = "new-vote-event";
const REMOVE_VOTE_EVENT = "remove-vote-event";
const REMOVE_VOTES_EVENT = "remove-votes-event";
const REVEAL_VOTES_EVENT = "reveal-votes-event";

const dev = process.env.NODE_ENV !== "production";
const hostname = express.static(__dirname);
const port = parseInt(process.env.PORT || "4000", 10);
const nextApp = next({ dev, hostname, port });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
  const app = express();

  if (dev) {
    app.use(express.static(__dirname));
  } else {
    app.use(express.static(path.join(__dirname, "out")));
  }

  const server = createServer(app);
  const io = new socketio.Server();

  io.attach(server);

  io.on(CONNECT_EVENT, (socket) => {
    const { roomId } = socket.handshake.query;

    socket.join(roomId);

    socket.on(NEW_VOTE_EVENT, (data) => {
      io.in(roomId).emit(NEW_VOTE_EVENT, data);
    });

    socket.on(REMOVE_VOTE_EVENT, (data) => {
      io.in(roomId).emit(REMOVE_VOTE_EVENT, data);
    });

    socket.on(REMOVE_VOTES_EVENT, () => {
      io.in(roomId).emit(REMOVE_VOTES_EVENT);
    });

    socket.on(REVEAL_VOTES_EVENT, (data) => {
      io.in(roomId).emit(REVEAL_VOTES_EVENT, data);
    });

    socket.on(DISCONNECT_EVENT, () => {
      socket.leave(roomId);
    });
  });

  app.all("*", (req, res) => nextHandler(req, res));

  server.listen(port, () => {
    console.log(`> Ready on ${port}`);
  });
});
