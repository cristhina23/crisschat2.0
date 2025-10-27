import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import MessageRoute from "./routes/messageRoute.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

import { app, server } from "./lib/socket.js";

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//  Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());


//  API Routes
app.use("/api/auth", authRoute);
app.use("/api/messages", MessageRoute);

// ✅ Servir el frontend de producción (React + Vite)

  app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

  app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});

//  Start server
const startServer = async () => {
  try {
    await connectDB();
    console.log(" MongoDB connected");

    server.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(" Failed to connect to DB:", error);
  }
};

startServer();
