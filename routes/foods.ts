import { Request, Response } from "express";
import { Food, validateFood as validate } from "../models/Food";
import { Category } from "../models/Category";
import express from "express";
import auth from "middleware/auth";
import admin from "middleware/admin";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const foods = await Food.find();
  return res.send(foods);
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).send("The food with the given id was not found");
    }
    return res.send(food);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

router.post("/", async (req: Request, res: Response) => {
  const {
    name,
    categoryName,
    categoryId,
    description,
    ingredients,
    imageUrl,
    price,
    numberInStock,
    rating,
    createdAt,
    updatedAt,
  } = req.body;
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  try {
    const categoryObj = await Category.findById(categoryId);
    if (!categoryObj) {
      return res
        .status(404)
        .send("The category with the given id was not found");
    }
    const food = new Food({
      name,
      categoryName,
      category: {
        _id: categoryObj._id,
        name: categoryObj.name,
      },
      description,
      ingredients,
      imageUrl,
      price,
      numberInStock,
      rating,
      createdAt,
      updatedAt,
    });
    await food.save();
    return res.send(food);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const {
    name,
    categoryName,
    description,
    ingredients,
    imageUrl,
    price,
    numberInStock,
  } = req.body;

  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  try {
    const category = await Category.findById(req.body.categoryId);
    if (!category) {
      return res
        .status(404)
        .send("The category with the given id was not found");
    }

    const food = await Food.findByIdAndUpdate(
      req.params.id,
      {
        name,
        categoryName,
        category: {
          _id: category._id,
          name: category.name,
        },
        description,
        ingredients,
        imageUrl,
        price,
        numberInStock,
      },
      { new: true }
    );
    if (!food) {
      return res.status(404).send("The food with the given id was not found.");
    }
    return res.send(food);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) {
      return res.status(404).send("The food with the given id was not found");
    }
    return res.send(food);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

export default router;
