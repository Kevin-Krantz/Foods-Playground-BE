import mongoose, { Schema, Model } from "mongoose";
import Joi from "joi";
import { ICategory } from "types/ICategory";

const categorySchema = new Schema({
  name: { type: String, required: true },
});

const Category: Model<ICategory> = mongoose.model("Category", categorySchema);

function validateCategory(category: ICategory) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(category);
}

export { validateCategory, categorySchema, Category };
