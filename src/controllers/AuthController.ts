import { UserModel } from "@/database/models/User";
import {
  BadRequestError,
  InvalidPayloadError,
  NotFoundError,
} from "@/lib/express";
import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { TokenModel } from "@/database/models/Token";
import { generateToken } from "@/utils";

const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const RegisterSchema = z.object({
  displayName: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

class AuthController {
  getMe(req: Request, res: Response) {
    res.send(req.user);
  }

  async login(req: Request, res: Response) {
    const parsed = LoginSchema.safeParse(req.body);
    if (!parsed.success) {
      return InvalidPayloadError(res, parsed.error);
    }

    const { username, password } = parsed.data;

    const user = await UserModel.findOne({
      username,
    });

    if (!user) {
      return NotFoundError(res, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NotFoundError(res, "User not found");
    }

    const token = await TokenModel.findOne({ userId: user.id });

    if (token && token.expiresAt > Date.now()) {
      return res.send({ token: token.token });
    }

    const newToken = await TokenModel.create({
      userId: user.id,
      token: generateToken(),
      expiresAt: Date.now() + 1000 * 60 * 60 * 24,
    });

    res.send({ token: newToken.token });
  }

  async register(req: Request, res: Response) {
    const parsed = RegisterSchema.safeParse(req.body);
    if (!parsed.success) {
      return InvalidPayloadError(res, parsed.error);
    }

    const { displayName, username, email, password } = parsed.data;

    const user = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (user) {
      return BadRequestError(res, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      displayName,
      username,
      email,
      password: hashedPassword,
    });

    res.send(newUser);
  }
}

export default new AuthController();
