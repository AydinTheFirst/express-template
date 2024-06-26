import { Handler } from "express";

interface CorsConfig {
  origin?: string;
  methods?: string;
  allowedHeaders?: string;
}

export const cors = (customConfig?: CorsConfig) => {
  const config = {
    origin: "*",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    ...customConfig,
  };

  const handler: Handler = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", config.origin);
    res.setHeader("Access-Control-Allow-Methods", config.methods);
    res.setHeader("Access-Control-Allow-Headers", config.allowedHeaders);
    next();
  };

  return handler;
};
