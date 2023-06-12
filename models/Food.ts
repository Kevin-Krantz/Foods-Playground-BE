import mongoose, { Schema, Model } from "mongoose";
import Joi from "joi";
import { categorySchema } from "./Category";
import { IFood } from "../types/IFood";

const foodSchema = new Schema<IFood>({
  name: { type: String, required: true },
  categoryName: String,
  category: {
    type: categorySchema,
    required: true,
  },
  description: String,
  ingredients: { type: [String], required: true },
  imageUrl: { type: String, required: true },
  price: Number,
  numberInStock: Number,
  rating: Number,
  createdAt: { type: Date, default: Date.now() },
  updatedAt: Date,
});

const Food: Model<IFood> = mongoose.model("Food", foodSchema);

function validateFood(food: IFood) {
  const schema = Joi.object({
    name: Joi.string().required(),
    categoryId: Joi.string().required(),
    description: Joi.string().required(),
    ingredients: Joi.array().items(Joi.string()).required(),
    imageUrl: Joi.string().required(),
    price: Joi.number().required(),
    numberInStock: Joi.number().required(),
    rating: Joi.number(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
  });
  return schema.validate(food);
}

export { validateFood, Food };
