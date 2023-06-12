import { Request, Response } from "express";
import { Category, validateCategory as validate } from "../models/Category";
import express from "express";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const category = new Category({ name: req.body.name });
  await category.save();

  res.send(category);
});

router.get("/", async (res: Response) => {
  const categories = await Category.find().sort("name");
  console.log(categories);
  return res.send(categories);
});

router.get("/:id", async (req: Request, res: Response) => {
  const category = await Category.findById(req.params.id);

  if (!category)
    return res
      .status(404)
      .send("The category with the given id was not found.");

  return res.send(category);
});

export default router;
