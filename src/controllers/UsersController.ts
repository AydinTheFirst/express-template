import { UserModel } from "@/database/models/User";
import { NotFoundError } from "@/lib/express";
import { Handler } from "express";

class UsersController {
  findAll: Handler = async (req, res) => {
    const users = await UserModel.find();
    res.send(users);
  };

  findOne: Handler = async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    res.send(user);
  };

  create: Handler = async (req, res) => {
    const user = await UserModel.create(req.body);
    res.send(user);
  };

  update: Handler = async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    if (!user) return NotFoundError(res, "User not found");

    Object.assign(user, req.body);
    await user.save();

    res.send(user);
  };

  delete: Handler = async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    if (!user) return NotFoundError(res, "User not found");

    await user.deleteOne();
    res.send(user);
  };
}

export default new UsersController();
