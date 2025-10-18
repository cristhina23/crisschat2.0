import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conecction = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conecction.connection.host}`);
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};