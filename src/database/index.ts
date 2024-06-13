import config from "@/config";
import Logger from "@/lib/Logger";
import mongoose from "mongoose";

(async () => {
  try {
    const conn = await mongoose.connect(config.mongodbURI!);
    Logger.success(`MongoDB connected: ${conn.connection.host}`);
  } catch (error: any) {
    Logger.error(`Error: ${error.message}`);
  }
})();
