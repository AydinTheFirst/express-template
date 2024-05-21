import { IUser, UserModel } from "@/database/models/User";
import { NotFoundError } from "@/lib/express";
import { Request, Response } from "express";

const userMutator = (user: IUser) => {
  return {
    id: user.id,
    displayName: user.displayName,
    username: user.username,
    email: user.email,
  };
};

class UsersController {
  getAll = async (req: Request, res: Response) => {
    const users = await UserModel.find();
    res.send(users.map(userMutator));
  };

  getOne = async (req: Request, res: Response) => {
    const user = await UserModel.findOne({ id: req.params.id });
    if (!user) return NotFoundError(res, "User not found");
    res.send(userMutator(user));
  };

  create = async (req: Request, res: Response) => {
    const user = await UserModel.create(req.body);
    res.send(userMutator(user));
  };

  update = async (req: Request, res: Response) => {
    const user = await UserModel.findOneAndUpdate(
      { id: req.params.id },
      req.body
    );

    if (!user) return NotFoundError(res, "User not found");
    res.send(userMutator(user));
  };

  delete = async (req: Request, res: Response) => {
    const user = await UserModel.findOneAndDelete({ id: req.params.id });
    if (!user) return NotFoundError(res, "User not found");

    res.send(userMutator(user));
  };
}

export default new UsersController();
