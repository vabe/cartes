const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 4000;
const NEW_VOTE_EVENT = "newVoteEvent";

io.on("connection", (socket) => {
  // Join a conversation
  const { roomId } = socket.handshake.query;

  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_VOTE_EVENT, (data) => {
    io.in(roomId).emit(NEW_VOTE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
