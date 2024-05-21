import crypto from "crypto";

export const uuid = () => {
  return crypto.randomBytes(16).toString("hex");
};

export const generateToken = () => {
  return crypto.randomBytes(64).toString("hex");
};
