import "dotenv/config";

import "@/database";

import "@/server";

process.on("unhandledRejection", (error) => {
  console.error(error);
});

process.on("uncaughtException", (error) => {
  console.error(error);
});
