import express from 'express'
import  dotenv from 'dotenv'
import authRoute from './routes/authRoute.js'
import { connectDB } from './lib/db.js'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoute)




const startServer = async () => {
  try {
    await connectDB(); // conectar primero
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log('Server is running on port: ' + PORT);
    });
  } catch (error) {
    console.error('Failed to connect to DB:', error);
  }
};

startServer();