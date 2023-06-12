import mongoose, { Schema, Model } from "mongoose";
import Joi from "joi";
import { ICart } from "../types/ICart";
import { ICartItem } from "../types/ICartItem";
import { IFood } from "../types/IFood";

const cartItemSchema = new Schema<ICartItem>({
  name: { type: String, required: true },
  description: { type: String },
  ingredients: [String],
  imageUrl: { type: String },
  price: { type: Number, required: true },
  numberInStock: { type: Number, required: true },
  rating: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  quantity: { type: Number, required: true },
});

const cartSchema = new Schema<ICart>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [cartItemSchema],
});

const Cart: Model<ICart> = mongoose.model("Cart", cartSchema);

function validateCartItem(cartItem: IFood & { quantity: number }) {
  const schema = Joi.object({
    _id: Joi.object().required(),
    category: Joi.object().required(),
    name: Joi.string().required(),
    description: Joi.string().allow(null, ""),
    ingredients: Joi.array().items(Joi.string()),
    imageUrl: Joi.string().allow(null, ""),
    price: Joi.number().required(),
    numberInStock: Joi.number().required(),
    rating: Joi.number().allow(null, ""),
    createdAt: Joi.date().allow(null, ""),
    updatedAt: Joi.date().allow(null, ""),
    quantity: Joi.number().required(),
    __v: Joi.number().optional(),
  });
  return schema.validate(cartItem);
}
export { validateCartItem, cartSchema, Cart };
