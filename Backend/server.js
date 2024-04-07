const express = require("express");
const app = express();

const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//routes
app.get("/", (req, res) => {
  res.send("This is mern realtime whiteboard sharing app");
});

io.on("connection", (socket) => {
  socket.on("userJoined", (data) => {
    const { name, userId, roomId, host, presenter } = data;
    socket.join(roomId);
    socket.emit("userIsJoined", { success: true });
  });
});

const port = process.env.Port || 8000;

server.listen(port, () =>
  console.log("Server is running on http://localhost:8000")
);
