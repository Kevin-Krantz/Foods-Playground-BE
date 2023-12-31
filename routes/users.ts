import express from "express";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { validateUser as validate, User } from "../models/User";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) return res.status(400).send("User already registered.");

  const user = new User(req.body);
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);
  user.save();

  const { password, ...userWithoutPassword } = user.toObject();

  const token = user.generateAuthToken();

  return res
    .status(201)
    .header("x-auth-token", token)
    .send(userWithoutPassword);
});

export default router;
