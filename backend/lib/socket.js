import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "https://crisschat2-0.vercel.app"
];

const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  },
});

// storage for online users

const userSockerMap = {};

io.on("connection", (socket) => {
  console.log('User connected', socket.id);

  const usertId = socket.handshake.query.userId;

  if (usertId) {
    userSockerMap[usertId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSockerMap));
  

  socket.on('disconnect', (socket) => {
    console.log('User disconnected', socket.id);
    delete userSockerMap[usertId];
    io.emit("getOnlineUsers", Object.keys(userSockerMap));
  })
})

export { io, server, app };
