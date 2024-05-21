import Logger from "@/lib/Logger";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    Logger.debug("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

connectDB();
