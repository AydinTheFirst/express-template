import config from "@/config";
import Logger from "@/lib/Logger";
import mongoose from "mongoose";

(async () => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URI!, {
      dbName: "test",
    });
    Logger.success(`MongoDB connected: ${conn.connection.host}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      Logger.error(`MongoDB error: ${error.message}`);
    }
  }
})();
