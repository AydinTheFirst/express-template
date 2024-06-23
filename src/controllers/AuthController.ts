import { UserModel } from "@/database/models/User";
import { BadRequestError, NotFoundError } from "@/lib/express";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { TokenModel } from "@/database/models/Token";
import { generateToken } from "@/utils";

class AuthController {
  getMe(req: Request, res: Response) {
    res.send(req.user);
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = await UserModel.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!user) {
      return NotFoundError(res, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NotFoundError(res, "User not found");
    }

    const token = await TokenModel.findOne({ userId: user._id });

    if (token && token.expiresAt > Date.now()) {
      return res.send({ token: token.token });
    }

    const newToken = await TokenModel.create({
      userId: user._id,
      token: generateToken(),
      expiresAt: Date.now() + 1000 * 60 * 60 * 24,
      createdAt: Date.now(),
    });

    res.send({ token: newToken.token });
  }

  async register(req: Request, res: Response) {
    const { displayName, username, email, password } = req.body;

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
