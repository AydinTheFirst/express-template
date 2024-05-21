import mongoose, { Schema } from "mongoose";

interface ISchema {
  id: string;
  displayName: string;
  username: string;
  email: string;
  password: string;
  tokenId: string;
  createdAt: number;
}

const model = mongoose.model<ISchema>(
  "user",
  new Schema<ISchema>({
    id: { type: String, required: true },
    displayName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tokenId: { type: String, required: true },
    createdAt: { type: Number, required: false, default: Date.now },
  })
);

export const UserModel = model;
export type IUser = ISchema & mongoose.Document;
