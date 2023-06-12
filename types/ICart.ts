import { Schema } from "mongoose";
import { ICartItem } from "./ICartItem";

export interface ICart {
  user: Schema.Types.ObjectId;
  items: ICartItem[];
}
