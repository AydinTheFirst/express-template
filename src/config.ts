import "dotenv/config";
import { rateLimit } from "./middlewares";

const config = {
  mongodbURI: process.env.MONGODB_URI || "mongodb://localhost:27017",
  port: process.env.PORT || 3000,
  secretKey: process.env.SECRET_KEY,
  rateLimit: parseInt(process.env.RATE_LIMIT!) || 140,
  rateLimitTime: parseInt(process.env.RATE_LIMIT_TIME!) || 60,
};

export default config;
