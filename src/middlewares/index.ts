import config from "@/config";
import { BadRequestError, UnauthorizedError } from "@/lib/express";
import { Handler } from "express";

const requests = new Map<string, number>();

export const rateLimit: Handler = (req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  if (!ip || typeof ip !== "string") {
    return BadRequestError(res, "IP address not found!");
  }

  if (requests.has(ip)) {
    requests.set(ip, requests.get(ip)! + 1);
  } else {
    requests.set(ip, 1);
  }

  setTimeout(() => {
    requests.delete(ip);
  }, 1000 * config.rateLimitTime);

  if (requests.get(ip)! > config.rateLimit) {
    return UnauthorizedError(res, "Rate limit exceeded!");
  }

  res.setHeader(
    "X-RateLimit-Remaining",
    String(config.rateLimit - requests.get(ip)!)
  );

  next();
};
