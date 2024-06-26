import config from "@/config";
import { BadRequestError, UnauthorizedError } from "@/lib/express";
import { Handler } from "express";

const requests = new Map<string, number>();

const rateLimit = Number(config.rateLimit);
const rateLimitTime = Number(config.rateLimitTime);

const RateLimit: Handler = (req, res, next) => {
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
  }, 1000 * rateLimitTime);

  if (requests.get(ip)! > rateLimit) {
    return UnauthorizedError(res, "Rate limit exceeded!");
  }

  res.setHeader("X-RateLimit-Remaining", String(rateLimit - requests.get(ip)!));

  next();
};

export default RateLimit;
