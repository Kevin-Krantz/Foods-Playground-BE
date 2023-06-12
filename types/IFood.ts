import { ObjectId } from "mongodb";
import { ICategory } from "./ICategory";

export interface IFood {
  _id: ObjectId;
  name: string;
  categoryName: string;
  category: ICategory;
  description: string;
  ingredients: string[];
  imageUrl: string;
  price: number;
  numberInStock: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}
