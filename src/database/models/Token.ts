import mongoose, { Schema } from "mongoose";

interface ISchema {
  token: string;
  userId: string;
  createdAt: number;
  expiresAt: number;
}

const model = mongoose.model<ISchema>(
  "token",
  new Schema<ISchema>({
    token: { type: String, required: true },
    userId: { type: String, required: true },
    createdAt: { type: Number, required: true },
    expiresAt: { type: Number, required: true },
  })
);

export const TokenModel = model;
export type IToken = ISchema & mongoose.Document;
