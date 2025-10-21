import express from 'express'
import  dotenv from 'dotenv'
import authRoute from './routes/authRoute.js'
import MessageRoute from './routes/messageRoute.js'
import { connectDB } from './lib/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'


dotenv.config()

import { app, server } from './lib/socket.js'

const PORT = process.env.PORT

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser())

const allowedOrigins = [
  "http://localhost:5173",
  "https://crisschat2-0.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use('/api/auth', authRoute)
app.use('/api/messages', MessageRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})



const startServer = async () => {
  try {
    await connectDB(); // conectar primero
    console.log('MongoDB connected');

    server.listen(PORT, () => {
      console.log('Server is running on port: ' + PORT);
    });
  } catch (error) {
    console.error('Failed to connect to DB:', error);
  }
};

startServer();